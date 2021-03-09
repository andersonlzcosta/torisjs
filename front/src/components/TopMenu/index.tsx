import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Container } from './styles';

import Arrow from '../../images/arrow.svg';
import Sino from '../../images/sino.svg';
import Perfil from '../../images/perfil.svg';

interface TopMenuProps {
  isDesktop?: boolean;
}

const TopMenu: React.FC<TopMenuProps> = ({ isDesktop }) => {
  const { goBack } = useHistory()
  return (
    <Container isDesktop={isDesktop}>
      <img src={Arrow} onClick={goBack} alt="seta para voltar" />
      <Link to="/notifications/all">mensagens<img src={Sino} alt="sino" /></Link>
      <Link to="/myprofile">meu perfil<img src={Perfil} alt="perfil" /></Link>
    </Container>
  );
}

export default TopMenu;