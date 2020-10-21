import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../../services/api';

import TopMenu from '../../../components/TopMenu';
import NavbarDesktop from '../../../components/NavbarDesktop';
import Navbar from '../../../components/Navbar';

import { Container, CursoContent, Aula, Popup } from './styles';
import { useToast } from '../../../hooks/toast';

interface IRouteParams {
  id: string;
}

export interface IAulasData {
  id: number;
  nome: string;
  video_url: string;
  assistida: boolean;
  duracao: string;
}

export interface ICursoData {
  id: number;
  nome: string;
  descricao: string;
  aulas: IAulasData[];
}

const CursoDetails: React.FC = () => {
  const { id } = useParams<IRouteParams>();
  const [curso, setCurso] = useState<ICursoData>();
  const [isSubscribed, setIsSubscribed] = useState<boolean>(true);
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
          <span>total de aulas: {curso.aulas.length}</span>
          <span>duração total: {curso.aulas.length}</span>

          <button onClick={() => setIsPopupVisible(true)}>quero me inscrever</button>
        </CursoContent>
      )}

      {curso && isSubscribed && (
        <CursoContent>
          <h3>{curso.nome}</h3>
          <p>{curso.descricao}</p>
          <p>duração total: {curso.aulas.length}</p>
          {curso.aulas.map(aula => (
            <Aula hasBeenWatched={aula.assistida}>
              <Link to={`/aula/${aula.id}`} key={aula.id}>
                <h3>{aula.nome}</h3>
              </Link>
              <span>{aula.duracao}</span>
            </Aula>
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