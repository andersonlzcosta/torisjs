import express from 'express';
import routes from './routes';

import './database';

const app = express();

app.use(express.json());
app.use(routes);

app.get('/', (request, response) => {
  return response.json({ message: 'Hellowtheeere2e'});
});

app.listen(process.env.PORT || 2222, () => {
  console.log('Server started on port 2222');
});