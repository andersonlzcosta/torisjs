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
import { useToast } from '../../hooks/toast';

interface IProfileFormProps {
  user?: IUserData;
  headingText?: string;
  updateProfissionaisList?: () => void;
}

const ProfileForm: React.FC<IProfileFormProps> = ({ user, headingText, updateProfissionaisList }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [heading, setHeading] = useState<string>();
  const [userId, setUserId] = useState<string>();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { hookAbrigo } = useAbrigo();
  const { addToast } = useToast();

  const handleSubmit = useCallback(async (data: IUserData) => {
    try {
      setIsLoading(true);
      let response;
      if (userId) {
        response = await api.put(`/users/${userId}`, data);
      } else {
        response = await api.post(`/users`, data);
        history.push('/profissionais/todos');
      }
      setIsLoading(false);
      addToast({
        title: "Profissional criado com sucesso!",
        message: "você será redirecionado para todos",
        type: "success"
      });
      updateProfissionaisList && updateProfissionaisList();
    } catch (err) {
      addToast({
        title: "Ocorreu um erro",
        message: "tente novamente",
        type: "error"
      });
      setIsLoading(false);
    }
  }, [userId, setIsLoading, setUserId]);

  const handleDelete = useCallback(async () => {
    try {
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
            <Input name="nome" className="alt" />
          </div>

          <div className="half-width">
            <label>data de nascimento</label>
            <Input className="alt" name="idade" />
          </div>

          <div className="half-width">
            <label>profissão</label>
            <Input className="alt" name="profissao" />
          </div>

          <div className="half-width">
            <label>email</label>
            <Input className="alt" name="email" />
          </div>

          <div className="half-width">
            <label>email 2</label>
            <Input className="alt" name="email2" />
          </div>

          <div className="half-width">
            <label>telefone</label>
            <Input className="alt" name="telefone" />
          </div>

          <div className="half-width">
            <label>telefone 2</label>
            <Input className="alt" name="telefone2" />
          </div>

          <div className="half-width">
            <label>Cargo na instituição</label>
            <select name="cargo">
              <option value="diretor">Diretor</option>
              <option value="assessor">Assessor da Direção</option>
              <option value="assistente-social">Assistente Social</option>
              <option value="psicologo">Psicólogo</option>
              <option value="pedagogo">Pedagogo</option>
              <option value="educador">Educador Social</option>
            </select>
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