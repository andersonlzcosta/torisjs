import IPerguntasRepository from '@modules/cursos/repositories/IPerguntasRepository';
import Pergunta from '../entities/Pergunta';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import ICreatePerguntaDTO from '@modules/cursos/dtos/ICreatePerguntaDTO';
import IUpdatePerguntaDTO from '@modules/cursos/dtos/IUpdatePerguntaDTO';

@EntityRepository(Pergunta)
class PerguntasRepository implements IPerguntasRepository {
  private ormRepository: Repository<Pergunta>;

  constructor() {
    this.ormRepository = getRepository(Pergunta);
  }

  public async findById(id: number): Promise<Pergunta | undefined> {

    const pergunta = await this.ormRepository.findOne( id , { relations: ["modulo"]});
    return pergunta;

  }

  public async findAll(): Promise<Pergunta[]> {

    let perguntas: Pergunta[];
    perguntas = await this.ormRepository.find({ relations: ["modulo"]});
    return perguntas;

  }

  public async save(pergunta: Pergunta): Promise<Pergunta> {
    
    return this.ormRepository.save(pergunta);

  }

  public async create({ ordem, enunciado, alternativa1, alternativa2, alternativa3, alternativa4, resposta, justificativa, moduloId }: ICreatePerguntaDTO): Promise<Pergunta | undefined> {

    const newPergunta = this.ormRepository.create({ ordem, enunciado, alternativa1, alternativa2, alternativa3, alternativa4, resposta, justificativa, modulo: { id: moduloId } });
    await this.ormRepository.save(newPergunta);
    const pergunta = this.ormRepository.findOne({ where: { id: newPergunta.id }, relations: ["modulo"] });
    return pergunta;

  }

  public async update(perguntaId: number, { ordem, enunciado, alternativa1, alternativa2, alternativa3, alternativa4, resposta, justificativa, moduloId  }: IUpdatePerguntaDTO): Promise<Pergunta | undefined> {

    await this.ormRepository.update( perguntaId, { id: perguntaId, ordem, enunciado, alternativa1, alternativa2, alternativa3, alternativa4, resposta, justificativa, modulo: { id: moduloId } });   
    const pergunta = await this.ormRepository.findOne({ where: { id: perguntaId }, relations: ["modulo"] });
    return pergunta;

  }

  public async delete(id: number): Promise<boolean> {

    await this.ormRepository.delete( id );
    return true;

  }
}

export default PerguntasRepository;