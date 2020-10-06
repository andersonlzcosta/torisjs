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
    const { nome, idade, profissao, id } = request.body;

    const user = usersRepository.create(nome, profissao);
    
    return response.json(user);
});

export default usersRouter;