import React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
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
      modulo: {
        id: number;
        nome: string;
        aulas: {
          id: number;
          ordem: number;
        }[]
        perguntas: {
          id: number;
          ordem: number;
        }[]
      }
    }
  }
}

interface IProximaAulaButtonProps {
  ordem: number;
  modulo: {
    aulas: {
      id: number;
      ordem: number;
    }[]
    perguntas: {
      id: number;
      ordem: number;
    }[]
  }
}

interface IAtividade {
  id: number;
  ordem: number;
  type: string;
}

const ProximaAulaButton: React.FC<IProximaAulaButtonProps> = ({ordem, modulo}) => {
  const atividades : IAtividade[] = [];
  modulo.aulas.map(aula => {
    atividades.push({
      ...aula,
      type: 'aula'
    })
  })
  modulo.perguntas.map(pergunta => {
    atividades.push({
      ...pergunta,
      type: 'curso-pergunta'
    })
  })
  atividades.sort((a, b) => a.ordem - b.ordem)
  const proximaAula = atividades[ordem]

  return (
    proximaAula && (
      <>
        {console.log(proximaAula)}
        <h2>Próxima etapa</h2>
        <Link to={`/${proximaAula.type}/${proximaAula.id}`}>
          <button className="proxima">clique para assistir a próxima aula / pergunta</button>
        </Link>
      </>
    ) || <></>
  )
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

          <ProximaAulaButton
            ordem={aula.verAula.aula.ordem}
            modulo={aula.verAula.aula.modulo} />
        </AulaContainer>
      )}

      <Navbar />
      <NavbarDesktop />
    </Container>
  );
}

export default Aula;