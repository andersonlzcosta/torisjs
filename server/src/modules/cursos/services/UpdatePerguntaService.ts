import { inject, injectable } from "tsyringe";
import Pergunta from "../infra/typeorm/entities/Pergunta";
import IPerguntasRepository from "../repositories/IPerguntasRepository";

interface Request {
    perguntaId: number;
    ordem?: number;
    enunciado?: string;
    alternativa1?: string;
    alternativa2?: string;
    alternativa3?: string;
    alternativa4?: string;
    resposta?: number;
    justificativa?: string;
    moduloId?: number;
}

@injectable()
class UpdatePerguntaService {
    constructor(
        @inject('ModulosPerguntasRepository')
        private perguntasRepository: IPerguntasRepository,
    ) { }

    public async execute({ perguntaId, ordem, enunciado, alternativa1, alternativa2, alternativa3, alternativa4, resposta, justificativa, moduloId }: Request): Promise<Pergunta | undefined> {

        const pergunta = await this.perguntasRepository.findById(perguntaId);
        
        if (pergunta) {
            if (!ordem) ordem = pergunta.ordem;
            if (!enunciado) enunciado = pergunta.enunciado;
            if (!alternativa1) alternativa1 = pergunta.alternativa1;
            if (!alternativa2) alternativa2 = pergunta.alternativa2;
            if (!alternativa3) alternativa3 = pergunta.alternativa3;
            if (!alternativa4) alternativa4 = pergunta.alternativa4;
            if (!resposta) resposta = pergunta.resposta;
            if (!justificativa) justificativa = pergunta.justificativa;
            if (!moduloId) moduloId = pergunta.modulo.id;
        }
 
        return this.perguntasRepository.update( 
            perguntaId,
            { 
                ordem, 
                enunciado, 
                alternativa1, 
                alternativa2, 
                alternativa3, 
                alternativa4, 
                resposta, 
                justificativa, 
                moduloId 
            }
        );
    
    }
}

export default UpdatePerguntaService;