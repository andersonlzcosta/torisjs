import React, { useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';


import { Container } from './styles';
import logo from '../../images/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface credentialsData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const handleSubmit = useCallback(async (data: credentialsData) => {
    try {
      if (!formRef.current) {
        throw new Error('formRef invalid');
      }
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail é obrigatório').email('Use um e-mail válido'),
        password: Yup.string().required('Senha Obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      history.push('/dashboard');

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        if (!formRef.current) {
          throw new Error('formRef invalid');
        }
        formRef.current.setErrors(errors);
        return
      }
    }
  }, []);

  return (
    <Container style={{ maxWidth: 400 }}>
      <img src={logo} alt="logo da Rede Abrigo" />

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="email" placeholder="E-mail" />
        <Input name="password" type="password" placeholder="Senha" />
        <Button type="submit">Entrar</Button>
      </Form>

      <a href="https://www.redeabrigo.org/" target="_blank">Sobre a Rede Abrigo</a>
    </Container>
  );
}

export default SignIn;