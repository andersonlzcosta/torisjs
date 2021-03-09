import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { VER_CURSOS } from '../apolloQueries';
import TopMenu from '../../../components/TopMenu';
import NavbarDesktop from '../../../components/NavbarDesktop';
import Navbar from '../../../components/Navbar';

import { Container, CursoList, Curso } from './styles';

interface IVerCursos {
  verCursos: {
    id: string;
    nome: string;
    descricao: string;
  }[]
}

const VerCursos: React.FC = () => {
  const { data: cursosData } = useQuery<IVerCursos>(VER_CURSOS);

  return (
    <Container>
      <TopMenu />

      <CursoList>
        <h2>Lista de cursos</h2>
        {cursosData && cursosData.verCursos.map(curso => (
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