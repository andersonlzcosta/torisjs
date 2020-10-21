import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import NavbarDesktop from '../../../components/NavbarDesktop';
import TopMenu from '../../../components/TopMenu';
import api from '../../../services/api';

import { Container, AulaContent } from './styles';

interface IRouteParams {
  id: string;
}

interface IAula {
  id: number;
  nome: string;
  video_url: string;
  assistida: boolean;
  duracao: string;
}

const Aula: React.FC = () => {
  const { id } = useParams<IRouteParams>();
  const [aula, setAula] = useState<IAula>();

  useEffect(() => {
    api.get(`/aulas/${id}`).then(response => {
      setAula(response.data);
    });
  }, []);

  return (
    <Container>
      <TopMenu />

      {aula && (
        <AulaContent>
          <h1>{aula.nome}</h1>
          <span>{aula.duracao}</span>


        </AulaContent>
      )}

      <Navbar />
      <NavbarDesktop />
    </Container>
  );
}

export default Aula;