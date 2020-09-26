import React from 'react';
import { Container } from './styles';

import Logo from '../../images/logo.svg';
import abrigos from '../../images/abrigos.svg';
import profissionais from '../../images/profissionais.svg';
import mensagens from '../../images/mensagens.svg';
import cursos from '../../images/cursos.svg';
import forum from '../../images/forum.svg';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <Container>
      <img src={Logo} />
      <Link to="/abrigos"><img src={abrigos} alt="link para abrigos" />abrigos</Link>
      <Link to="/profissionais"><img src={profissionais} alt="link para profissionais" />profissionais</Link>
      <Link to="/mensagens"><img src={mensagens} alt="link para mensagens" />mensagens</Link>
      <Link to="/cursos"><img src={cursos} alt="link para cursos" />cursos</Link>
      <Link to="/forum"><img src={forum} alt="link para forum" />fórum</Link>
    </Container>
  );
}

export default Navbar;