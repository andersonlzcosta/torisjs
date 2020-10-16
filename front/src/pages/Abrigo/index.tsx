import React from 'react';
import { useParams } from 'react-router-dom';

import Navbar from '../../components/Navbar';
import TopMenu from '../../components/TopMenu';

import { Container } from './styles';
import NavbarDesktop from '../../components/NavbarDesktop';
import AbrigoForm from '../../components/AbrigoForm';

interface IRouteParams {
  id: string;
}

const Abrigo: React.FC = () => {
  const { id } = useParams<IRouteParams>();

  return (
    <Container>
      <TopMenu />

      <AbrigoForm id={id} headingText="editar abrigo" />

      <Navbar />
      <NavbarDesktop />
    </Container>
  );
}

export default Abrigo;