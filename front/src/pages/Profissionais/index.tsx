import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Content, Estatisticas, UserList, User } from './styles';

import Navbar from '../../components/Navbar';
import TopMenu from '../../components/TopMenu';
import Tabs from '../../components/Tabs';
import Search from '../../components/Search';
import ProfileForm from '../../components/ProfileForm';

import Perfil from '../../images/perfil.jpg'
import Plus from '../../images/plus.svg'
import api from '../../services/api';
import NavbarDesktop from '../../components/NavbarDesktop';

interface IProfissionaisData {
  id: number;
  nome: string;
  idade: number;
  profissao: string;
}

const Profissionais: React.FC = () => {
  const [profissionais, setProfissionais] = useState<IProfissionaisData[]>();
  const location = useLocation();
  let query = new URLSearchParams(useLocation().search);

  const loadProfissionais = useCallback(async (query) => {
    const response = await api.get(`/users?nome_like=${query}`);
    setProfissionais(response.data);
  }, []);

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
  }, [setProfissionais]);

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
          <Search searchTitle="usuários cadastrados" loadProfissionais={loadProfissionais} />
          <UserList>
            {profissionais && profissionais.map(profissional => (

              <User key={profissional.id}>
                <img src={Perfil} alt="foto de perfil" />
                <div>
                  <h3>{profissional.nome}</h3>
                  <strong>{profissional.idade} anos - {profissional.profissao}</strong>
                </div>
                <a href={`/user/${profissional.id}`}><img src={Plus} alt="sinal de +" /></a>
              </User>
            ))}

          </UserList>
        </>
      )}

      {location.pathname === '/profissionais/novo' && (
        <ProfileForm />
      )}

      <NavbarDesktop />
      <Navbar />
    </Container>
  );
}

export default Profissionais;