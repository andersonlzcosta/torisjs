import { getCustomRepository } from "typeorm";
import Pergunta from "../infra/typeorm/entities/Pergunta";
import PerguntasRepository from "../infra/typeorm/repositories/PerguntasRepository";

interface Request {
    titulo: string;
    corpo: string;
    foiResolvido: boolean;
}

class CreatePerguntaService {
    public async execute({ titulo, corpo, foiResolvido }: Request): Promise<Pergunta> {
        const perguntasRepository = getCustomRepository(PerguntasRepository);

        const pergunta = perguntasRepository.create({
            titulo,
            corpo,
            foiResolvido 
        });

        return pergunta;
    }
}

export default CreatePerguntaService;