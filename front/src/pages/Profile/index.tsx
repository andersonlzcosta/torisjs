import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAbrigo } from '../../hooks/AbrigoHook';
import api from '../../services/api';

import Navbar from '../../components/Navbar';
import TopMenu from '../../components/TopMenu';

import { Container } from './styles';
import ProfileForm from '../../components/ProfileForm';
import NavbarDesktop from '../../components/NavbarDesktop';
import { IAbrigosData } from '../../components/AbrigoForm';

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

  const handleAddProfissionalAbrigo = () => {
    try {
      if (user) {
        api.put(`/abrigos/${hookAbrigo.id}`, {
          ...hookAbrigo, profissionais: [...hookAbrigo.profissionais, { id: user.id, nome: user.nome }]
        });
        setHookAbrigo({} as IAbrigosData);
        setIsVisible(false);
      }
    } catch (err) {
      console.log(err);
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

      {isVisible && (
        <button onClick={handleAddProfissionalAbrigo}>adicionar este usuário ao abrigo {hookAbrigo.nome}</button>
      )}

      <ProfileForm id={id} user={user} headingText="editar perfil" />

      <Navbar />
      <NavbarDesktop />
    </Container>
  );
}

export default Profile;