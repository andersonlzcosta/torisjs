import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { useToast } from '../../hooks/toast';
import { GET_FORUM_PERGUNTAS } from '../Forum/apolloQueries';
import getValidationErrors from '../../utils/getValidationErrors';
import { CREATE_PERGUNTA } from './apolloQueries';

import Navbar from '../../components/Navbar';
import NavbarDesktop from '../../components/NavbarDesktop';
import TopMenu from '../../components/TopMenu';

import Button from '../../components/Button';
import Textarea from '../../components/Textarea';
import Input from '../../components/Input';

import { Container, ContentContainer } from './styles';

interface IPerguntaData {
  titulo: string;
  corpo: string;
}

const NovaPergunta: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [createPergunta] = useMutation(CREATE_PERGUNTA, {
    refetchQueries: [{ query: GET_FORUM_PERGUNTAS }],
    onCompleted() {
      addToast({
        title: "Pergunta criada com sucesso!",
        type: "success"
      });
      setIsLoading(false);
      history.push('/forum');
    }
  });

  const handleSubmitPergunta = useCallback(async (data: IPerguntaData) => {
    setIsLoading(true);
    try {
      if (!formRef.current) {
        throw new Error('formRef invalid');
      }
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        titulo: Yup.string().required('O título é obrigatório'),
        corpo: Yup.string().required('Digite uma mensagem'),
      });

      await schema.validate(data, {
        abortEarly: false
      });

      createPergunta({
        variables: {
          titulo: data.titulo,
          corpo: data.corpo
        }
      });
    } catch (err) {
      const errors = getValidationErrors(err);
      if (!formRef.current) {
        throw new Error('formRef invalid');
      }
      formRef.current.setErrors(errors);
      setIsLoading(false);
      return
    }
  }, []);

  return (
    <Container>
      <TopMenu />

      <ContentContainer>
        <h2>Nova Pergunta</h2>
        <Form ref={formRef} onSubmit={handleSubmitPergunta}>
          <Input name="titulo" placeholder="Título da pergunta" />
          <Textarea name="corpo"></Textarea>

          <Button type="submit" loading={isLoading}>enviar pergunta</Button>
        </Form>
      </ContentContainer>

      <Navbar />
      <NavbarDesktop />
    </Container>
  );
}

export default NovaPergunta;