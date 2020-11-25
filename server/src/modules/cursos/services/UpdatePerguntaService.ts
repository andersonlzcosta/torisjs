import { getCustomRepository } from "typeorm";
import Pergunta from "../infra/typeorm/entities/Pergunta";
import PerguntasRepository from "../infra/typeorm/repositories/PerguntasRepository";

interface Request {
    perguntaId: string;
    ordem?: number;
    enunciado?: string;
    alternativa1?: string;
    alternativa2?: string;
    alternativa3?: string;
    alternativa4?: string;
    resposta?: number;
    justificativa?: string;
    moduloId?: string;
}

class UpdatePerguntaService {
    public async execute({ perguntaId, ordem, enunciado, alternativa1, alternativa2, alternativa3, alternativa4, resposta, justificativa, moduloId }: Request): Promise<Pergunta | undefined> {

        const perguntasRepository = getCustomRepository(PerguntasRepository);
        return perguntasRepository.update( 
            perguntaId,
            { 
                ordem, 
                enunciado, 
                alternativa1, 
                alternativa2, 
                alternativa3, 
                alternativa4, 
                resposta, 
                justificativa, 
                moduloId 
            }
        );
    
    }
}

export default UpdatePerguntaService;