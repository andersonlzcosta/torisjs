import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { credencial } from '../../hooks/auth';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';
import { LOGIN } from './apolloQueries';

import { Container } from './styles';
import logo from '../../images/redeabrigo-logo-completo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface credentialsData {
  email: string;
  senha: string;
}

interface ILoginResponse {
  iniciarSessao: {
    token: string;
    user: {
      id: string;
      nome: string;
      credencial: credencial;
      abrigo: {
        id: number;
      }
    }
  }
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { assignSession } = useAuth();
  const { addToast } = useToast();

  const [IniciarSessao] = useLazyQuery<ILoginResponse>(LOGIN, {
    onCompleted(data) {
      assignSession({
        token: data.iniciarSessao.token,
        user: data.iniciarSessao.user
      });
      history.push('/dashboard');
    },
    onError() {
      addToast({
        title: "email ou senha inválido",
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
        email: Yup.string().required('E-mail é obrigatório').email('Use um e-mail válido'),
        senha: Yup.string().required('Senha Obrigatória'),
      });

      await schema.validate(formData, {
        abortEarly: false,
      });

      IniciarSessao({
        variables: { email: formData.email, senha: formData.senha }
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
      <img src={logo} alt="logo da Rede Abrigo" />

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="email" placeholder="E-mail" />
        <Input name="senha" type="password" placeholder="Senha" />
        <Button type="submit">Entrar</Button>
      </Form>

      <aside>tem interesse em participar da formação?</aside>
      <a href="https://www.redeabrigo.org/faca-parte/" target="_blank">Faça Parte</a>
      <a href="https://www.redeabrigo.org/" target="_blank">Sobre a Rede Abrigo</a>
    </Container>
  );
}

export default SignIn;