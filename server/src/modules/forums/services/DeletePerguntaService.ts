import { getCustomRepository } from "typeorm";
import PerguntasRepository from "../infra/typeorm/repositories/PerguntasRepository";

interface Request {
    id: string;
}

class DeletePerguntaService {
    public async execute( { id } : Request): Promise<boolean> {

        const perguntasRepository = getCustomRepository(PerguntasRepository);
        await perguntasRepository.delete( id );
        return true;

    }
}

export default DeletePerguntaService;