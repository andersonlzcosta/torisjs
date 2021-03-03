import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';

import { CREATE_USER } from './apolloQueries';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container } from './styles';

interface credentialsData {
  nome: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { addToast } = useToast();

  const [CreateUser] = useMutation(CREATE_USER, {
    onCompleted() {
      addToast({
        title: "Usuário criado!",
        type: "success"
      });
      history.push('/');
    },
    onError() {
      addToast({
        title: "Erro ao criar usuário",
        type: "error"
      });
    }
  });

  const handleSubmit = useCallback(async (formData: credentialsData) => {
    try {
      if (!formRef.current) {
        throw new Error('formRef invalid');
      }
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        nome: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('E-mail é obrigatório').email('Use um e-mail válido'),
        password: Yup.string().required('Senha Obrigatória'),
      });

      await schema.validate(formData, {
        abortEarly: false,
      });

      CreateUser({
        variables: {
          nome: formData.nome,
          email: formData.email,
          password: formData.password
        }
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        if (!formRef.current) {
          throw new Error('formRef invalid');
        }
        formRef.current.setErrors(errors);
        return
      }

      if (err instanceof Error) {
        addToast({
          title: err.message,
          message: 'tente novamente',
          type: 'error'
        });
      }

    }
  }, []);

  return (
    <Container style={{ maxWidth: 400 }}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Cadastre-se</h1>
        <Input name="nome" placeholder="Nome" />
        <Input name="email" placeholder="E-mail" type="email" />
        <Input name="password" type="password" placeholder="Senha" />
        <Button type="submit">Entrar</Button>
      </Form>

      <Link to="/">Voltar ao login</Link>
    </Container>
  );
}

export default SignUp;