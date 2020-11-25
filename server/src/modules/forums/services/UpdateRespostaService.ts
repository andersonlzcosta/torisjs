import { getCustomRepository } from "typeorm";
import Resposta from "../infra/typeorm/entities/Resposta";
import RespostasRepository from "../infra/typeorm/repositories/RepostasRepository";

interface Request {
    respostaId: string;
    corpo?: string;
    perguntaId?: string;
}

class UpdateRespostaService {
    public async execute({ respostaId, corpo, perguntaId }: Request): Promise<Resposta | undefined> {

        const respostasRepository = getCustomRepository(RespostasRepository);
        return respostasRepository.update( 
            respostaId,
            {
                corpo,
                perguntaId
            }
        );
    
    }
}

export default UpdateRespostaService;