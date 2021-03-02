import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useAbrigo } from '../../hooks/AbrigoHook';
import { useToast } from '../../hooks/toast';

import ProfileForm from '../../components/ProfileForm';
import NavbarDesktop from '../../components/NavbarDesktop';
import { IAbrigosData } from '../../components/AbrigoForm';
import Navbar from '../../components/Navbar';
import TopMenu from '../../components/TopMenu';
import Arrow from '../../images/arrow.svg';

import { Container, ButtonsContainer } from './styles';
import { VER_USUARIO } from './apolloQueries';


interface IRouteParams {
  id: string;
}

interface IUserData {
  id: string;
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
  id: string;
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

const Profile: React.FC = () => {
  const { id } = useParams<IRouteParams>();
  const { hookAbrigo, setHookAbrigo } = useAbrigo();
  const [user, setUser] = useState<IUserManipulatedData>();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const history = useHistory();
  const { addToast } = useToast();

  useQuery<IGETQueryResponse>(VER_USUARIO, {
    variables: { id: id },
    onCompleted(data) {
      const nascimento = new Date(data.verUsuario.user.nascimento);
      let abrigoId = "";
      if (data.verUsuario.user.abrigo) { abrigoId = data.verUsuario.user.abrigo.id }
      console.log(abrigoId);
      setUser({
        ...data.verUsuario.user,
        nascimento: nascimento,
        abrigoId
      });
    },
    onError() { addToast({ title: "erro ao carregar usuário" }) }
  });

  const handleAddProfissionalAbrigo = () => {
    // try {
    //   if (user) {
    //     const abrigoId = hookAbrigo.id;
    //     api.put(`/abrigos/${hookAbrigo.id}`, {
    //       ...hookAbrigo, profissionais: [...hookAbrigo.profissionais, { id: user.id, nome: user.nome }]
    //     });
    //     setHookAbrigo({} as IAbrigosData);
    //     setIsVisible(false);
    //     addToast({
    //       type: 'success',
    //       title: 'Profissional adicionado!',
    //       message: 'informações do abrigo foram atualizadas.',
    //     });
    //     history.push(`/abrigo/${abrigoId}`);
    //   }
    // } catch (err) {
    //   console.log(err);
    //   addToast({
    //     type: 'error',
    //     title: 'Erro ao adicionar',
    //     message: 'tente novamente ou entre em contato com suporte.',
    //   });
    // }
  }

  useEffect(() => {
    hookAbrigo.id && setIsVisible(true);
  }, [hookAbrigo]);

  return (
    <Container>
      <TopMenu />

      <ProfileForm inheritedUser={user} headingText="editar perfil" />

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