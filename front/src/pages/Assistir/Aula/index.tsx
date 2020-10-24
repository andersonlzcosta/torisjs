import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import api from '../../../services/api';

import Navbar from '../../../components/Navbar';
import NavbarDesktop from '../../../components/NavbarDesktop';
import TopMenu from '../../../components/TopMenu';
import ReactPlayer from 'react-player';

import { Container, AulaContainer, AulaArquivos } from './styles';

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
  const { goBack } = useHistory();

  useEffect(() => {
    api.get(`/aulas/${id}`).then(response => {
      setAula(response.data);
    });
  }, []);

  return (
    <Container>
      <TopMenu />

      {aula && (
        <AulaContainer>
          <button className="voltar" onClick={goBack}>Voltar</button>
          <h1>{aula.nome}</h1>
          <span>{aula.duracao}</span>
          <ReactPlayer url={aula.video_url} width="100%" height="42vw" />

          <h2>Arquivos</h2>
          <AulaArquivos>
            <button>Arquivos da aula em PDF</button>
            <button>Arquivos da aula em CSV</button>
          </AulaArquivos>

          <h2>Próxima etapa</h2>
          <button className="proxima">clique para assistir a próxima aula / pergunta</button>
        </AulaContainer>
      )}

      <Navbar />
      <NavbarDesktop />
    </Container>
  );
}

export default Aula;