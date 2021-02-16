import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Menu } from './styles';
import TopMenu from '../TopMenu';
import logo from '../../images/logo.svg';

const NavbarDesktop: React.FC = () => {
  return (
    <Container>
      <TopMenu isDesktop={true} />
      <Menu>
        <img src={logo} alt="logo da rede abrigo" />

        <label>início</label>
        <Link to="/dashboard">Painel de Controle</Link>

        <label>abrigos</label>
        {/* <Link to="/abrigos/estatisticas">estatísticas</Link> */}
        <Link to="/abrigos/todos">ver todos</Link>
        <Link to="/abrigos/novo">criar novo</Link>

        <label>profissionais</label>
        {/* <Link to="/profissionais/estatisticas">estatísticas</Link> */}
        <Link to="/profissionais/todos">ver todos</Link>
        <Link to="/profissionais/novo">criar novo</Link>

        <label>cursos</label>
        {/* <Link to="/cursos/estatisticas">estatísticas</Link> */}
        <Link to="/cursos/todos">ver todos</Link>
        <Link to="/cursos/novo">criar novo</Link>
        <Link to="/assistir">assistir cursos</Link>

        <label>Espaço de Conversa</label>
        <Link to="/forum">ver todas as conversas</Link>
        <Link to="/novapergunta">criar nova pergunta</Link>

        <label>notificações</label>
        <Link to="/notifications/new">criar notificação</Link>
      </Menu>
    </Container>
  );
}

export default NavbarDesktop;