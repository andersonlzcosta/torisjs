import React, { useEffect, useState } from 'react';

import Navbar from '../../components/Navbar';
import TopMenu from '../../components/TopMenu';
import { Container, UserList, User } from './styles';

import Perfil from '../../images/perfil.jpg'
import Plus from '../../images/plus.svg'
import api from '../../services/api';
import NavbarDesktop from '../../components/NavbarDesktop';
import { Link } from 'react-router-dom';

interface IProfissionaisData {
  id: number;
  nome: string;
  idade: number;
  profissao: string;
}

const Dashboard: React.FC = () => {
  const [profissionais, setProfissionais] = useState<IProfissionaisData[]>();

  useEffect(() => {
    api.get('/users').then(response => {
      setProfissionais(response.data);
    });

  }, [setProfissionais]);


  return (
    <Container>
      <TopMenu />
      <UserList>
        <h2>últimos profissionais cadastrados</h2>

        {profissionais && profissionais.map(profissional => (

          <User key={profissional.id}>
            <img src={Perfil} alt="foto de perfil" />
            <div>
              <h3>{profissional.nome}</h3>
              <strong>{profissional.idade} anos - {profissional.profissao}</strong>
            </div>
            <Link to={`/user/${profissional.id}`}><img src={Plus} alt="sinal de +" /></Link>
          </User>
        ))}

      </UserList>
      <Navbar />
      <NavbarDesktop />
    </Container>
  );
}

export default Dashboard;