import Notificacao from '@modules/notificacoes/infra/typeorm/entities/Notificacao';
import ICreateNotificacaoDTO from '../dtos/ICreateNotificacaoDTO';
import IUpdateNotificacaoDTO from '../dtos/IUpdateNotificacaoDTO';

export default interface INotificacoesRepository {

    findById(id: number): Promise<Notificacao | undefined>;
    findAll(): Promise<Notificacao[]>;
    create(data: ICreateNotificacaoDTO): Promise<Notificacao | undefined>;
    save(notificacao: Notificacao): Promise<Notificacao>;
    update(notificacaoId: number, data: IUpdateNotificacaoDTO): Promise<Notificacao | undefined>;
    delete(id: number): Promise<Boolean>;
    
}