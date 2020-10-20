import { Router } from 'express';
//import User from '../models/User';
import { getCustomRepository } from "typeorm";

import UsersRepository from '../repositories/UsersRepository';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
        const usersRepository = getCustomRepository(UsersRepository);
        const users = await usersRepository.find();

    return response.json(users);
});

usersRouter.post('/', async (request, response) => {
    try {
        const { nome, idade, profissao, password } = request.body;

        const createUser = new CreateUserService();
        
        const user = await createUser.execute({
            nome,
            idade,
            profissao,
            password
        });
        
        return response.json(user);
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
});

export default usersRouter;