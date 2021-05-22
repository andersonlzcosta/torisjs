import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Moment from 'moment';

import { VER_CURSO, VER_MODULO_POR_CURSO } from '../apolloQueries';

import TopMenu from '../../../components/TopMenu';
import NavbarDesktop from '../../../components/NavbarDesktop';
import Navbar from '../../../components/Navbar';
import Popup from '../../../components/Popup';

import { Container, CursoContent, Modulo, Aula } from './styles';
import { useToast } from '../../../hooks/toast';
import { IAulasData, ICursoData, IPerguntasData } from '../../Curso';

interface IRouteParams {
  id: string;
}

interface IModuloContent {
  content_is: 'aula' | 'pergunta';
  content_data: IAulasData | IPerguntasData;
}

interface IModuloData {
  id: number;
  nome: string;
  aulas: {
    id: number;
    nome: string;
    descricao: string;
    ordem: number;
    video_url: string;
    duracao: string;
  }[];
  perguntas: {
    id: number;
    enunciado: string;
    ordem: number;
    alternativa1: string;
    alternativa2: string;
    alternativa3: string;
    alternativa4: string;
    resposta: "1" | "2" | "3" | "4";
    justificativa: string;
  }[];
}

interface IManipulatedModuloData {
  id: number;
  nome: string;
  content: IModuloContent[];
}

interface ICursoGQL {
  verCurso: {
    curso: {
      id: number;
      nome: string;
      descricao: string;
      modulos: IModuloData[];
    }
  }
}

export interface IModulosPorCursoQuery {
  verModulosPorCurso: IModuloData[];
}

