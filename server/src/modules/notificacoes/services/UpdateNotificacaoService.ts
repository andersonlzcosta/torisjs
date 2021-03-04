import { inject, injectable } from "tsyringe";
import Notificacao from "../infra/typeorm/entities/Notificacao";
import INotificacoesRepository from '@modules/notificacoes/repositories/INotificacoesRepository';

interface Request {
    notificacaoId: number;
    conteudo?: string;
    arquivada?: boolean;
    tipo?: string;
    userId?: number;
}

@injectable()
class UpdateNotificacaoService {
        constructor(
            @inject('NotificacoesRepository')
            private notificacoesRepository: INotificacoesRepository
        ) { }
    
        public async execute({
            notificacaoId,
            conteudo,
            arquivada,
            tipo,
            userId
        }: Request): Promise<Notificacao | undefined> {


        const notificacao = await this.notificacoesRepository.findById(notificacaoId);
        
        if (notificacao) {
            if (!conteudo) conteudo = notificacao.conteudo;
            if (!arquivada) arquivada = notificacao.arquivada;
            if (!tipo) tipo = notificacao.tipo;
            if (!userId && notificacao.user) userId = notificacao.user.id;
        }

        return await this.notificacoesRepository.update(
            notificacaoId, 
            {
              conteudo,
              arquivada,
              tipo,
              userId
            }
        );

    }
}

export default UpdateNotificacaoService;