import { getCustomRepository } from "typeorm";
import RespostasRepository from "../infra/typeorm/repositories/RepostasRepository";

interface Request {
    id: string;
}

class DeleteRespostaService {
    public async execute( { id } : Request): Promise<boolean> {

        const respostasRepository = getCustomRepository(RespostasRepository);
        await respostasRepository.delete( id );
        return true;

    }
}

export default DeleteRespostaService;