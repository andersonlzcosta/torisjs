import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import ReactPlayer from 'react-player';

import { VER_AULA } from '../apolloQueries';

import Navbar from '../../../components/Navbar';
import NavbarDesktop from '../../../components/NavbarDesktop';
import TopMenu from '../../../components/TopMenu';

import { Container, AulaContainer, AulaArquivos } from './styles';

interface IRouteParams {
  id: string;
}

interface IAula {
  verAula: {
    aula: {
      id: number;
      ordem: number;
      nome: string;
      descricao: string;
      video_url: string;
      assistida: boolean;
      duracao: string;
    }
  }
}

const Aula: React.FC = () => {
  const { id } = useParams<IRouteParams>();
  const { goBack } = useHistory();

  const { data: aula } = useQuery<IAula>(VER_AULA, {
    variables: { id: Number(id) }
  });

  return (
    <Container>
      <TopMenu />

      {aula && (
        <AulaContainer>
          <button className="voltar" onClick={goBack}>Voltar</button>
          <h1>{aula.verAula.aula.nome}</h1>
          <span>{aula.verAula.aula.duracao} minutos</span>
          <h3>{aula.verAula.aula.descricao}</h3>
          <ReactPlayer url={aula.verAula.aula.video_url} width="100%" height="42vw" />

          {/* <h2>Arquivos</h2>
          <AulaArquivos>
            <button>Arquivos da aula em PDF</button>
            <button>Arquivos da aula em CSV</button>
          </AulaArquivos> */}

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