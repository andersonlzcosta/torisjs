import INotificacoesRepository from '@modules/notificacoes/repositories/INotificacoesRepository'
import Notificacao from '../entities/Notificacao';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import ICreateNotificacaoDTO from '@modules/notificacoes/dtos/ICreateNotificacaoDTO';
import IUpdateNotificacaoDTO from '@modules/notificacoes/dtos/IUpdateNotificacaoDTO';

@EntityRepository(Notificacao)
class NotificacoesRepository implements INotificacoesRepository {
    private ormRepository: Repository<Notificacao>;

    constructor() {
        this.ormRepository = getRepository(Notificacao);
    }
  
    public async findById(id: string): Promise<Notificacao | undefined> {
    
        const notificacao = await this.ormRepository.findOne({ where: { id } });
        return notificacao;
    
    }
  
    public async findAll(): Promise<Notificacao[]> {
  
        let notificacoes: Notificacao[];
        notificacoes = await this.ormRepository.find();
        return notificacoes;
  
    }
  
    public async create({
        conteudo,
        arquivada,
        tipo,
        userId
    }: ICreateNotificacaoDTO): Promise<Notificacao | undefined> {
  
        const newNotificacao = this.ormRepository.create({ 
            conteudo,
            arquivada,
            tipo,
            users: [{ id: userId }]
        });
        await this.ormRepository.save(newNotificacao);
        const notificacao = await this.ormRepository.findOne({ where: { conteudo }, relations: ["users"] }); // need this line to return all fields from Abrigo, maybe eager loader would solve it
        return notificacao;
  
    }
  
    public async save(notificacao: Notificacao): Promise<Notificacao> {
  
      return this.ormRepository.save(notificacao);
  
    }
  
    public async update(notificacaoId: string, { 
      conteudo,
      arquivada,
      tipo,
      userId
    }: IUpdateNotificacaoDTO): Promise<Notificacao | undefined> {
  
      await this.ormRepository.update(
        notificacaoId, 
        { 
          id: notificacaoId, 
          conteudo,
          arquivada,
          tipo,
          users: [{ id: userId }]
        }
      );   
      const notificacao = await this.ormRepository.findOne({ where: { id: notificacaoId }, relations: ["users"] });
      return notificacao;
  
    }
  
    public async delete(id: string): Promise<boolean> {
  
      await this.ormRepository.delete( id );
      return true;
  
    }
  }
  
  export default NotificacoesRepository;