import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';

import { Container, Content } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface IUserData {
  id: number;
  nome: string;
  idade: string;
  profissao: string;
}

interface IProfileFormProps {
  id?: string;
  headingText?: string;
}

const ProfileForm: React.FC<IProfileFormProps> = ({ id, headingText }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [heading, setHeading] = useState<string>();
  const [userId, setUserId] = useState<string>();
  const [user, setUser] = useState<IUserData>();
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const handleSubmit = useCallback(async (data: IUserData) => {
    try {
      setIsLoading(true);
      let response;
      if (userId) {
        response = await api.put(`/users/${userId}`, data);
      } else {
        response = await api.post(`/users`, data);
        setUserId(response.data.id);
        console.log(userId);
      }
      console.log(response);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }, [userId, setIsLoading, setUserId]);

  const handleDelete = useCallback(async () => {
    try {
      console.log(userId);
      setIsLoading(true);
      await api.delete(`/users/${userId}`);
      setIsLoading(false);
      history.push('/profissionais/todos');
    } catch (err) {
      console.log('erro ao deletar');
    }
  }, [userId, setIsLoading, history]);

  useEffect(() => {
    headingText ? setHeading(headingText) : setHeading('criar novo usuário')

    if (id) {
      setUserId(id);
      api.get(`/users/${id}`).then(response => {
        setUser(response.data);
      });
    }
  }, [setUserId, setUser, setHeading]);

  return (
    <Container>
      <h1>{heading}</h1>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={user}>
          <div className="full-width">
            <label>nome</label>
            <Input name="nome" containerStyle={{ border: 'none', borderRadius: 0, width: '100%' }} />
          </div>

          <div className="half-width">
            <label>idade</label>
            <Input className="bigger" name="idade" containerStyle={{ border: 'none', borderRadius: 0, width: '100%' }} />
          </div>

          <div className="half-width">
            <label>profissão</label>
            <Input className="bigger" name="profissao" containerStyle={{ border: 'none', borderRadius: 0, width: '100%' }} />
          </div>

          <Button type="submit" loading={isLoading}>salvar</Button>
        </Form>

        {userId && (
          <Button onClick={handleDelete} loading={isLoading}>deletar usuário</Button>
        )}
      </Content>
    </Container>
  );
}

export default ProfileForm;