import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import Navbar from '../../components/Navbar';
import NavbarDesktop from '../../components/NavbarDesktop';
import TopMenu from '../../components/TopMenu';

import { Container, NotificationContainer, UserList, User, AbrigosList, Abrigo } from './styles';
import { Link } from 'react-router-dom';
import { IAbrigosData } from '../../components/AbrigoForm';

import Perfil from '../../images/perfil.jpg'
import { FiMinusCircle } from 'react-icons/fi';
import { useToast } from '../../hooks/toast';

interface IProfissionaisData {
  id: number;
  nome: string;
  idade: number;
  profissao: string;
}

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

const Dashboard: React.FC = () => {
  const [profissionais, setProfissionais] = useState<IProfissionaisData[]>();
  const [abrigos, setAbrigos] = useState<IAbrigosData[]>();
  const [activeNotifications, setActiveNotifications] = useState<INotificacao[]>();
  const [archivedNotifications, setArchivedNotifications] = useState<number[]>();
  const [thisUser, setThisUser] = useState<IUser>();

  const { user } = useAuth();
  const { addToast } = useToast();

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
    api.get('/users?_limit=2').then(response => {
      setProfissionais(response.data);
    });

    api.get('/abrigos?_limit=2').then(response => {
      setAbrigos(response.data);
    });

    Promise.all([
      api.get('/notifications'),
      api.get(`/users/${user.id}`)
    ]).then(responses => {
      const todasNotificacoes: INotificacao[] = responses[0].data;
      const userData: IUser = responses[1].data;
      const updatedActiveNotifications = todasNotificacoes.filter(notificacao => !userData.archivedNotifications.includes(notificacao.id));
      setActiveNotifications(updatedActiveNotifications);
      setArchivedNotifications(userData.archivedNotifications);
      setThisUser(userData);
    });
  }, [user]);

  return (
    <Container>
      <TopMenu />
      <UserList>
        <h2>notificações recentes</h2>

        {activeNotifications && activeNotifications.map(notification => (
          <NotificationContainer key={notification.id} type={notification.type}>
            <p>{notification.message}</p>
            <button onClick={() => handleDelete(notification.id)}><FiMinusCircle size={20} /></button>
          </NotificationContainer>
        ))}

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