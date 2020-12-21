import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../../services/api';
import { gql, useQuery } from '@apollo/client';

import { Container, Estatisticas, Content, AbrigosList, Abrigo } from './styles';

import Plus from '../../images/plus.svg'
import TopMenu from '../../components/TopMenu';
import Tabs from '../../components/Tabs';
import Navbar from '../../components/Navbar';
import NavbarDesktop from '../../components/NavbarDesktop';
import Search from '../../components/Search';
import AbrigoForm from '../../components/AbrigoForm';

const GET_ABRIGOS = gql`
{
  verAbrigos{
    id,
    nome,
    endereco
  }
}
`;

interface IAbrigosData {
  id: string;
  nome: string;
  endereco: string;
}

interface IAbrigosQuery {
  verAbrigos: IAbrigosData[];
}

const Abrigos: React.FC = () => {
  const location = useLocation();
  const [abrigos, setAbrigos] = useState<IAbrigosData[]>();
  let query = new URLSearchParams(useLocation().search);

  const { data: abrigosQl } = useQuery<IAbrigosQuery>(GET_ABRIGOS);

  const searchAbrigos = useCallback(async (query) => {
    const response = await api.get(`/abrigos?nome_like=${query}`);
    setAbrigos(response.data);
  }, []);

  const reloadAbrigos = useCallback(async () => {
    const response = await api.get('/abrigos');
    setAbrigos(response.data);
  }, []);

  // useEffect(() => {
  //   let searchFor = query.get('search');
  //   if (searchFor) {
  //     api.get(`/abrigos?nome_like=${searchFor}`).then(response => {
  //       setAbrigos(response.data);
  //     });
  //   } else {
  //     api.get('/abrigos').then(response => {
  //       setAbrigos(response.data);
  //     });
  //   }
  // }, []);

  return (
    <Container>
      <TopMenu />
      <Tabs
        options={[
          { text: "ver todos", path: "/todos" },
          { text: "criar novo", path: "/novo" },
        ]}
      />

      {location.pathname === '/abrigos/todos' && (
        <>
          <Search searchTitle="abrigos cadastrados" loadList={searchAbrigos} />
          <AbrigosList>
            {abrigosQl && abrigosQl.verAbrigos.map(abrigo => (
              <Abrigo key={abrigo.id}>
                <Link to={`/abrigo/${abrigo.id}`}>
                  <h3>{abrigo.nome}</h3>
                  <strong>{abrigo.endereco}</strong>
                </Link>
              </Abrigo>
            ))}
          </AbrigosList>
        </>
      )}

      {location.pathname === '/abrigos/novo' && (
        <AbrigoForm updateAbrigoList={reloadAbrigos} />
      )}

      <NavbarDesktop />
      <Navbar />
    </Container>
  );
}

export default Abrigos;