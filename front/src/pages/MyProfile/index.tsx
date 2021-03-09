import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

import ProfileForm from '../../components/ProfileForm';
import NavbarDesktop from '../../components/NavbarDesktop';
import Navbar from '../../components/Navbar';
import TopMenu from '../../components/TopMenu';

import { Container } from './styles';
import { VER_USUARIO } from './apolloQueries';
import { useAuth } from '../../hooks/auth';

interface IUserData {
  id: number;
  email: string;
  nome: string;
  password: string;
  oldPassword: string;
  emailAlternativo: string;
  nascimento: any;
  cargo: string;
  telefone1: string;
  telefone2: string;
  profissao: string;
  abrigo: {
    id: string;
    nome: string;
  } | null;
}

interface IUserManipulatedData {
  id: number;
  email: string;
  nome: string;
  password: string;
  oldPassword: string;
  emailAlternativo: string;
  nascimento: any;
  cargo: string;
  telefone1: string;
  telefone2: string;
  profissao: string;
  abrigoId: string;
}

interface IGETQueryResponse {
  verUsuario: {
    user: IUserData;
  }
}

const MyProfile: React.FC = () => {
  const [parsedUser, setParsedUser] = useState<IUserManipulatedData>();
  const { user } = useAuth();

  useQuery<IGETQueryResponse>(VER_USUARIO, {
    variables: { id: user.id },
    onCompleted(data) {
      const nascimento = new Date(data.verUsuario.user.nascimento);
      let abrigoId = "";
      if (data.verUsuario.user.abrigo) { abrigoId = data.verUsuario.user.abrigo.id }
      setParsedUser({
        ...data.verUsuario.user,
        nascimento: nascimento,
        abrigoId
      });
    }
  });

  return (
    <Container>
      <TopMenu />

      <ProfileForm inheritedUser={parsedUser} headingText="editar perfil" />

      <Navbar />
      <NavbarDesktop />
    </Container>
  );
}

export default MyProfile;