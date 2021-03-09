import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLazyQuery, useQuery } from '@apollo/client';
import { Container, UserList, User, Warning } from './styles';

import Navbar from '../../components/Navbar';
import TopMenu from '../../components/TopMenu';
import Tabs from '../../components/Tabs';
import Search from '../../components/Search';
import ProfileForm from '../../components/ProfileForm';

import Perfil from '../../images/perfil-avatar.png';
import NavbarDesktop from '../../components/NavbarDesktop';
import { GET_USERS, SEARCH_USERS } from './apolloQueries';

interface IProfissionaisData {
  id: number;
  nome: string;
  profissao: string;
}

interface IProfissionaisQuery {
  verUsuarios: IProfissionaisData[];
}

interface ISearchProfissionaisQuery {
  procurarUsuarios: IProfissionaisData[];
}

const Profissionais: React.FC = () => {
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();

  const [ProcurarUsuarios, { data: profissionaisSearch }] = useLazyQuery<ISearchProfissionaisQuery>(SEARCH_USERS);

  const { data: profissionaisQl, refetch } = useQuery<IProfissionaisQuery>(GET_USERS);

  const searchProfissionais = useCallback((query) => {
    ProcurarUsuarios({
      variables: { nome: query }
    });
    setShowSearch(true);
  }, []);

  useEffect(() => {
    setShowSearch(false);
  }, [profissionaisQl]);

  return (
    <Container>
      <TopMenu />
      <Tabs
        options={[
          { text: "ver estatísticas", path: "/estatisticas" },
          { text: "ver todos", path: "/todos" },
          { text: "criar novo", path: "/novo" },
        ]}
      />

      {location.pathname === '/profissionais/todos' && (
        <>
          <Search searchTitle="usuários cadastrados" loadList={searchProfissionais} />
          <UserList>
            {!showSearch && profissionaisQl && profissionaisQl.verUsuarios.map(profissional => (
              <User key={profissional.id}>
                <Link to={`/user/${profissional.id}`}>
                  <img src={Perfil} alt="foto de perfil" />
                  <div>
                    <h3>{profissional.nome}</h3>
                    <strong>{profissional.profissao}</strong>
                  </div>
                </Link>
              </User>
            ))}
            {showSearch && profissionaisSearch && profissionaisSearch.procurarUsuarios.map(profissional => (
              <User key={profissional.id}>
                <Link to={`/user/${profissional.id}`}>
                  <img src={Perfil} alt="foto de perfil" />
                  <div>
                    <h3>{profissional.nome}</h3>
                    <strong>{profissional.profissao}</strong>
                  </div>
                </Link>
              </User>
            ))}
          </UserList>
        </>
      )}

      {location.pathname === '/profissionais/novo' && (
        <ProfileForm headingText="criar novo profissional" updateProfissionaisList={refetch} />
      )}

      <NavbarDesktop />
      <Navbar />
    </Container>
  );
}

export default Profissionais;