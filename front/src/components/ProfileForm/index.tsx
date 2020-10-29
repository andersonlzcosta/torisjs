import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useAbrigo } from '../../hooks/AbrigoHook';
import api from '../../services/api';

import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';


import { Container, Content } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { IUserData } from '../../pages/Profile';
import Popup from '../Popup';

interface IProfileFormProps {
  user?: IUserData;
  headingText?: string;
}

const ProfileForm: React.FC<IProfileFormProps> = ({ user, headingText }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [heading, setHeading] = useState<string>();
  const [userId, setUserId] = useState<string>();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { hookAbrigo } = useAbrigo();

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
      setIsPopupOpen(!isPopupOpen);
      history.push('/profissionais/todos');
    } catch (err) {
      console.log('erro ao deletar');
      setIsLoading(false);
      setIsPopupOpen(!isPopupOpen);
    }
  }, [userId, setIsLoading, history]);

  useEffect(() => {
    hookAbrigo.id ? setHeading('visualizar perfil') : setHeading(headingText)

    if (user) {
      setUserId(user.id.toString());
    }
  }, [setUserId, setHeading, user]);

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

          {!hookAbrigo.id && (
            <Button type="submit" loading={isLoading}>salvar</Button>
          )}
        </Form>

        {userId && !hookAbrigo.id && (
          <>
            <Button className="delete" onClick={() => setIsPopupOpen(!isPopupOpen)} loading={isLoading}>deletar perfil</Button>
            <Popup isVisible={isPopupOpen} onCancel={() => setIsPopupOpen(!isPopupOpen)} onFulfill={handleDelete} >
              Tem certeza que deseja deletar este perfil?
            </Popup>
          </>
        )}
      </Content>
    </Container>
  );
}

export default ProfileForm;