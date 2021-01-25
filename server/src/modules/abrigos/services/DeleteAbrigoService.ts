import { getCustomRepository } from "typeorm";
import AbrigosRepository from "../infra/typeorm/repositories/AbrigosRepository";
// import IAbrigosRepository from '@modules/abrigos/repositories/IAbrigosRepository';

interface Request {
    id: string;
}

class DeleteAbrigoService {
    public async execute( { id } : Request): Promise<boolean> {

        const abrigosRepository = getCustomRepository(AbrigosRepository);
        await abrigosRepository.delete( id );
        return true;

    }
}

export default DeleteAbrigoService;