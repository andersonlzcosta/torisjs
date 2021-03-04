import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../../services/api';

import TopMenu from '../../../components/TopMenu';
import NavbarDesktop from '../../../components/NavbarDesktop';
import Navbar from '../../../components/Navbar';

import { Container, CursoContent, Modulo, Aula, Popup } from './styles';
import { useToast } from '../../../hooks/toast';
import { IAulasData, ICursoData, IPerguntasData } from '../../Curso';

interface IRouteParams {
  id: string;
}

const CursoDetails: React.FC = () => {
  const { id } = useParams<IRouteParams>();
  const [curso, setCurso] = useState<ICursoData>();
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);

  const { addToast } = useToast();

  const handlePopupFulfill = () => {
    setIsPopupVisible(false);
    setIsSubscribed(true);
    addToast({
      title: 'inscrição realizada!',
      type: 'success',
      message: 'você tem 30 dias para terminar este curso.'
    });
  }

  const conteudoTotal = useMemo(() => {
    // if (curso) {
    //   const aulasPorModulo = curso.modulos.map(modulo => modulo.content.filter(content => content.content_is === 'aula').length);
    //   return aulasPorModulo.reduce((accumulator, currentValue) => accumulator + currentValue);
    // }
  }, [curso]);

  const duracaoTotal = useMemo(() => {
    // if (curso) {
    //   const allModules = curso.modulos.map(modulo => modulo.content.filter(content => content.content_is === 'aula'));

    //   const eachModuleDuration = allModules.map(module =>
    //     module.reduce((accumulator, currentValue) => {
    //       const aula = currentValue.content_data as IAulasData;
    //       return accumulator + aula.duracao;
    //     }, 0)
    //   );

    //   return eachModuleDuration.reduce((accumulator, currentValue) => accumulator + currentValue);
    // }
  }, [curso]);

  useEffect(() => {
    api.get(`/cursos/${id}`).then(response => {
      setCurso(response.data);
    });
  }, []);

  return (
    <Container>
      <TopMenu />

      {curso && !isSubscribed && (
        <CursoContent>
          <h3>{curso.nome}</h3>
          <p>{curso.descricao}</p>
          <span>{curso.modulos.length} módulo(s)</span>
          <span>{conteudoTotal} aula(s)</span>
          <span>duração total de {duracaoTotal} minutos</span>

          <button onClick={() => setIsPopupVisible(true)}>quero me inscrever</button>
        </CursoContent>
      )}

      {curso && isSubscribed && (
        <CursoContent>
          <h3>{curso.nome}</h3>
          <p>{curso.descricao}</p>
          <span>{curso.modulos.length} módulo(s)</span>
          <span>{conteudoTotal} aula(s)</span>
          <span>duração total de {duracaoTotal} minutos</span>
          {curso.modulos.map(modulo => (
            <Modulo key={modulo.id}>
              <h4>{modulo.nome}</h4>
              { // modulo.content.map(content => {
                // if (content.content_is === 'aula') {
                //   let contentData: IAulasData = content.content_data as IAulasData;
                //   return (
                //     <Aula hasBeenWatched={false} key={contentData.id}>
                //       {/* <Link to={`/aula/${aula.id}`}> */}
                //       <Link to={`/aula/933`}>
                //         <h4>{contentData.nome}</h4>
                //       </Link>
                //       <span>{contentData.duracao} minutos</span>
                //     </Aula>
                //   )
                // }

                // if (content.content_is === 'pergunta') {
                //   let contentData: IPerguntasData = content.content_data as IPerguntasData;
                //   return (
                //     <Aula hasBeenWatched={false} key={contentData.id}>
                //       {/* <Link to={`/aula/${aula.id}`}> */}
                //       <Link to={`/curso-pergunta/${contentData.id}`}>
                //         <h4>{contentData.enunciado.substring(0, 50)}</h4>
                //       </Link>
                //     </Aula>
                //   )
                // }
                // })
              }
            </Modulo>
          ))}
        </CursoContent>
      )}

      {isPopupVisible && (
        <Popup>
          <div>
            <h4>Ao continuar, você terá 30 dias para concluir o curso. Separe um tempo para assistir as aulas, e em caso de dúvidas você pode pedir ajuda no fórum.</h4>
            <button className="cancel" onClick={() => setIsPopupVisible(false)}>cancelar</button>
            <button onClick={handlePopupFulfill}>continuar</button>
          </div>
        </Popup>
      )}

      <Navbar />
      <NavbarDesktop />
    </Container>
  );
}

export default CursoDetails;