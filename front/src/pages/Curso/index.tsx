import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import arrayMove from 'array-move';
import { FiArrowDown, FiArrowUp, FiMinusCircle } from 'react-icons/fi';
import { useMutation, useQuery } from '@apollo/client';

import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import { VER_CURSO, DELETE_MODULO, VER_MODULO_POR_CURSO, DELETE_AULA } from './apolloQueries';

import CursoForm from '../../components/CursoForm';
import AulaForm from '../../components/AulaForm';
import Navbar from '../../components/Navbar';
import TopMenu from '../../components/TopMenu';
import NavbarDesktop from '../../components/NavbarDesktop';
import CursoPerguntaForm from '../../components/CursoPerguntaForm';
import ModuleForm from '../../components/ModuleForm';
import Popup from '../../components/Popup';

import { Container, CursoContent, ListaModulos, Modulo, AulasContainer } from './styles';

interface IRouteParams {
  id: string;
}

export interface IAulasData {
  id: number;
  ordem?: number;
  nome?: string;
  video_url?: string;
  duracao?: string;
}

export interface IPerguntasData {
  id: number;
  enunciado?: string;
  alternativa1?: string;
  alternativa2?: string;
  alternativa3?: string;
  alternativa4?: string;
  resposta?: "1" | "2" | "3" | "4";
  justificativa?: string;
}

export interface IModuloContent {
  content_is: 'aula' | 'pergunta';
  content_data: IAulasData | IPerguntasData;
}

export interface IModuloData {
  id: number;
  nome: string;
  aulas: {
    id: number;
    nome: string;
    ordem: number;
    video_url: string;
    duracao: string;
  }[];
  perguntas: {
    id: number;
    enunciado: string;
    ordem: number;
    alternativa1: string;
    alternativa2: string;
    alternativa3: string;
    alternativa4: string;
    resposta: "1" | "2" | "3" | "4";
    justificativa: string;
  }[];
}

export interface IManipulatedModuloData {
  id: number;
  nome: string;
  content: IModuloContent[];
}

export interface ICursoData {
  id: number;
  nome: string;
  descricao: string;
  modulos: IModuloData[];
}

export interface ICursoGQL {
  verCurso: {
    curso: {
      id: number;
      nome: string;
      descricao: string;
      modulos: IModuloData[];
    }
  }
}

interface IModulosPorCursoQuery {
  verModulosPorCurso: IModuloData[];
}