const CursoDetails: React.FC = () => {
  const { id } = useParams<IRouteParams>();
  const [curso, setCurso] = useState<ICursoData>();
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  const [ManipulatedModulos, setManipulatedModulos] = useState<IManipulatedModuloData[]>();

  const { addToast } = useToast();

  // CURSO
  const { data: cursoData } = useQuery<ICursoGQL>(VER_CURSO, {
    variables: { id: Number(id) }
  });

  // MODULOS
  const { data: modulosData } = useQuery<IModulosPorCursoQuery>(VER_MODULO_POR_CURSO, {
    fetchPolicy: "no-cache",
    variables: { cursoId: Number(id) },
  });

  const handleManipulateModules = (data: IModulosPorCursoQuery) => {
    let manipulatedModulos = [] as IManipulatedModuloData[];
    data.verModulosPorCurso.forEach(modulo => {
      let moduloContent = [] as IModuloContent[];
      modulo.aulas.forEach(aula => {
        const manipulatedAula: IModuloContent = {
          content_is: 'aula',
          content_data: {
            id: aula.id,
            nome: aula.nome,
            descricao: aula.descricao,
            video_url: aula.video_url,
            duracao: aula.duracao
          }
        }

        moduloContent[aula.ordem] = manipulatedAula;
      });

      modulo.perguntas.forEach(pergunta => {
        const manipulatedPergunta: IModuloContent = {
          content_is: 'pergunta',
          content_data: {
            id: pergunta.id,
            enunciado: pergunta.enunciado,
            alternativa1: pergunta.alternativa1,
            alternativa2: pergunta.alternativa2,
            alternativa3: pergunta.alternativa3,
            alternativa4: pergunta.alternativa4,
            resposta: pergunta.resposta,
            justificativa: pergunta.justificativa
          }
        }

        moduloContent[pergunta.ordem] = manipulatedPergunta;
      });

      manipulatedModulos.push({
        id: modulo.id,
        nome: modulo.nome,
        content: moduloContent,
      });
    });

    setManipulatedModulos(manipulatedModulos);
  }

  const handlePopupFulfill = () => {
    setIsPopupVisible(false);
    setIsSubscribed(true);
    addToast({
      title: 'inscrição realizada!',
      type: 'success',
      message: 'você tem 30 dias para terminar este curso.'
    });
  }

  const handleShowPopup = (cursoData : ICursoGQL) => {
    setIsPopupVisible(true);
    const subscriptionDate = Moment(new Date()).format('DD MM YYYY hh:mm:ss')
    localStorage.setItem(`inscricao-curso-${cursoData.verCurso.curso.id}`, subscriptionDate);
  }

  const conteudoTotal = useMemo(() => {
    if (ManipulatedModulos) {
      const aulasPorModulo = ManipulatedModulos.map(modulo => modulo.content.filter(content => content.content_is === 'aula').length);
      return aulasPorModulo.reduce((accumulator, currentValue) => accumulator + currentValue);
    }
  }, [ManipulatedModulos]);

  const duracaoTotal = useMemo(() => {
    if (ManipulatedModulos) {
      const allModules = ManipulatedModulos.map(modulo => modulo.content.filter(content => content.content_is === 'aula'));

      const eachModuleDuration = allModules.map(module =>
        module.reduce((accumulator, currentValue) => {
          const aula = currentValue.content_data as IAulasData;
          return accumulator + Number(aula.duracao);
        }, 0)
      );

      return eachModuleDuration.reduce((accumulator, currentValue) => accumulator + currentValue);
    }
  }, [ManipulatedModulos]);

  useEffect(() => {
    modulosData && handleManipulateModules(modulosData);
  }, [modulosData]);

  useEffect(() => {
    console.log(cursoData)
    if (cursoData) {
      const currentSubscription = localStorage.getItem(`inscricao-curso-${cursoData.verCurso.curso.id}`);
      
      if (currentSubscription) {
        const subscriptionDate = Moment(currentSubscription, 'DD MM YYYY hh:mm:ss');
        setIsSubscribed(true);
      }
    }
  }, [cursoData]);

  return (
    <Container>
      <TopMenu />

      {cursoData && !isSubscribed && (
        <CursoContent>
          <h3>{cursoData.verCurso.curso.nome}</h3>
          <p>{cursoData.verCurso.curso.descricao}</p>
          <span>{cursoData.verCurso.curso.modulos.length} módulo(s)</span>
          <span>{conteudoTotal} aula(s)</span>
          <span>duração total de {duracaoTotal} minutos</span>

          <button onClick={() => handleShowPopup(cursoData)}>quero me inscrever</button>
        </CursoContent>
      )}

      {cursoData && isSubscribed && (
        <CursoContent>
          <h3>{cursoData.verCurso.curso.nome}</h3>
          <p>{cursoData.verCurso.curso.descricao}</p>
          <span>{cursoData.verCurso.curso.modulos.length} módulo(s)</span>
          <span>{conteudoTotal} aula(s)</span>
          <span>duração total de {duracaoTotal} minutos</span>
          {ManipulatedModulos && ManipulatedModulos.map(modulo => (
            <Modulo key={modulo.id}>
              <h4>{modulo.nome}</h4>
              {modulo.content.map(content => {
                if (content.content_is === 'aula') {
                  let contentData: IAulasData = content.content_data as IAulasData;
                  return (
                    <Aula hasBeenWatched={false} key={contentData.id}>
                      <Link to={`/aula/${contentData.id}`}>
                        <h4>{contentData.nome}<span>{contentData.descricao}</span></h4>
                      </Link>
                      <span>{contentData.duracao} minutos</span>
                    </Aula>
                  )
                }

                if (content.content_is === 'pergunta') {
                  let contentData: IPerguntasData = content.content_data as IPerguntasData;
                  return (
                    <Aula hasBeenWatched={false} key={contentData.id}>
                      <Link to={`/curso-pergunta/${contentData.id}`}>
                        <h4>{contentData.enunciado && contentData.enunciado.substring(0, 50)}</h4>
                      </Link>
                    </Aula>
                  )
                }
              })
              }
            </Modulo>
          ))}
        </CursoContent>
      )}

      <Popup
        isVisible={isPopupVisible}
        onCancel={() => setIsPopupVisible(false)}
        onFulfill={handlePopupFulfill}
      >
        Ao continuar, você terá 30 dias para concluir o curso. Separe um tempo para assistir as aulas, e em caso de dúvidas você pode pedir ajuda no fórum.
      </Popup>

      <Navbar />
      <NavbarDesktop />
    </Container>
  );
}

export default CursoDetails;