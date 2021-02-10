import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import Navbar from '../../components/Navbar';
import NavbarDesktop from '../../components/NavbarDesktop';
import TopMenu from '../../components/TopMenu';

import { Container, NotificationContainer, DashboardContent, User, AbrigosList, Abrigo } from './styles';
import { Link } from 'react-router-dom';

import Perfil from '../../images/perfil.jpg'
import { FiMinusCircle } from 'react-icons/fi';
import { useToast } from '../../hooks/toast';

import { gql, useQuery } from '@apollo/client';

interface INotificacao {
  id: number;
  type: string;
  message: string;
}

interface IUser {
  id: number;
  nome: string;
  idade: string;
  profissao: string;
  archivedNotifications: number[];
}

const GET_USERS = gql`
query VerUsuarios{
  verUsuarios{
    id,
    nome,
    email,
    profissao
  }
}
`;

interface IProfissionaisData {
  id: string;
  nome: string;
  profissao: string;
}

interface IProfissionaisQuery {
  verUsuarios: IProfissionaisData[];
}

const GET_ABRIGOS = gql`
{
  verAbrigos{
    id,
    nome,
    endereco
  }
}
`;

interface IAbrigosData {
  id: string;
  nome: string;
  endereco: string;
}

interface IAbrigosQuery {
  verAbrigos: IAbrigosData[];
}

const Dashboard: React.FC = () => {
  const [activeNotifications, setActiveNotifications] = useState<INotificacao[]>();
  const [archivedNotifications, setArchivedNotifications] = useState<number[]>();
  const [thisUser, setThisUser] = useState<IUser>();

  const { user } = useAuth();
  const { addToast } = useToast();

  /// GET ALL USERS
  const { data: profissionaisQl } = useQuery<IProfissionaisQuery>(GET_USERS);

  /// GET ALL ABRIGOS
  const { data: abrigosQl } = useQuery<IAbrigosQuery>(GET_ABRIGOS);


  const handleDelete = useCallback((notificationId: number) => {
    if (activeNotifications && archivedNotifications && thisUser) {
      const updatedNotifications = activeNotifications.filter(notification => notification.id !== notificationId);

      setActiveNotifications(updatedNotifications);

      const updatedArchive = [...archivedNotifications, notificationId]
      setArchivedNotifications(updatedArchive);

      api.put(`/users/${user.id}`, {
        nome: thisUser.nome,
        idade: thisUser.idade,
        profissao: thisUser.profissao,
        archivedNotifications: updatedArchive
      });

      addToast({
        title: "Notificação arquivada!",
        type: "success"

      });
    }
  }, [activeNotifications, archivedNotifications, thisUser]);

  useEffect(() => {
    // Promise.all([
    //   api.get('/notifications'),
    //   api.get(`/users/${user.id}`)
    // ]).then(responses => {
    //   const todasNotificacoes: INotificacao[] = responses[0].data;
    //   const userData: IUser = responses[1].data;
    //   const updatedActiveNotifications = todasNotificacoes.filter(notificacao => !userData.archivedNotifications.includes(notificacao.id));
    //   setActiveNotifications(updatedActiveNotifications);
    //   if (userData.archivedNotifications) {
    //     setArchivedNotifications(userData.archivedNotifications);
    //   }
    //   setThisUser(userData);
    // });
  }, [user]);

  return (
    <Container>
      <TopMenu />
      <DashboardContent>

        {activeNotifications && <h2>notificações recentes</h2>}
        {activeNotifications && activeNotifications.map(notification => (
          <NotificationContainer key={notification.id} type={notification.type}>
            <p>{notification.message}</p>
            <button onClick={() => handleDelete(notification.id)}><FiMinusCircle size={20} /></button>
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