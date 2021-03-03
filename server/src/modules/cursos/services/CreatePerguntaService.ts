import { getCustomRepository } from "typeorm";
import Pergunta from "../infra/typeorm/entities/Pergunta";
import PerguntasRepository from "../infra/typeorm/repositories/PerguntasRepository";

interface Request {
    ordem: number;
    enunciado: string;
    alternativa1: string;
    alternativa2: string;
    alternativa3: string;
    alternativa4: string;
    resposta: number;
    justificativa: string;
    moduloId: number;
}

class CreatePerguntaService {
    public async execute({ ordem, enunciado, alternativa1, alternativa2, alternativa3, alternativa4, resposta, justificativa, moduloId }: Request): Promise<Pergunta | undefined> {
        const perguntasRepository = getCustomRepository(PerguntasRepository);

        const pergunta = perguntasRepository.create({
            ordem, 
            enunciado, 
            alternativa1,
            alternativa2,
            alternativa3,
            alternativa4,
            resposta,
            justificativa,
            moduloId
        });

        return pergunta;
    }
}

export default CreatePerguntaService;