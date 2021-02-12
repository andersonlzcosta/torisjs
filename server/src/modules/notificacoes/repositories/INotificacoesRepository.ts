import Notificacao from '@modules/notificacoes/infra/typeorm/entities/Notificacao';
import ICreateNotificacaoDTO from '../dtos/ICreateNotificacaoDTO';
import IUpdateNotificacaoDTO from '../dtos/IUpdateNotificacaoDTO';

export default interface INotificacoesRepository {

    findById(id: string): Promise<Notificacao | undefined>;
    findAll(): Promise<Notificacao[]>;
    create(data: ICreateNotificacaoDTO): Promise<Notificacao | undefined>;
    save(notificacao: Notificacao): Promise<Notificacao>;
    update(notificacaoId: string, data: IUpdateNotificacaoDTO): Promise<Notificacao | undefined>;
    delete(id: string): Promise<Boolean>;
    
}