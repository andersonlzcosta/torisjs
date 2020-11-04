import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api';

import TopMenu from '../../../components/TopMenu';
import NavbarDesktop from '../../../components/NavbarDesktop';
import Navbar from '../../../components/Navbar';

import { Container, CursoList, Curso } from './styles';

interface ICursosData {
  id: number;
  nome: string;
  descricao: string;
}

const VerCursos: React.FC = () => {
  const [cursos, setCursos] = useState<ICursosData[]>();

  useEffect(() => {
    api.get('/cursos').then(response => {
      setCursos(response.data);
    });
  }, []);

  return (
    <Container>
      <TopMenu />

      <CursoList>
        <h2>Lista de cursos</h2>
        {cursos && cursos.map(curso => (
          <Curso key={curso.id}>
            <Link to={`/detalhes/${curso.id}`}>
              <div>
                <h3>{curso.nome}</h3>
                <strong>{curso.descricao.substring(0, 100)}</strong>
              </div>
            </Link>
          </Curso>
        ))}
      </CursoList>

      <Navbar />
      <NavbarDesktop />
    </Container>
  );
}

export default VerCursos;