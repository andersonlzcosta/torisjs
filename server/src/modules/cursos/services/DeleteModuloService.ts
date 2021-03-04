import { getCustomRepository } from "typeorm";
import ModulosRepository from "../infra/typeorm/repositories/ModulosRepository";

interface Request {
    id: number;
}

class DeleteModuloService {
    public async execute( { id } : Request): Promise<boolean> {

        const modulosRepository = getCustomRepository(ModulosRepository);
        await modulosRepository.delete( id );
        return true;

    }
}

export default DeleteModuloService;