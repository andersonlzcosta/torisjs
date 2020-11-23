import { getCustomRepository } from "typeorm";
import Aula from "../infra/typeorm/entities/Aula";
import AulasRepository from "../infra/typeorm/repositories/AulasRepository";

interface Request {
    aulaId: string;
    ordem?: number;
    nome?: string;
    video_url?: string;
    duracao?: string;
    status?: string;
}

class UpdateAulaService {
    public async execute({ aulaId, ordem, nome, video_url, duracao, status }: Request): Promise<Aula | undefined> {

        const aulasRepository = getCustomRepository(AulasRepository);
        return aulasRepository.update( aulaId, { ordem, nome, video_url, duracao, status });
    
    }
}

export default UpdateAulaService;