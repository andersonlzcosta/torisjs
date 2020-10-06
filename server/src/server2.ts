import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';


import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import routes from './routes';
import { errors } from 'celebrate';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

import '@shared/infra/typeorm';
import '@shared/container';
import rateLimiter from './middlewares/rateLimiter';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(rateLimiter);
app.use(routes);
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

app.listen(process.env.PORT || 3333, () => {
  console.log('Servidor iniciado na porta 3333');
});
