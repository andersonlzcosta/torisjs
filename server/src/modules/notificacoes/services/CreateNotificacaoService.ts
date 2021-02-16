import { inject, injectable } from "tsyringe";
import Notificacao from "../infra/typeorm/entities/Notificacao";
import INotificacoesRepository from '@modules/notificacoes/repositories/INotificacoesRepository';

interface Request {
    conteudo?: string;
    arquivada?: boolean;
    tipo?: string;
    userId?: string;
}

@injectable()
class CreateNotificacaoService {
    constructor(
        @inject('NotificacoesRepository')
        private notificacoesRepository: INotificacoesRepository
    ) { }

    public async execute({ 
        conteudo,
        arquivada,
        tipo,
        userId
    }: Request): Promise<Notificacao | undefined> {


        const notificacao = await this.notificacoesRepository.create({
            conteudo,
            arquivada,
            tipo,
            userId
        });

        return notificacao;
    }
}

export default CreateNotificacaoService;