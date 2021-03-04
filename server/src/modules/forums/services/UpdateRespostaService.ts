import { inject, injectable } from "tsyringe";
import Resposta from "../infra/typeorm/entities/Resposta";
import IRespostasRepository from "../repositories/IRespostasRepository";

interface Request {
    respostaId: number;
    corpo?: string;
    perguntaId?: number;
}

@injectable()
class UpdateRespostaService {
    constructor(
        @inject('ForumsRespostasRepository')
        private respostasRepository: IRespostasRepository
    ) { }

    public async execute({ respostaId, corpo, perguntaId }: Request): Promise<Resposta | undefined> {

        const resposta = await this.respostasRepository.findById(respostaId);
        
        if (resposta) {
            if (!corpo) corpo = resposta.corpo;
            if (!perguntaId && resposta.pergunta) perguntaId = resposta.pergunta.id;
        }
        
        return this.respostasRepository.update( 
            respostaId,
            {
                corpo,
                perguntaId
            }
        );
    
    }
}

export default UpdateRespostaService;