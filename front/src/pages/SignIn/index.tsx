import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';

import logo from '../../images/logo.svg';

const signIn: React.FC = () => {
  return (
    <Container style={{ maxWidth: 400 }}>
      <img src={logo} alt="logo da Rede Abrigo" />

      <form>
        <input type="email" id="email" name="email" placeholder="e-mail" />
        <input type="password" id="password" name="password" placeholder="senha" />
        <Link to="/dashboard">login</Link>
      </form>

      <a href="https://www.redeabrigo.org/" target="_blank">Sobre a Rede Abrigo</a>
    </Container>
  );
}

export default signIn;