import React, { useCallback, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Container, UserList, User, Warning } from './styles';
import { useAbrigo } from '../../hooks/AbrigoHook';
import { IAbrigosData } from '../../components/AbrigoForm';

import Navbar from '../../components/Navbar';
import TopMenu from '../../components/TopMenu';
import Tabs from '../../components/Tabs';
import Search from '../../components/Search';
import ProfileForm from '../../components/ProfileForm';

import Perfil from '../../images/perfil-avatar.png';
import Plus from '../../images/plus.svg';
import api from '../../services/api';
import NavbarDesktop from '../../components/NavbarDesktop';
import { useToast } from '../../hooks/toast';
import { GET_USERS } from './apolloQueries';

interface IProfissionaisData {
  id: number;
  nome: string;
  profissao: string;
}

interface IProfissionaisQuery {
  verUsuarios: IProfissionaisData[];
}

const Profissionais: React.FC = () => {
  const [profissionais, setProfissionais] = useState<IProfissionaisData[]>();
  const location = useLocation();
  const history = useHistory();
  let query = new URLSearchParams(useLocation().search);
  const { hookAbrigo, setHookAbrigo } = useAbrigo();
  const { addToast } = useToast();

  const { data: profissionaisQl, refetch } = useQuery<IProfissionaisQuery>(GET_USERS);

  const searchProfissionais = useCallback(async (query) => {
    const response = await api.get(`/users?nome_like=${query}`);
    setProfissionais(response.data);
  }, []);

  const handleAddProfissionalAbrigo = (id: number, nome: string) => {
    try {
      let abrigoId = hookAbrigo.id;
      api.put(`/abrigos/${abrigoId}`, {
        ...hookAbrigo, profissionais: [...hookAbrigo.profissionais, { id, nome }]
      });
      setHookAbrigo({} as IAbrigosData);
      addToast({
        type: 'success',
        title: 'Profissional Adicionado!',
        message: 'informações do abrigo atualizadas.'
      });
      history.push(`/abrigo/${abrigoId}`);
    } catch (err) {
      console.log(err);
      addToast({
        type: 'error',
        title: 'Erro ao adicionar',
        message: 'tente novamente ou entre em contato com suporte.',
      });
    }
  }

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
          {hookAbrigo.id && (
            <Warning>
              <h3>selecione um profissional para adicionar ao abrigo</h3>
              <p>clique no + para adicionar, ou no profissional para ver mais detalhes sobre ele</p>
            </Warning>
          )}
          <Search searchTitle="usuários cadastrados" loadList={searchProfissionais} />
          <UserList>
            {profissionaisQl && profissionaisQl.verUsuarios.map(profissional => (

              <User key={profissional.id}>
                <Link to={`/user/${profissional.id}`}>
                  <img src={Perfil} alt="foto de perfil" />
                  <div>
                    <h3>{profissional.nome}</h3>
                    <strong>{profissional.profissao}</strong>
                  </div>
                </Link>
                {hookAbrigo.id && (
                  <button
                    className="plus-lateral"
                    onClick={() => handleAddProfissionalAbrigo(profissional.id, profissional.nome)}
                  >
                    <img src={Plus} alt="sinal de +" />
                  </button>
                )}
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