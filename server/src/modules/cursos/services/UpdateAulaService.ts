import { getCustomRepository } from "typeorm";
import Aula from "../infra/typeorm/entities/Aula";
import AulasRepository from "../infra/typeorm/repositories/AulasRepository";

interface Request {
    aulaId: string;
    ordem?: number;
    nome?: string;
    descricao?: string;
    video_url?: string;
    duracao?: string;
    moduloId?: string;
}

class UpdateAulaService {
    public async execute({ aulaId, ordem, nome, descricao, video_url, duracao, moduloId }: Request): Promise<Aula | undefined> {

        const aulasRepository = getCustomRepository(AulasRepository);
        return aulasRepository.update( 
            aulaId, 
            { 
                ordem,
                nome,
                descricao,
                video_url,
                duracao,
                moduloId
            }
        );
    
    }
}

export default UpdateAulaService;