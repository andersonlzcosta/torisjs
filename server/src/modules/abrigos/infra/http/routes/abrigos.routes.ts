import { Router } from 'express';
//import User from '../models/User';
import { getCustomRepository } from "typeorm";

import AbrigosRepository from '@modules/abrigos/infra/typeorm/repositories/AbrigosRepository';
import CreateAbrigoService from '@modules/abrigos/services/CreateAbrigoService';

const abrigosRouter = Router();



abrigosRouter.get('/', async (request, response) => {
    const abrigosRepository = getCustomRepository(AbrigosRepository);
    const abrigos = await abrigosRepository.findAll();

    return response.json(abrigos);
});

export default abrigosRouter;