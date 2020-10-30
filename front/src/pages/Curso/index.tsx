import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

import Navbar from '../../components/Navbar';
import TopMenu from '../../components/TopMenu';
import NavbarDesktop from '../../components/NavbarDesktop';
import CursoForm from '../../components/CursoForm';
import AulaForm from '../../components/AulaForm';

import { Container, CursoContent, ListaModulos, Modulo, AulasContainer } from './styles';
import { FiMinusCircle } from 'react-icons/fi';
import { useToast } from '../../hooks/toast';
import ModuleForm from '../../components/ModuleForm';
import Popup from '../../components/Popup';

interface IRouteParams {
  id: string;
}

export interface IAulasData {
  id: number;
  nome: string;
  video_url: string;
  duracao: number;
}

interface IModuloData {
  id: number;
  nome: string;
  aulas: IAulasData[];
}

export interface ICursoData {
  id: number;
  nome: string;
  descricao: string;
  modulos: IModuloData[];
}

const Curso: React.FC = () => {
  const { id } = useParams<IRouteParams>();
  const [isModuleFormVisible, setIsModuleFormVisible] = useState(false);
  const [isAulaFormVisible, setIsAulaFormVisible] = useState(false);
  const [isModuloPopupOpen, setIsModuloPopupOpen] = useState(false);
  const [currentModuleId, setCurrentModuleId] = useState<number>();

  const [curso, setCurso] = useState<ICursoData>();
  const [selectedAula, setSelectedAula] = useState<IAulasData>();
  const [selectedModulo, setSelectedModulo] = useState<IModuloData>();

  const { addToast } = useToast();

  const handleDeleteAula = useCallback((idToRemove: number) => {
    if (curso) {
      const updatedCurso = curso;
      updatedCurso.modulos.forEach(modulo => {
        modulo.aulas = modulo.aulas.filter(aula => aula.id !== idToRemove);
      });
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
  }, [curso]);

  const handleUpdateAula = useCallback((childAula: IAulasData) => {
    if (curso) {
      let currentModule = curso.modulos.find(modulo => modulo.id === currentModuleId);
      if (currentModule) {
        let todasAulas = currentModule.aulas.filter(aula => aula.id !== childAula.id);
        todasAulas.push(childAula);

        const updatedModules = curso.modulos.map(modulo => {
          if (currentModule && modulo.id === currentModule.id) {
            modulo.aulas = todasAulas;
          }
          return modulo;
        });

        const updatedCurso = { ...curso, modulos: updatedModules };

        setSelectedAula(undefined);
        setIsAulaFormVisible(false);

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
    }
  }, [curso, currentModuleId]);

  const handleAddNewAula = useCallback(async (moduleId: number) => {
    if (curso) {
      setCurrentModuleId(moduleId);
      const newAula: IAulasData = {
        id: Math.floor(Math.random() * Math.floor(1000)),
        nome: '',
        video_url: '',
        duracao: 0
      }
      setSelectedAula(newAula);
      setIsAulaFormVisible(true);

      let updatedModules = curso.modulos.map(module => {
        if (module.id === moduleId) {
          module.aulas.push(newAula);
        }
        return module;
      });

      const updatedCurso = { ...curso, modulos: updatedModules };
      await api.put(`/cursos/${id}`, updatedCurso);
    }
  }, [curso]);

  const handleEditAula = (aula: IAulasData, moduleId: number) => {
    setCurrentModuleId(moduleId);
    setSelectedAula(aula);
    setIsAulaFormVisible(true);
  }

  const handleEditModulo = (modulo: IModuloData) => {
    setSelectedModulo(modulo);
    setIsModuleFormVisible(true);
  }

  const handleCreateNewModulo = () => {
    setSelectedModulo({} as IModuloData);
    setIsModuleFormVisible(true);
  }

  const handleCreateModule = useCallback(async (moduleName: string) => {
    let modulos: IModuloData[] = [];
    if (curso) {
      modulos = [...curso.modulos, {
        id: Math.floor(Math.random() * Math.floor(1000)),
        nome: moduleName,
        aulas: []
      }];
      const updatedCurso = { ...curso, modulos }

      setCurso(updatedCurso);
      await api.put(`/cursos/${id}`, updatedCurso);
      setIsModuleFormVisible(false);
    }
  }, [curso]);

  const handleUpdateModule = useCallback(async (moduleId: number, moduleName: string) => {
    if (curso) {
      const updatedModulos = curso.modulos.map(modulo => {
        if (modulo.id === moduleId) {
          modulo.nome = moduleName;
        }
        return modulo;
      });

      const updatedCurso = { ...curso, modulos: updatedModulos }
      setCurso(updatedCurso);

      await api.put(`/cursos/${id}`, updatedCurso);
      setIsModuleFormVisible(false);
    }
  }, [curso]);

  const handleDeleteModule = useCallback(async (moduleId: number) => {
    if (curso) {
      const updatedModules = curso.modulos.filter(modulo => modulo.id !== moduleId);
      const updatedCurso = { ...curso, modulos: updatedModules };
      setCurso(updatedCurso);

      await api.put(`/cursos/${id}`, updatedCurso);
      setIsModuloPopupOpen(false)
    }
  }, [curso]);

  useEffect(() => {
    api.get(`/cursos/${id}`).then(response => {
      setCurso(response.data);
    });
  }, []);

  return (
    <Container>
      <TopMenu />

      <CursoForm curso={curso} headingText="editar curso" />

      <CursoContent>
        <h2>módulos, aulas e perguntas</h2>
        <button className="alt" onClick={handleCreateNewModulo} >criar novo módulo</button>

        <ListaModulos>
          {curso && curso.modulos && curso.modulos.map(modulo => (
            <Modulo key={modulo.id}>
              <h3 onClick={() => handleEditModulo(modulo)}>{modulo.nome}</h3>
              <div>
                <button className="alt" onClick={() => handleAddNewAula(modulo.id)}>criar nova aula neste módulo</button>
                <button className="delete" onClick={() => setIsModuloPopupOpen(true)}>deletar módulo<FiMinusCircle size={16} /></button>
                <Popup isVisible={isModuloPopupOpen} onCancel={() => setIsModuloPopupOpen(false)} onFulfill={() => handleDeleteModule(modulo.id)} >
                  Tem certeza que deseja remover este módulo?
                </Popup>
              </div>
              <AulasContainer>
                {modulo.aulas.map(aula => (
                  <div key={aula.id}>
                    <button onClick={() => handleEditAula(aula, modulo.id)}>{aula.nome}</button>
                    <button onClick={() => handleDeleteAula(aula.id)}><FiMinusCircle size={24} /></button>
                  </div>
                ))}
              </AulasContainer>
            </Modulo>
          ))}
        </ListaModulos>

        {isModuleFormVisible && (
          <ModuleForm modulo={selectedModulo} addModuleToCurso={handleCreateModule} updateModule={handleUpdateModule} />
        )}

        {isAulaFormVisible && (
          <AulaForm aula={selectedAula} updateAula={handleUpdateAula} />
        )}

      </CursoContent>

      <Navbar />
      <NavbarDesktop />
    </Container>
  );
}

export default Curso;