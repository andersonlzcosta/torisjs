import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Container, Content, Estatisticas, UserList, User, Warning } from './styles';
import { useAbrigo } from '../../hooks/AbrigoHook';
import { IAbrigosData } from '../../components/AbrigoForm';

import Navbar from '../../components/Navbar';
import TopMenu from '../../components/TopMenu';
import Tabs from '../../components/Tabs';
import Search from '../../components/Search';
import ProfileForm from '../../components/ProfileForm';

import Perfil from '../../images/perfil.jpg';
import Plus from '../../images/plus.svg';
import api from '../../services/api';
import NavbarDesktop from '../../components/NavbarDesktop';
import { useToast } from '../../hooks/toast';

interface IProfissionaisData {
  id: number;
  nome: string;
  idade: number;
  profissao: string;
}

const Profissionais: React.FC = () => {
  const [profissionais, setProfissionais] = useState<IProfissionaisData[]>();
  const location = useLocation();
  const history = useHistory();
  let query = new URLSearchParams(useLocation().search);
  const { hookAbrigo, setHookAbrigo } = useAbrigo();
  const { addToast } = useToast();

  const searchProfissionais = useCallback(async (query) => {
    const response = await api.get(`/users?nome_like=${query}`);
    setProfissionais(response.data);
  }, []);

  const reloadProfissionais = useCallback(async () => {
    const response = await api.get('/users');
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

  useEffect(() => {
    let searchFor = query.get('search');
    if (searchFor) {
      api.get(`/users?nome_like=${searchFor}`).then(response => {
        setProfissionais(response.data);
      });
    } else {
      api.get('/users').then(response => {
        setProfissionais(response.data);
      });
    }
  }, []);

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

      {location.pathname === '/profissionais/estatisticas' && (
        <Estatisticas>
          <h2>estatísticas</h2>
          <Content>
            <div>
              <h3>Total</h3>
              <p>153 usuários cadastrados</p>
            </div>

            <div>
              <h3>Região</h3>
              <p>Rio de Janeiro possúi mais profissionais cadastrados</p>
            </div>

            <div>
              <h3>Enviou mais notificações</h3>
              <p>Ricardo Daniel</p>
            </div>
          </Content>
        </Estatisticas>
      )}

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
            {profissionais && profissionais.map(profissional => (

              <User key={profissional.id}>
                <Link to={`/user/${profissional.id}`}>
                  <img src={Perfil} alt="foto de perfil" />
                  <div>
                    <h3>{profissional.nome}</h3>
                    <strong>{profissional.idade} anos - {profissional.profissao}</strong>
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
        <ProfileForm headingText="criar novo profissional" updateProfissionaisList={reloadProfissionais} />
      )}

      <NavbarDesktop />
      <Navbar />
    </Container>
  );
}

export default Profissionais;