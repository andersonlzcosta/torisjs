import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import AppError from '@shared/errors/AppError'

import routes from './routes';
import { errors } from 'celebrate';
import '@shared/infra/typeorm';

const app = express();

app.use(cors());
app.use(express.json());
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


app.get('/', (request, response) => {
  return response.json({ message: 'Hellowtheeere2e'});
});

app.listen(process.env.PORT || 2222, () => {
  console.log('Server started on port 2222');
});