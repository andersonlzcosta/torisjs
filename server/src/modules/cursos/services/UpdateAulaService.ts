import { inject, injectable } from "tsyringe";
import Aula from "../infra/typeorm/entities/Aula";
import IAulasRepository from "../repositories/IAulasRepository";

interface Request {
    aulaId: number;
    ordem?: number;
    nome?: string;
    descricao?: string;
    video_url?: string;
    duracao?: string;
    moduloId?: number;
}

@injectable()
class UpdateAulaService {
    constructor(
        @inject('ModulosAulasRepository')
        private aulasRepository: IAulasRepository,
    ) { }

    public async execute({ aulaId, ordem, nome, descricao, video_url, duracao, moduloId }: Request): Promise<Aula | undefined> {

        const aula = await this.aulasRepository.findById(aulaId);
        
        if (aula) {
            if (!ordem) ordem = aula.ordem;
            if (!nome) nome = aula.nome;
            if (!descricao) descricao = aula.descricao;
            if (!descricao) descricao = aula.descricao;
            if (!video_url) video_url = aula.video_url;
            if (!duracao) duracao = aula.duracao;
            if (!moduloId) moduloId = aula.modulo.id;
        }
        
        return this.aulasRepository.update( 
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