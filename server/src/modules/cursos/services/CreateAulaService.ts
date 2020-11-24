import { getCustomRepository } from "typeorm";
import Aula from "../infra/typeorm/entities/Aula";
import AulasRepository from "../infra/typeorm/repositories/AulasRepository";

interface Request {
    ordem: number;
    nome: string;
    video_url: string;
    duracao: string;
}

class CreateAulaService {
    public async execute({ ordem, nome, video_url, duracao }: Request): Promise<Aula> {
        const aulasRepository = getCustomRepository(AulasRepository);

        const aula = aulasRepository.create({
            ordem,
            nome,
            video_url,
            duracao
        });

        return aula;
    }
}

export default CreateAulaService;