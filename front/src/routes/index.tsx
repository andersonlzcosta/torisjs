import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Profissionais from '../pages/Profissionais';
import Abrigos from '../pages/Abrigos';
import Profile from '../pages/Profile';
import MyProfile from '../pages/MyProfile';
import Abrigo from '../pages/Abrigo';
import Cursos from '../pages/Cursos';
import Curso from '../pages/Curso';
import VerCursos from '../pages/Assistir/VerCursos';
import CursoDetails from '../pages/Assistir/CursoDetails';
import Aula from '../pages/Assistir/Aula';
import Forum from '../pages/Forum';
import Pergunta from '../pages/Pergunta';
import NovaPergunta from '../pages/NovaPergunta';
import CursoPergunta from '../pages/Assistir/CursoPergunta';
import Notification from '../pages/Notification';

const Routes: React.FC = () => {

  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/cadastro" exact component={SignUp} />

      <Route path="/dashboard" component={Dashboard} isPrivate />

      <Route path="/profissionais" component={Profissionais} isPrivate />
      <Route path="/user/:id" component={Profile} isPrivate />
      <Route path="/myprofile" component={MyProfile} isPrivate />

      <Route path="/abrigos" component={Abrigos} isPrivate />
      <Route path="/abrigo/:id" component={Abrigo} isPrivate />

      <Route path="/cursos" component={Cursos} isPrivate />
      <Route path="/curso/:id" component={Curso} isPrivate />

      <Route path="/assistir" component={VerCursos} isPrivate />
      <Route path="/detalhes/:id" component={CursoDetails} isPrivate />
      <Route path="/aula/:id" component={Aula} isPrivate />
      <Route path="/curso-pergunta/:id" component={CursoPergunta} isPrivate />

      <Route path="/forum" component={Forum} isPrivate />
      <Route path="/pergunta/:id" component={Pergunta} isPrivate />
      <Route path="/novapergunta" component={NovaPergunta} isPrivate />

      <Route path="/notifications" component={Notification} isPrivate />
    </Switch>
  );
}

export default Routes;