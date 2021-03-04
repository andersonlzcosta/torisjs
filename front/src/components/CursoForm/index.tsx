import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useMutation } from '@apollo/client';
import * as Yup from 'yup';

import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';
import { CREATE_CURSO, DELETAR_CURSO, UPDATE_CURSO } from './apolloQueries';
import { VER_CURSOS } from '../../pages/Cursos/apolloQueries';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Popup from '../Popup';
import { Container, Content } from './styles';

import { ICursoGQL } from '../../pages/Curso';

interface ICursoFormData {
  nome: string;
  descricao: string;
}

interface ICursoFormProps {
  curso?: ICursoGQL;
  headingText?: string;
  updateCursosList?: () => void;
}

const CursoForm: React.FC<ICursoFormProps> = ({ curso, headingText, updateCursosList }) => {
  const [heading, setHeading] = useState<string>();
  const [cursoId, setCursoId] = useState<number>();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [initialData, setInitialData] = useState<ICursoFormData>();

  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToast();

  const [CreateCurso] = useMutation(CREATE_CURSO, {
    refetchQueries: [{ query: VER_CURSOS }],
    onCompleted() {
      addToast({
        title: "Curso criado com sucesso!",
        type: "success",
      });
      history.push('/cursos/todos');
    },
    onError() {
      addToast({
        title: "Ocorreu um erro ao criar o curso",
        type: "error"
      });
    }
  });

  const [DeletarCurso] = useMutation(DELETAR_CURSO, {
    refetchQueries: [{ query: VER_CURSOS }],
    onCompleted() {
      addToast({
        title: "curso deletado com sucesso",
        type: "success"
      });
      history.push('/cursos/todos');
    },
    onError() {
      addToast({
        title: "Ocorreu um erro ao deletar o curso",
        type: "error"
      });
    }
  });

  const [AtualizarCurso] = useMutation(UPDATE_CURSO, {
    refetchQueries: [{ query: VER_CURSOS }],
    onCompleted() {
      addToast({
        title: "Curso atualizado com sucesso!",
        type: "success",
      });
      history.push('/cursos/todos');
    },
    onError() {
      addToast({
        title: "Ocorreu um erro ao atualizar o curso",
        type: "error"
      });
    }
  });

  const handleSubmit = useCallback(async (data: ICursoFormData) => {
    try {
      if (!formRef.current) {
        throw new Error('formRef invalid');
      }
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        nome: Yup.string().required('O nome é obrigatório'),
        descricao: Yup.string().required('este campo é obrigatório')
      });

      await schema.validate(data, {
        abortEarly: false
      });

      if (curso) {
        AtualizarCurso({
          variables: {
            cursoId: curso.verCurso.curso.id,
            nome: data.nome,
            descricao: data.descricao
          }
        });
      } else {
        CreateCurso({
          variables: {
            nome: data.nome,
            descricao: data.descricao
          }
        });
      }
    } catch (err) {
      const errors = getValidationErrors(err);
      if (!formRef.current) {
        throw new Error('formRef invalid');
      }
      formRef.current.setErrors(errors);
      return
    }


  }, [curso]);

  const handleDelete = useCallback(async () => {
    curso &&
      DeletarCurso({
        variables: {
          id: curso.verCurso.curso.id
        }
      });
  }, [curso]);

  useEffect(() => {
    headingText ? setHeading(headingText) : setHeading('criar curso');

    if (curso) {
      setCursoId(curso.verCurso.curso.id);
      setInitialData({
        nome: curso.verCurso.curso.nome,
        descricao: curso.verCurso.curso.descricao
      });
    }
  }, [setCursoId, setHeading, curso]);

  return (
    <Container>
      <h1>{heading}</h1>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={initialData}>
          <div className="full-width">
            <label>nome</label>
            <Input name="nome" containerStyle={{ border: 'none', borderRadius: 0, width: '100%' }} />
          </div>

          <div className="full-width">
            <label>descrição</label>
            <Input name="descricao" containerStyle={{ border: 'none', borderRadius: 0, width: '100%' }} />
          </div>

          <Button type="submit">salvar curso</Button>
        </Form>

        {cursoId && (
          <>
            <Button className="delete" onClick={() => setIsPopupOpen(!isPopupOpen)}>deletar curso</Button>
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