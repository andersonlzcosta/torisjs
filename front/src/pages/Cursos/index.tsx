import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { VER_CURSOS } from './apolloQueries';

import NavbarDesktop from '../../components/NavbarDesktop';
import Navbar from '../../components/Navbar';
import TopMenu from '../../components/TopMenu';
import Tabs from '../../components/Tabs';
import Search from '../../components/Search';
import CursoForm from '../../components/CursoForm';

import { Container, Content, Estatisticas, CursoList, Curso, Warning } from './styles';

interface IVerCursos {
  verCursos: {
    id: string;
    nome: string;
    descricao: string;
  }[]
}

const Cursos: React.FC = () => {
  const location = useLocation();
  // let query = new URLSearchParams(useLocation().search);

  const { data: cursosData, refetch } = useQuery<IVerCursos>(VER_CURSOS);

  // const loadCursos = useCallback(async (query) => {
  //   const response = await api.get(`/cursos?nome_like=${query}`);
  //   setCursos(response.data);
  // }, []);

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

      {location.pathname === '/cursos/estatisticas' && (
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

      {location.pathname === '/cursos/todos' && (
        <>
          {/* <Search searchTitle="cursos cadastrados" loadList={loadCursos} /> */}
          <CursoList>

            {cursosData && cursosData.verCursos.map(curso => (
              <Curso key={curso.id}>
                <Link to={`/curso/${curso.id}`}>
                  <div>
                    <h3>{curso.nome}</h3>
                    <strong>{curso.descricao.substring(0, 100)}...</strong>
                  </div>
                </Link>
              </Curso>
            ))}

          </CursoList>
        </>
      )}

      {location.pathname === '/cursos/novo' && (
        <CursoForm updateCursosList={refetch} />
      )}

      <NavbarDesktop />
      <Navbar />
    </Container>
  );
}

export default Cursos;