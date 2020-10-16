import React, { useEffect, useState } from 'react';

import Navbar from '../../components/Navbar';
import TopMenu from '../../components/TopMenu';
import { Container, UserList, User, AbrigosList, Abrigo } from './styles';

import Perfil from '../../images/perfil.jpg'
import Plus from '../../images/plus.svg'
import api from '../../services/api';
import NavbarDesktop from '../../components/NavbarDesktop';
import { Link } from 'react-router-dom';
import { IAbrigosData } from '../../components/AbrigoForm';

interface IProfissionaisData {
  id: number;
  nome: string;
  idade: number;
  profissao: string;
}

const Dashboard: React.FC = () => {
  const [profissionais, setProfissionais] = useState<IProfissionaisData[]>();
  const [abrigos, setAbrigos] = useState<IAbrigosData[]>();

  useEffect(() => {
    api.get('/users?_limit=2').then(response => {
      setProfissionais(response.data);
    });

    api.get('/abrigos?_limit=2').then(response => {
      setAbrigos(response.data);
    });

  }, [setProfissionais]);


  return (
    <Container>
      <TopMenu />
      <UserList>
        <h2>últimos profissionais cadastrados</h2>

        {profissionais && profissionais.map(profissional => (
          <User key={profissional.id}>
            <Link to={`/user/${profissional.id}`}>
              <img src={Perfil} alt="foto de perfil" />
              <div>
                <h3>{profissional.nome}</h3>
                <strong>{profissional.idade} anos - {profissional.profissao}</strong>
              </div>
            </Link>
          </User>
        ))}

        <AbrigosList>
          <h2>últimos abrigos cadastrados</h2>
          {abrigos && abrigos.map(abrigo => (
            <Abrigo key={abrigo.id}>
              <Link to={`/abrigo/${abrigo.id}`}>
                <h3>{abrigo.nome}</h3>
                <strong>{abrigo.endereco}</strong>
              </Link>
            </Abrigo>
          ))}
        </AbrigosList>

      </UserList>
      <Navbar />
      <NavbarDesktop />
    </Container>
  );
}

export default Dashboard;