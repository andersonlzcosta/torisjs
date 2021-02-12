import { inject, injectable } from "tsyringe";
import Notificacao from "../infra/typeorm/entities/Notificacao";
import INotificacoesRepository from '@modules/notificacoes/repositories/INotificacoesRepository';

interface Request {
    notificacaoId: string;
    conteudo?: string;
    arquivada?: boolean;
    tipo?: string;
    userId?: string;
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


        const notificacao = await this.notificacoesRepository.update(
            notificacaoId, 
            {
              conteudo,
              arquivada,
              tipo,
              userId
            }
        );

        return notificacao;
    }
}

export default UpdateNotificacaoService;