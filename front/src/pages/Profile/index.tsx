import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAbrigo } from '../../hooks/AbrigoHook';
import api from '../../services/api';

import Navbar from '../../components/Navbar';
import TopMenu from '../../components/TopMenu';
import Arrow from '../../images/arrow.svg';


import { Container, ButtonsContainer } from './styles';
import ProfileForm from '../../components/ProfileForm';
import NavbarDesktop from '../../components/NavbarDesktop';
import { IAbrigosData } from '../../components/AbrigoForm';
import { useToast } from '../../hooks/toast';

interface IRouteParams {
  id: string;
}

export interface IUserData {
  id: number;
  nome: string;
  idade: string;
  profissao: string;
}

const Profile: React.FC = () => {
  const { id } = useParams<IRouteParams>();
  const { hookAbrigo, setHookAbrigo } = useAbrigo();
  const [user, setUser] = useState<IUserData>();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const history = useHistory();
  const { addToast } = useToast();

  const handleAddProfissionalAbrigo = () => {
    try {
      if (user) {
        const abrigoId = hookAbrigo.id;
        api.put(`/abrigos/${hookAbrigo.id}`, {
          ...hookAbrigo, profissionais: [...hookAbrigo.profissionais, { id: user.id, nome: user.nome }]
        });
        setHookAbrigo({} as IAbrigosData);
        setIsVisible(false);
        addToast({
          type: 'success',
          title: 'Profissional adicionado!',
          message: 'informações do abrigo foram atualizadas.',
        });
        history.push(`/abrigo/${abrigoId}`);
      }
    } catch (err) {
      console.log(err);
      addToast({
        type: 'error',
        title: 'Erro ao adicionar',
        message: 'tente novamente ou entre em contato com suporte.',
      });
    }
  }

  useEffect(() => {
    api.get(`/users/${id}`).then(response => {
      setUser(response.data);
    });

    if (hookAbrigo.id) {
      setIsVisible(true);
    }
  }, []);

  return (
    <Container>
      <TopMenu />

      <ProfileForm user={user} headingText="editar perfil" />

      {isVisible && (
        <ButtonsContainer>
          <button className="voltar" onClick={() => history.push('/profissionais/todos')}>
            <img src={Arrow} alt="seta para voltar" />
          </button>
          <button
            onClick={handleAddProfissionalAbrigo}>
            adicionar este usuário ao abrigo {hookAbrigo.nome}
          </button>
        </ButtonsContainer>
      )}

      <Navbar />
      <NavbarDesktop />
    </Container>
  );
}

export default Profile;