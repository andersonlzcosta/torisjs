import { getCustomRepository } from "typeorm";
import Aula from "../infra/typeorm/entities/Aula";
import AulasRepository from "../infra/typeorm/repositories/AulasRepository";

interface Request {
    ordem: number;
    nome: string;
    descricao: string;
    video_url: string;
    duracao: string;
    moduloId: number;
}

class CreateAulaService {
    public async execute({ ordem, nome, descricao, video_url, duracao, moduloId }: Request): Promise<Aula | undefined> {
        const aulasRepository = getCustomRepository(AulasRepository);

        const aula = aulasRepository.create({
            ordem,
            nome,
            descricao,
            video_url,
            duracao,
            moduloId
        });

        return aula;
    }
}

export default CreateAulaService;