const Curso: React.FC = () => {
  const { id } = useParams<IRouteParams>();
  const [isModuleFormVisible, setIsModuleFormVisible] = useState(false);
  const [isAulaFormVisible, setIsAulaFormVisible] = useState(false);
  const [isPerguntaFormVisible, setIsPerguntaFormVisible] = useState(false);
  const [isModuloPopupOpen, setIsModuloPopupOpen] = useState(false);
  const [isAulaPopupOpen, setIsAulaPopupOpen] = useState(false);
  const [currentModuleId, setCurrentModuleId] = useState<number>(0);

  const [curso, setCurso] = useState<ICursoData>();
  const [selectedAula, setSelectedAula] = useState<IAulasData>();
  const [selectedPergunta, setSelectedPergunta] = useState<IPerguntasData>();
  const [selectedModulo, setSelectedModulo] = useState<IManipulatedModuloData>();
  const [ManipulatedModulos, setManipulatedModulos] = useState<IManipulatedModuloData[]>();
  const [currentOrder, setCurrentOrder] = useState<number>(0);

  const { addToast } = useToast();

  // CURSO
  const { data: cursoData } = useQuery<ICursoGQL>(VER_CURSO, {
    variables: { id: Number(id) }
  });

  // MODULOS
  const { data: modulosData, refetch: moduleRefetch } = useQuery<IModulosPorCursoQuery>(VER_MODULO_POR_CURSO, {
    fetchPolicy: "no-cache",
    variables: { cursoId: Number(id) },
  });

  const handleManipulateModules = (data: IModulosPorCursoQuery) => {
    let manipulatedModulos = [] as IManipulatedModuloData[];
    data.verModulosPorCurso.forEach(modulo => {
      let moduloContent = [] as IModuloContent[];
      modulo.aulas.forEach(aula => {
        const manipulatedAula: IModuloContent = {
          content_is: 'aula',
          content_data: {
            id: aula.id,
            nome: aula.nome,
            video_url: aula.video_url,
            duracao: aula.duracao
          }
        }

        moduloContent[aula.ordem] = manipulatedAula;
      });

      modulo.perguntas.forEach(pergunta => {
        const manipulatedPergunta: IModuloContent = {
          content_is: 'pergunta',
          content_data: {
            id: pergunta.id,
            enunciado: pergunta.enunciado,
            alternativa1: pergunta.alternativa1,
            alternativa2: pergunta.alternativa2,
            alternativa3: pergunta.alternativa3,
            alternativa4: pergunta.alternativa4,
            resposta: pergunta.resposta,
            justificativa: pergunta.justificativa
          }
        }

        moduloContent[pergunta.ordem] = manipulatedPergunta;
      });

      manipulatedModulos.push({
        id: modulo.id,
        nome: modulo.nome,
        content: moduloContent,
      });
    });

    setManipulatedModulos(manipulatedModulos);
  }

  // MODULO
  const handleCreateNewModulo = () => {
    setSelectedModulo({} as IManipulatedModuloData);
    setIsModuleFormVisible(true);
  }

  const handleEditModulo = (modulo: IManipulatedModuloData) => {
    setSelectedModulo(modulo);
    setIsModuleFormVisible(true);
  }

  const [DeletarModulo] = useMutation(DELETE_MODULO, {
    onCompleted() {
      addToast({
        title: "modulo deletado com sucesso",
        type: "success"
      });
      moduleRefetch();
    },
    onError() {
      addToast({
        title: "erro ao deletar o modulo",
        type: "error"
      });
    }
  });

  const handleDeleteModule = (moduleId: number) => {
    DeletarModulo({
      variables: {
        id: moduleId
      }
    });
    setIsModuloPopupOpen(false);
  };

  // AULA
  const handleAddNewAula = (order: number, moduleId: number) => {
    setSelectedAula(undefined);
    setIsAulaFormVisible(true);
    setCurrentOrder(order);
    setCurrentModuleId(moduleId);
  };

  const handleEditAula = (aula: IAulasData, moduleId: number) => {
    setCurrentModuleId(moduleId);
    setSelectedAula(aula);
    setIsAulaFormVisible(true);
  }

  const [DeletarAula] = useMutation(DELETE_AULA, {
    onCompleted() {
      addToast({
        title: "aula deletada com sucesso",
        type: "success"
      });
      moduleRefetch();
    },
    onError() {
      addToast({
        title: "erro ao deletar a aula",
        type: "error"
      });
    }
  });

  const handleDeleteAula = (aulaId: number) => {
    DeletarAula({
      variables: {
        id: aulaId,
      }
    });
    setIsModuloPopupOpen(false);
  }

  // PERGUNTA -> criar - ver - atualizar - deletar

  const handleUpdatePergunta = (childPergunta: IPerguntasData) => {
  };

  const handleAddNewPergunta = (moduleId: number) => {
  };

  const handleEditPergunta = (pergunta: IPerguntasData, moduleId: number) => {
    setCurrentModuleId(moduleId);
    setSelectedPergunta(pergunta);
    setIsPerguntaFormVisible(true);
  }

  const handleMoveContent = useCallback(async (moduloId, index, isUp) => {
    // let newPosition: number;

    // isUp ? newPosition = index - 1 : newPosition = index + 1;

    // if (curso) {
    //   const updatedModulos = curso.modulos.filter(modulo => {
    //     if (modulo.id === moduloId) {
    //       modulo.content = arrayMove(modulo.content, index, newPosition);
    //     }
    //     return modulo;
    //   });

    //   const updatedCurso = {
    //     ...curso,
    //     modulos: updatedModulos
    //   }

    //   setCurso(updatedCurso);

    //   await api.put(`/cursos/${id}`, updatedCurso);
    // }
  }, [curso, id]);

  useEffect(() => {
    if (modulosData) {
      handleManipulateModules(modulosData);
    }
  }, [modulosData]);

  return (
    <Container>
      <TopMenu />

      <CursoForm curso={cursoData} headingText="editar curso" />

      <CursoContent>
        <h2>módulos, aulas e perguntas</h2>
        <button className="alt" onClick={handleCreateNewModulo} >criar novo módulo</button>

        <ListaModulos>
          {ManipulatedModulos && ManipulatedModulos.map(modulo => (
            <Modulo key={modulo.id}>
              <h3 onClick={() => handleEditModulo(modulo)}>{modulo.nome}</h3>
              <div>
                <button className="alt" onClick={() => handleAddNewAula(modulo.content.length, modulo.id)}>nova aula</button>
                <button className="alt" onClick={() => handleAddNewPergunta(modulo.id)}>nova pergunta</button>
                <button className="delete" onClick={() => setIsModuloPopupOpen(true)}>deletar módulo<FiMinusCircle size={16} /></button>
                <Popup isVisible={isModuloPopupOpen} onCancel={() => setIsModuloPopupOpen(false)} onFulfill={() => handleDeleteModule(modulo.id)} >
                  Tem certeza que deseja remover este módulo?
                </Popup>
              </div>
              <AulasContainer>
                {modulo.content.map((content, index) => {
                  if (content.content_is === 'aula') {
                    let contentData: IAulasData = content.content_data as IAulasData;
                    return (
                      <div key={contentData.id}>
                        <aside>
                          <button onClick={() => handleMoveContent(modulo.id, index, true)}><FiArrowUp size={14} /></button>
                          <button onClick={() => handleMoveContent(modulo.id, index, false)}><FiArrowDown size={14} /></button>
                        </aside>
                        <label>aula</label>
                        <button onClick={() => handleEditAula(contentData, modulo.id)}>{contentData.nome}</button>
                        <button onClick={() => setIsAulaPopupOpen(true)}><FiMinusCircle size={24} /></button>
                        <Popup isVisible={isAulaPopupOpen} onCancel={() => setIsAulaPopupOpen(false)} onFulfill={() => handleDeleteAula(contentData.id)} >
                          Tem certeza que deseja remover esta aula?
                        </Popup>
                      </div>
                    )
                  }

                  if (content.content_is === 'pergunta') {
                    let contentData: IPerguntasData = content.content_data as IPerguntasData;
                    return (
                      <div key={contentData.id}>
                        <aside>
                          <button onClick={() => handleMoveContent(modulo.id, index, true)}><FiArrowUp size={14} /></button>
                          <button onClick={() => handleMoveContent(modulo.id, index, false)}><FiArrowDown size={14} /></button>
                        </aside>
                        <label>pergunta</label>
                        <button onClick={() => handleEditPergunta(contentData, modulo.id)}>{contentData.enunciado}</button>
                        <button onClick={() => { }}><FiMinusCircle size={24} /></button>
                      </div>
                    )
                  }

                })}
              </AulasContainer>
            </Modulo>
          ))}
        </ListaModulos>

        {isModuleFormVisible && (
          <ModuleForm modulo={selectedModulo} cursoId={Number(id)} setVisibility={setIsModuleFormVisible} reloadModulo={moduleRefetch} />
        )}

        {isAulaFormVisible && (
          <AulaForm aula={selectedAula} reloadModulo={moduleRefetch} order={currentOrder} moduleId={currentModuleId} closeForm={() => setIsAulaFormVisible(false)} />
        )}

        {isPerguntaFormVisible && (
          <CursoPerguntaForm pergunta={selectedPergunta} updatePergunta={handleUpdatePergunta} />
        )}

      </CursoContent>

      <Navbar />
      <NavbarDesktop />
    </Container>
  );
}

export default Curso;