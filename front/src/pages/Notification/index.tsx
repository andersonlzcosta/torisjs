import React, { useCallback, useEffect, useState } from 'react';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import { useHistory } from 'react-router-dom';

import { Container, CreateNotification, InputContainer, ViewNotifications, SingleNotification } from './styles';

import TopMenu from '../../components/TopMenu';
import Navbar from '../../components/Navbar';
import NavbarDesktop from '../../components/NavbarDesktop';

import { Form } from '@unform/web';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Button from '../../components/Button';
import { FiMinusCircle } from 'react-icons/fi';

interface ISubmittedData {
  message: string;
}

interface INotification {
  id: number;
  message: string;
  type: string
}

const Notification: React.FC = () => {
  const [selectedType, setSelectedType] = useState();
  const [notifications, setNotifications] = useState<INotification[]>();

  const history = useHistory();
  const { addToast } = useToast();

  const handleSubmit = useCallback((data: ISubmittedData) => {
    const notification = {
      id: Math.floor(Math.random() * Math.floor(1000)),
      type: selectedType,
      message: data.message
    }

    try {
      api.post('/notifications', notification);
      addToast({
        title: "Notificação enviada!",
        type: "success"
      });

      history.push('/dashboard');
    } catch (error) {
      addToast({
        title: "Ocorreu um erro",
        type: "success",
        message: "tente novamente"
      });
    }

  }, [selectedType]);

  const handleChange = useCallback((event) => {
    setSelectedType(event.target.value);
  }, []);

  // const handleDelete = (notificationId: number) => {
  //   if (notifications) {
  //     const updatedNotifications = notifications.filter(notification => notification.id !== notificationId);
  //     api.delete(`/notifications/${notificationId}`);
  //     setNotifications(updatedNotifications);
  //     addToast({
  //       title: "Notificação deletada",
  //       type: "success"
  //     });
  //   }
  // }

  useEffect(() => {
    api.get('/notifications').then(response => {
      setNotifications(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <Container>
      <TopMenu />

      {location.pathname === '/notifications/all' && (
        <ViewNotifications>
          <h2>todas as notificações</h2>
          {notifications && notifications.map(notification => (
            <SingleNotification key={notification.id} type={notification.type} >
              <p>{notification.message}</p>
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
            <Textarea name="message"></Textarea>

            <label style={{ marginTop: 20 }}>escolha o tipo de notificação</label>
            <InputContainer>
              <Input type="radio" name="warning" inputName="messageType" value="warning" onChange={handleChange} />
              <label>aviso</label>
            </InputContainer>

            <InputContainer>
              <Input type="radio" name="news" inputName="messageType" value="news" onChange={handleChange} />
              <label>notícia</label>
            </InputContainer>

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
