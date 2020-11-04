import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Form } from '@unform/web';
import Popup from '../Popup';

import { FormHandles } from '@unform/core';
import { ICursoData } from '../../pages/Curso';

interface ICursoSubmittedData {
  nome: string;
  descricao: string;
}

interface ICursoFormProps {
  curso?: ICursoData;
  headingText?: string;
  updateCursosList?: () => void;
}

const CursoForm: React.FC<ICursoFormProps> = ({ curso, headingText, updateCursosList }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [heading, setHeading] = useState<string>();
  const [cursoId, setCursoId] = useState<string>();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToast();

  const handleSubmit = useCallback(async (data: ICursoSubmittedData) => {
    try {
      setIsLoading(true);
      if (curso) {
        const updatedCurso = {
          id: curso.id,
          nome: data.nome,
          descricao: data.descricao,
          modulos: curso.modulos
        }
        await api.put(`/cursos/${cursoId}`, updatedCurso);
        addToast({
          title: "Curso atualizado!",
          type: "success"
        });
      } else {
        await api.post(`/cursos`, {
          id: Math.floor(Math.random() * Math.floor(1000)),
          nome: data.nome,
          descricao: data.descricao,
          modulos: []
        });
        addToast({
          title: "Curso criado!",
          type: "success"
        });
        history.push('/cursos/todos');
        updateCursosList && updateCursosList();
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      addToast({
        title: "Erro ao criar",
        message: "tente novamente",
        type: "error"
      });
      setIsLoading(false);
    }
  }, [cursoId, setIsLoading, setCursoId, curso]);

  const handleDelete = useCallback(async () => {
    try {
      setIsLoading(true);
      await api.delete(`/cursos/${cursoId}`);
      setIsLoading(false);
      addToast({
        title: "Curso deletado",
        type: "success"
      });
      setIsPopupOpen(!isPopupOpen);
      history.push('/cursos/todos');
    } catch (err) {
      addToast({
        title: "Erro ao deletar",
        message: "tente novamente",
        type: "error"
      });
      setIsLoading(false);
      setIsPopupOpen(!isPopupOpen);
    }
  }, [cursoId, setIsLoading, history]);

  useEffect(() => {
    headingText ? setHeading(headingText) : setHeading('criar curso');

    if (curso) {
      setCursoId(curso.id.toString());
    }
  }, [setCursoId, setHeading, curso]);

  return (
    <Container>
      <h1>{heading}</h1>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={curso}>
          <div className="full-width">
            <label>nome</label>
            <Input name="nome" containerStyle={{ border: 'none', borderRadius: 0, width: '100%' }} />
          </div>

          <div className="full-width">
            <label>descrição</label>
            <Input name="descricao" containerStyle={{ border: 'none', borderRadius: 0, width: '100%' }} />
          </div>

          <Button type="submit" loading={isLoading}>salvar curso</Button>
        </Form>

        {cursoId && (
          <>
            <Button className="delete" onClick={() => setIsPopupOpen(!isPopupOpen)} loading={isLoading}>deletar curso</Button>
            <Popup isVisible={isPopupOpen} onCancel={() => setIsPopupOpen(!isPopupOpen)} onFulfill={handleDelete} >
              Tem certeza que deseja deletar este curso?
            </Popup>
          </>
        )}
      </Content>
    </Container>
  );
}

export default CursoForm;