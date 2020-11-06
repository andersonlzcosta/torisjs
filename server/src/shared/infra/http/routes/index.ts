import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import abrigosRouter from '@modules/abrigos/infra/http/routes/abrigos.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/abrigos', abrigosRouter);

export default routes;