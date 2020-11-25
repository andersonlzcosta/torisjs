import { getCustomRepository } from "typeorm";
import Pergunta from "../infra/typeorm/entities/Pergunta";
import PerguntasRepository from "../infra/typeorm/repositories/PerguntasRepository";

interface Request {
    perguntaId: string;
    titulo?: string;
    corpo?: string;
    foiResolvido?: boolean;
}

class UpdatePerguntaService {
    public async execute({ perguntaId, titulo, corpo, foiResolvido }: Request): Promise<Pergunta | undefined> {

        const perguntasRepository = getCustomRepository(PerguntasRepository);
        return perguntasRepository.update( 
            perguntaId, { 
                titulo,
                corpo,
                foiResolvido 
            }
        );
    
    }
}

export default UpdatePerguntaService;