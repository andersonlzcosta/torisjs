import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { Container, Menu } from './styles';
import TopMenu from '../TopMenu';
import logo from '../../images/logo.svg';

const NavbarDesktop: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <TopMenu isDesktop={true} />
      <Menu>
        <button onClick={signOut}>Log Out</button>
        <img src={logo} alt="logo da rede abrigo" />

        {user.credencial === "Admin" && (
          <>
            <label>início</label>
            <Link to="/dashboard">Painel de Controle</Link>

            <label>usuários</label>
            <Link to="/profissionais/novo">criar novo</Link>

            <label>abrigos</label>
            <Link to="/abrigos/todos">ver todos</Link>
            <Link to="/abrigos/novo">criar novo</Link>

            <label>profissionais</label>
            <Link to="/profissionais/todos">ver todos</Link>
            <Link to="/profissionais/novo">criar novo</Link>

            <label>editar cursos</label>
            <Link to="/cursos/todos">ver todos</Link>
            <Link to="/cursos/novo">criar novo</Link>

            <label>notificações</label>
            <Link to="/notifications/new">criar notificação</Link>
          </>
        )}

        {user.credencial === "AbrigoAdmin" && user.abrigo && (
          <>
            <label>meu abrigo</label>
            <Link to={`/abrigo/${user.abrigo.id}`}>editar</Link>
          </>
        )}

        <label>assistir cursos</label>
        <Link to="/assistir">assistir cursos</Link>

        <label>espaço de conversa</label>
        <Link to="/forum">ver todas as conversas</Link>
        <Link to="/novapergunta">criar nova pergunta</Link>
      </Menu>
    </Container>
  );
}

export default NavbarDesktop;