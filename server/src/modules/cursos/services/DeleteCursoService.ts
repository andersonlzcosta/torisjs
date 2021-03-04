import { getCustomRepository } from "typeorm";
import CursosRepository from "../infra/typeorm/repositories/CursosRepository";

interface Request {
    id: number;
}

class DeleteCursoService {
    public async execute( { id } : Request): Promise<boolean> {

        const usersRepository = getCustomRepository(CursosRepository);
        await usersRepository.delete( id );
        return true;

    }
}

export default DeleteCursoService;