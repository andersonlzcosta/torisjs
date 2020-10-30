import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../../services/api';

import TopMenu from '../../../components/TopMenu';
import NavbarDesktop from '../../../components/NavbarDesktop';
import Navbar from '../../../components/Navbar';

import { Container, CursoContent, Modulo, Aula, Popup } from './styles';
import { useToast } from '../../../hooks/toast';

interface IRouteParams {
  id: string;
}

export interface IAulasData {
  id: number;
  nome: string;
  video_url: string;
  assistida: boolean;
  duracao: number;
}

interface IModuloData {
  id: number;
  nome: string;
  aulas: IAulasData[];
}

export interface ICursoData {
  id: number;
  nome: string;
  descricao: string;
  modulos: IModuloData[];
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

  const aulasTotal = useMemo(() => {
    if (curso) {
      const aulasPorModulo = curso.modulos.map(modulo => modulo.aulas.length);
      return aulasPorModulo.reduce((accumulator, currentValue) => accumulator + currentValue);
    }
  }, [curso]);

  const duracaoTotal = useMemo(() => {
    if (curso) {
      const todasAulasArray = curso.modulos.map(modulo => {
        return modulo.aulas.reduce((accumulator, currentValue) => accumulator + currentValue.duracao, 0);
      });
      return todasAulasArray.reduce((accumulator, currentValue) => accumulator + currentValue);
    }
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
          <span>{aulasTotal} aula(s)</span>
          <span>duração total de {duracaoTotal} minutos</span>

          <button onClick={() => setIsPopupVisible(true)}>quero me inscrever</button>
        </CursoContent>
      )}

      {curso && isSubscribed && (
        <CursoContent>
          <h3>{curso.nome}</h3>
          <p>{curso.descricao}</p>
          <span>{curso.modulos.length} módulo(s)</span>
          <span>{aulasTotal} aula(s)</span>
          <span>duração total de {duracaoTotal} minutos</span>
          {curso.modulos.map(modulo => (
            <Modulo key={modulo.id}>
              <h4>{modulo.nome}</h4>
              {modulo.aulas.map(aula => (
                <Aula hasBeenWatched={aula.assistida}>
                  {/* <Link to={`/aula/${aula.id}`} key={aula.id}> */}
                  <Link to={`/aula/933`} key={aula.id}>
                    <h4>{aula.nome}</h4>
                  </Link>
                  <span>{aula.duracao} minutos</span>
                </Aula>
              ))}
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