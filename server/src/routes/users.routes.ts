import { Router } from 'express';
//import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

const usersRouter = Router();
const usersRepository = new UsersRepository();

usersRouter.get('/', (request, response) => {
    const users = usersRepository.all();

    return response.json(users);
});

usersRouter.post('/', (request, response) => {
    const { id, nome, idade, profissao } = request.body;

    const user = usersRepository.create(id, nome, idade, profissao);
    
    return response.json(user);
});

export default usersRouter;