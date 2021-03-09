import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLazyQuery, useQuery } from '@apollo/client';

import { GET_ABRIGOS, SEARCH_ABRIGOS } from './apolloQueries';
import { Container, AbrigosList, Abrigo } from './styles';

import TopMenu from '../../components/TopMenu';
import Tabs from '../../components/Tabs';
import Navbar from '../../components/Navbar';
import NavbarDesktop from '../../components/NavbarDesktop';
import Search from '../../components/Search';
import AbrigoForm from '../../components/AbrigoForm';


interface IAbrigosData {
  id: string;
  nome: string;
  endereco: string;
}

interface IAbrigosQuery {
  verAbrigos: IAbrigosData[];
}

interface ISearchAbrigosQuery {
  procurarAbrigos: IAbrigosData[];
}

const Abrigos: React.FC = () => {
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();

  const [ProcurarAbrigos, { data: abrigosSearch }] = useLazyQuery<ISearchAbrigosQuery>(SEARCH_ABRIGOS, {
    variables: { nome: "" }
  });

  const { data: abrigosQl } = useQuery<IAbrigosQuery>(GET_ABRIGOS);

  const searchAbrigos = useCallback((query) => {
    ProcurarAbrigos({
      variables: { nome: query }
    });
    setShowSearch(true);
  }, []);

  useEffect(() => {
    setShowSearch(false);
  }, [abrigosQl]);

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
            {!showSearch && abrigosQl && abrigosQl.verAbrigos.map(abrigo => (
              <Abrigo key={abrigo.id}>
                <Link to={`/abrigo/${abrigo.id}`}>
                  <h3>{abrigo.nome}</h3>
                  <strong>{abrigo.endereco}</strong>
                </Link>
              </Abrigo>
            ))}
            {showSearch && abrigosSearch && abrigosSearch.procurarAbrigos.map(abrigo => (
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
        <AbrigoForm />
      )}

      <NavbarDesktop />
      <Navbar />
    </Container>
  );
}

export default Abrigos;