import React from 'react';

import Navbar from '../../components/Navbar';
import TopMenu from '../../components/TopMenu';
import { Container, Profissionais } from './styles';

import Perfil from '../../images/perfil.jpg'
import Plus from '../../images/plus.svg'

const Dashboard: React.FC = () => {
  return (
    <Container>
      <TopMenu />
      <Profissionais>
        <h2>últimos profissionais cadastrados</h2>
        <div>
          <img src={Perfil} alt="foto de perfil" />
          <div>
            <h3>Pedro Feliciano da Silva</h3>
            <strong>35 anos - Psicólogo</strong>
          </div>
          <a href="#"><img src={Plus} alt="sinal de +" /></a>
        </div>

        <div>
          <img src={Perfil} alt="foto de perfil" />
          <div>
            <h3>João Felipe Abreu</h3>
            <strong>27 anos - Enfermeiro</strong>
          </div>
          <a href="#"><img src={Plus} alt="sinal de +" /></a>
        </div>
      </Profissionais>
      <Navbar />
    </Container>
  );
}

export default Dashboard;