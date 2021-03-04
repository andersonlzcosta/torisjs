import { inject, injectable } from "tsyringe";
import Pergunta from "../infra/typeorm/entities/Pergunta";
import IPerguntasRepository from "../repositories/IPerguntasRepository";

interface Request {
    perguntaId: number;
    titulo?: string;
    corpo?: string;
    foiResolvido?: boolean;
}

@injectable()
class UpdatePerguntaService {
    constructor(
        @inject('ForumsPerguntasRepository')
        private perguntasRepository: IPerguntasRepository
    ) { }

    public async execute({ perguntaId, titulo, corpo, foiResolvido }: Request): Promise<Pergunta | undefined> {

        const pergunta = await this.perguntasRepository.findById(perguntaId);
        
        if (pergunta) {
            if (!titulo) titulo = pergunta.titulo;
            if (!corpo) corpo = pergunta.corpo;
            if (!foiResolvido) foiResolvido = pergunta.foiResolvido;
        }
        
        return this.perguntasRepository.update( 
            perguntaId, { 
                titulo,
                corpo,
                foiResolvido 
            }
        );
    
    }
}

export default UpdatePerguntaService;