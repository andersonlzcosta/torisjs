import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { useMutation, useQuery } from '@apollo/client';
import { FiMinusCircle } from 'react-icons/fi';

import { CREATE_NOTIFICATION, VIEW_NOTIFICATIONS } from './apolloQueries';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import { Container, CreateNotification, ViewNotifications, SingleNotification } from './styles';

import TopMenu from '../../components/TopMenu';
import Navbar from '../../components/Navbar';
import NavbarDesktop from '../../components/NavbarDesktop';

import Button from '../../components/Button';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

interface ISubmittedData {
  conteudo: string;
  tipo: string;
}

interface INotification {
  verNotificacoes: {
    id: number;
    conteudo: string;
    arquivada: boolean;
    tipo: string;
  }[]
}

const Notification: React.FC = () => {
  const history = useHistory();
  const { addToast } = useToast();
  const { user } = useAuth();

  const [CriarNotificacao] = useMutation(CREATE_NOTIFICATION, {
    onCompleted() {
      addToast({
        title: "Notificação enviada",
        type: "success"
      });
      refetch();
      history.push('/dashboard');
    }
  });

  const handleSubmit = (data: ISubmittedData) => {
    CriarNotificacao({
      variables: {
        conteudo: data.conteudo,
        arquivada: false,
        tipo: data.tipo,
        userId: user.id
      }
    })
  };

  const { data: notificationsQl, refetch } = useQuery<INotification>(VIEW_NOTIFICATIONS);

  return (
    <Container>
      <TopMenu />

      {location.pathname === '/notifications/all' && (
        <ViewNotifications>
          <h2>todas as notificações</h2>
          {notificationsQl && notificationsQl.verNotificacoes.map(notification => (
            <SingleNotification key={notification.id} type={notification.tipo} >
              <p>{notification.conteudo}</p>
              {/* <button onClick={() => handleDelete(notification.id)}><FiMinusCircle size={20} /></button> */}
            </SingleNotification>
          ))}
        </ViewNotifications>
      )}


      {location.pathname === '/notifications/new' && (
        <CreateNotification>
          <h2>criar nova notificação</h2>
          <Form onSubmit={handleSubmit}>
            <label>sua mensagem</label>
            <Textarea name="conteudo"></Textarea>

            <label style={{ marginTop: 20 }}>escolha o tipo de notificação</label>
            <Select name="tipo" options={[
              { value: "news", label: "Notícia" },
              { value: "warning", label: "Aviso" },
            ]} />

            <Button type="submit">enviar</Button>
          </Form>
        </CreateNotification>
      )}

      <Navbar />
      <NavbarDesktop />
    </Container>
  );
}

export default Notification;
