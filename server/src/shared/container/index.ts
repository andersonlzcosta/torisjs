import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IAbrigosRepository from '@modules/abrigos/repositories/IAbrigosRepository';
import AbrigosRepository from '@modules/abrigos/infra/typeorm/repositories/AbrigosRepository';

import INotificacoesRepository from '@modules/notificacoes/repositories/INotificacoesRepository';
import NotificacoesRepository from '@modules/notificacoes/infra/typeorm/repositories/NotificacoesRepository';

import ICursosRepository from '@modules/cursos/repositories/ICursosRepository';
import CursosRepository from '@modules/cursos/infra/typeorm/repositories/CursosRepository';

import IModulosRepository from '@modules/cursos/repositories/IModulosRepository';
import ModulosRepository from '@modules/cursos/infra/typeorm/repositories/ModulosRepository';

import IModulosPerguntasRepository from '@modules/cursos/repositories/IPerguntasRepository';
import ModulosPerguntasRepository from '@modules/cursos/infra/typeorm/repositories/PerguntasRepository';

import IModulosAulasRepository from '@modules/cursos/repositories/IAulasRepository';
import ModulosAulasRepository from '@modules/cursos/infra/typeorm/repositories/AulasRepository';

import IForumsPerguntasRepository from '@modules/forums/repositories/IPerguntasRepository';
import ForumsPerguntasRepository from '@modules/forums/infra/typeorm/repositories/PerguntasRepository';

import IForumsRespostasRepository from '@modules/forums/repositories/IRespostasRepository';
import ForumsRespostasRepository from '@modules/forums/infra/typeorm/repositories/RespostasRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);

container.registerSingleton<IAbrigosRepository>('AbrigosRepository', AbrigosRepository);

container.registerSingleton<INotificacoesRepository>('NotificacoesRepository', NotificacoesRepository);

container.registerSingleton<ICursosRepository>('CursosRepository', CursosRepository);
container.registerSingleton<IModulosRepository>('ModulosRepository', ModulosRepository);
container.registerSingleton<IModulosPerguntasRepository>('ModulosPerguntasRepository', ModulosPerguntasRepository);
container.registerSingleton<IModulosAulasRepository>('ModulosAulasRepository', ModulosAulasRepository);

container.registerSingleton<IForumsPerguntasRepository>('ForumsPerguntasRepository', ForumsPerguntasRepository);
container.registerSingleton<IForumsRespostasRepository>('ForumsRespostasRepository', ForumsRespostasRepository);