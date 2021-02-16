import 'reflect-metadata';
import 'express-async-errors';

import express, { Request, Response, NextFunction } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import cors from 'cors';
import AppError from '@shared/errors/AppError'

import { errors } from 'celebrate';
import '@shared/infra/typeorm';
import '@shared/container';

import { UserResolver } from "@modules/users/infra/http/resolvers/user.resolver";
import { UserSessionResolver } from '@modules/users/infra/http/resolvers/session.resolver';

import { AbrigoResolver } from "@modules/abrigos/infra/http/resolvers/abrigo.resolver";

import { NotificacaoResolver } from '@modules/notificacoes/infra/http/resolvers/notificacao.resolver';

import { CursoResolver } from "@modules/cursos/infra/http/resolvers/curso.resolver";
import { ModuloResolver } from "@modules/cursos/infra/http/resolvers/modulo.resolver";
import { AulaResolver } from "@modules/cursos/infra/http/resolvers/aula.resolver";
import { ModuloPerguntaResolver } from "@modules/cursos/infra/http/resolvers/pergunta.resolver";

import { ForumPerguntaResolver } from "@modules/forums/infra/http/resolvers/pergunta.resolver";
import { ForumRespostaResolver } from "@modules/forums/infra/http/resolvers/resposta.resolver";

const app = express();

app.use(cors());
app.use(express.json());
app.use(errors());

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

const apolloServer = new ApolloServer({
  schema: buildSchema({
    resolvers: [
      UserResolver,
      UserSessionResolver,
      AbrigoResolver,
      NotificacaoResolver,
      CursoResolver,
      ModuloResolver,
      AulaResolver,
      ModuloPerguntaResolver,
      ForumPerguntaResolver,
      ForumRespostaResolver
    ],
    validate: false,
  }),
  context: ({ req, res }) => ({
    req,
    res,
  }),
});

apolloServer.applyMiddleware({
  app,
  cors: false,
});


app.get('/', (_, response) => {
  return response.json({ message: 'go to /api' });
});

app.listen(process.env.PORT || 2000, () => {
  console.log('Server started on port 2000');
});