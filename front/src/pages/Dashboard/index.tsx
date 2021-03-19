import React from 'react';
import { useAuth } from '../../hooks/auth';

import Navbar from '../../components/Navbar';
import NavbarDesktop from '../../components/NavbarDesktop';
import TopMenu from '../../components/TopMenu';

import { Container, NotificationContainer, DashboardContent, User, AbrigosList, Abrigo } from './styles';
import { Link, Redirect } from 'react-router-dom';

import Perfil from '../../images/perfil-avatar.png'
import { FiMinusCircle } from 'react-icons/fi';

import { useQuery } from '@apollo/client';
import { GET_ABRIGOS, GET_USERS, VIEW_NOTIFICATIONS } from './apolloQueries';

interface IProfissionaisData {
  id: string;
  nome: string;
  profissao: string;
}

interface IProfissionaisQuery {
  verUsuarios: IProfissionaisData[];
}

interface IAbrigosQuery {
  verAbrigos: {
    id: string;
    nome: string;
    endereco: string;
  }[];
}

interface INotification {
  verNotificacoes: {
    id: number;
    conteudo: string;
    arquivada: boolean;
    tipo: string;
  }[]
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const { data: profissionaisQl } = useQuery<IProfissionaisQuery>(GET_USERS);
  const { data: abrigosQl } = useQuery<IAbrigosQuery>(GET_ABRIGOS);
  const { data: notificationsQl } = useQuery<INotification>(VIEW_NOTIFICATIONS);

  return (
    <Container>
      <TopMenu />

      {user.credencial === "AbrigoAdmin" && user.abrigo && <Redirect to={`/abrigo/${user.abrigo.id}`} />}
      {user.credencial === "AbrigoAdmin" && !user.abrigo && <Redirect to="/abrigos/novo" />}
      {user.credencial === "Aluno" && <Redirect to="/Assistir" />}

      <DashboardContent>
        {notificationsQl && notificationsQl.verNotificacoes.length > 0 && <h2>notificações recentes</h2>}
        {notificationsQl && notificationsQl.verNotificacoes.map(notification => (
          <NotificationContainer key={notification.id} type={notification.tipo}>
            <p>{notification.conteudo}</p>
          </NotificationContainer>
        ))}

        {profissionaisQl && <h2>últimos profissionais cadastrados</h2>}
        {profissionaisQl && profissionaisQl.verUsuarios.map(profissional => (
          <User key={profissional.id}>
            <Link to={`/user/${profissional.id}`}>
              <img src={Perfil} alt="foto de perfil" />
              <div>
                <h3>{profissional.nome}</h3>
                <strong>{profissional.profissao}</strong>
              </div>
            </Link>
          </User>
        ))}

        <AbrigosList>
          {abrigosQl && <h2>últimos abrigos cadastrados</h2>}
          {abrigosQl && abrigosQl.verAbrigos.map(abrigo => (
            <Abrigo key={abrigo.id}>
              <Link to={`/abrigo/${abrigo.id}`}>
                <h3>{abrigo.nome}</h3>
                <strong>{abrigo.endereco}</strong>
              </Link>
            </Abrigo>
          ))}
        </AbrigosList>
      </DashboardContent>

      <Navbar />
      <NavbarDesktop />
    </Container>
  );
}

export default Dashboard;