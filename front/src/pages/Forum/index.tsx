import React, { useCallback, useEffect, useState } from 'react';
import api from '../../services/api';

import TopMenu from '../../components/TopMenu';
import Navbar from '../../components/Navbar';
import NavbarDesktop from '../../components/NavbarDesktop';
import Search from '../../components/Search';

import { Container, Content, PerguntasList, Pergunta, Status } from './styles';
import { Link } from 'react-router-dom';

interface IPerguntasData {
  id: number;
  title: string;
  nomeUsuario: string;
  data: string;
  isResolved: boolean;
}

const Forum: React.FC = () => {
  const [perguntas, setPerguntas] = useState<IPerguntasData[]>();

  const loadPerguntas = useCallback(async (query) => {
    const response = await api.get(`/perguntas?title_like=${query}`);
    setPerguntas(response.data);
  }, []);

  useEffect(() => {
    api.get('/perguntas?_limit=2').then(response => {
      setPerguntas(response.data);
    });
  }, []);

  return (
    <Container>
      <TopMenu />

      <Search searchTitle="pesquise no fórum" loadList={loadPerguntas} />
      {/* <Filtro></Filtro> acidionar filtro */}
      <Content>

        <PerguntasList>
          {perguntas && perguntas.map(pergunta => (
            <Pergunta key={pergunta.id}>
              <Link to={`/pergunta/${pergunta.id}`}>
                <h3>{pergunta.title}</h3>
                <p>por {pergunta.nomeUsuario}</p>
              </Link>
              <span>{pergunta.data}</span>
              <Status isResolved={!!pergunta.isResolved} />
            </Pergunta>
          ))}
        </PerguntasList>
      </Content>

      <Navbar />
      <NavbarDesktop />
    </Container>
  );
}

export default Forum;