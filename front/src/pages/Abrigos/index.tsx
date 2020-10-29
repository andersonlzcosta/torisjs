import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../../services/api';

import { Container, Estatisticas, Content, AbrigosList, Abrigo } from './styles';

import Plus from '../../images/plus.svg'
import TopMenu from '../../components/TopMenu';
import Tabs from '../../components/Tabs';
import Navbar from '../../components/Navbar';
import NavbarDesktop from '../../components/NavbarDesktop';
import Search from '../../components/Search';
import AbrigoForm from '../../components/AbrigoForm';

interface IAbrigosData {
  id: number;
  nome: string;
  endereco: string;
}

const Abrigos: React.FC = () => {
  const location = useLocation();
  const [abrigos, setAbrigos] = useState<IAbrigosData[]>();
  let query = new URLSearchParams(useLocation().search);

  const searchAbrigos = useCallback(async (query) => {
    const response = await api.get(`/abrigos?nome_like=${query}`);
    setAbrigos(response.data);
  }, []);

  const reloadAbrigos = useCallback(async () => {
    const response = await api.get('/abrigos');
    setAbrigos(response.data);
  }, []);

  useEffect(() => {
    let searchFor = query.get('search');
    if (searchFor) {
      api.get(`/abrigos?nome_like=${searchFor}`).then(response => {
        setAbrigos(response.data);
      });
    } else {
      api.get('/abrigos').then(response => {
        setAbrigos(response.data);
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

      {location.pathname === '/abrigos/estatisticas' && (
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


      {location.pathname === '/abrigos/todos' && (
        <>
          <Search searchTitle="abrigos cadastrados" loadList={searchAbrigos} />
          <AbrigosList>
            {abrigos && abrigos.map(abrigo => (
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