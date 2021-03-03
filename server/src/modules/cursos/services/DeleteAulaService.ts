import { getCustomRepository } from "typeorm";
import AulasRepository from "../infra/typeorm/repositories/AulasRepository";

interface Request {
    id: number;
}

class DeleteAulaService {
    public async execute( { id } : Request): Promise<boolean> {

        const aulasRepository = getCustomRepository(AulasRepository);
        await aulasRepository.delete( id );
        return true;

    }
}

export default DeleteAulaService;