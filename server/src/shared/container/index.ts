import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IAbrigosRepository from '@modules/abrigos/repositories/IAbrigosRepository';
import AbrigosRepository from '@modules/abrigos/infra/typeorm/repositories/AbrigosRepository';

import INotificacoesRepository from '@modules/notificacoes/repositories/INotificacoesRepository';
import NotificacoesRepository from '@modules/notificacoes/infra/typeorm/repositories/NotificacoesRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
container.registerSingleton<IAbrigosRepository>('AbrigosRepository', AbrigosRepository);
container.registerSingleton<INotificacoesRepository>('NotificacoesRepository', NotificacoesRepository);