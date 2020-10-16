import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

import Navbar from '../../components/Navbar';
import TopMenu from '../../components/TopMenu';
import NavbarDesktop from '../../components/NavbarDesktop';
import CursoForm from '../../components/CursoForm';
import AulaForm from '../../components/AulaForm';

import { Container, AulasContainer, ListaAulas, Aula } from './styles';
import { FiMinusCircle } from 'react-icons/fi';
import { useToast } from '../../hooks/toast';

interface IRouteParams {
  id: string;
}

export interface IAulasData {
  id: number;
  nome: string;
  video_url: string;
}

export interface ICursoData {
  id: number;
  nome: string;
  descricao: string;
  aulas: IAulasData[];
}

const Curso: React.FC = () => {
  const { id } = useParams<IRouteParams>();
  const [curso, setCurso] = useState<ICursoData>();
  const [selectedAula, setSelectedAula] = useState<IAulasData>();
  const { addToast } = useToast();

  const handleDeleteAula = (idToRemove: number) => {
    if (curso) {
      const updatedAulas = curso.aulas.filter(aula => aula.id !== idToRemove);
      const updatedCurso = { ...curso, aulas: updatedAulas };
      try {
        api.put(`/cursos/${id}`, updatedCurso);
        setCurso(updatedCurso);
        addToast({
          title: 'Aula deletada',
          type: 'success'
        });
      } catch (err) {
        console.log(err);
        addToast({
          title: 'Erro ao deletar',
          message: 'tente novamente',
          type: 'success'
        });
      }
    }
  }

  const handleUpdateAula = useCallback((childAula: IAulasData) => {
    if (curso) {
      let todasAulas = curso.aulas.filter(aula => aula.id !== childAula.id);
      todasAulas.push(childAula);
      const updatedCurso = { ...curso, aulas: todasAulas };

      setSelectedAula(undefined);

      try {
        api.put(`/cursos/${id}`, updatedCurso);
        setCurso(updatedCurso);
        addToast({
          title: 'Curso atualizado',
          type: 'success'
        });
      } catch (err) {
        console.log(err);
        addToast({
          title: 'Erro ao atualizar curso',
          message: 'tente novamente',
          type: 'success'
        });
      }
    }
  }, [curso]);

  const handleAddNewAula = () => {
    setSelectedAula({ nome: '', video_url: '' } as IAulasData);
  }

  useEffect(() => {
    api.get(`/cursos/${id}`).then(response => {
      setCurso(response.data);
    });
  }, []);

  return (
    <Container>
      <TopMenu />

      <CursoForm curso={curso} headingText="editar curso" />

      <AulasContainer isEditingAula={!!selectedAula}>
        <label>Aulas</label>
        <button className="alt" onClick={handleAddNewAula}>criar nova aula</button>
        <ListaAulas>
          {curso && curso.aulas && curso.aulas.map(aula => (
            <Aula key={aula.id}>
              <button onClick={() => setSelectedAula(aula)}>
                <h3>{aula.nome}</h3>
              </button>
              <button onClick={() => handleDeleteAula(aula.id)}><FiMinusCircle size={24} /></button>
            </Aula>
          ))}
        </ListaAulas>

        <AulaForm aula={selectedAula} updateAula={handleUpdateAula} />

      </AulasContainer>

      <Navbar />
      <NavbarDesktop />
    </Container>
  );
}

export default Curso;