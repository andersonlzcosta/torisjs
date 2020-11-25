import { getCustomRepository } from "typeorm";
import Resposta from "../infra/typeorm/entities/Resposta";
import RespostasRepository from "../infra/typeorm/repositories/RepostasRepository";

interface Request {
    corpo: string;
    perguntaId: string;
}

class CreateRespostaService {
    public async execute({ corpo, perguntaId }: Request): Promise<Resposta | undefined> {
        const respostasRepository = getCustomRepository(RespostasRepository);

        const resposta = respostasRepository.create({
            corpo,
            perguntaId
        });

        return resposta;
    }
}

export default CreateRespostaService;