import React from 'react';
import { useParams } from 'react-router-dom';

import Navbar from '../../components/Navbar';
import TopMenu from '../../components/TopMenu';

import { Container } from './styles';
import ProfileForm from '../../components/ProfileForm';

interface IRouteParams {
  id: string;
}

const Profile: React.FC = () => {
  const { id } = useParams<IRouteParams>();

  return (
    <Container>
      <TopMenu />

      <ProfileForm id={id} headingText="editar perfil" />

      <Navbar />
    </Container>
  );
}

export default Profile;