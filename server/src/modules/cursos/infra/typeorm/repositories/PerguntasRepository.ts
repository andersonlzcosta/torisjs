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

  public async findById(id: string): Promise<Pergunta | undefined> {

    // const pergunta = await this.ormRepository.findOne( id , { relations: ["profissionais"]});
    const pergunta = await this.ormRepository.findOne( id );
    return pergunta;

  }

  public async findAll(): Promise<Pergunta[]> {

    let perguntas: Pergunta[];
    perguntas = await this.ormRepository.find();
    return perguntas;

  }

  public async create({ ordem, enunciado, alternativa1, alternativa2, alternativa3, alternativa4, resposta, justificativa }: ICreatePerguntaDTO): Promise<Pergunta> {

    const pergunta = this.ormRepository.create({ ordem, enunciado, alternativa1, alternativa2, alternativa3, alternativa4, resposta, justificativa });
    await this.ormRepository.save(pergunta);
    return pergunta;

  }

  public async update(perguntaId: string, { ordem, enunciado, alternativa1, alternativa2, alternativa3, alternativa4, resposta, justificativa }: IUpdatePerguntaDTO): Promise<Pergunta | undefined> {

    await this.ormRepository.update( perguntaId, { id: perguntaId, ordem, enunciado, alternativa1, alternativa2, alternativa3, alternativa4, resposta, justificativa });   
    // const pergunta = await this.ormRepository.findOne({ where: { id: perguntaId }, relations: ["users"] });
    const pergunta = await this.ormRepository.findOne({ where: { id: perguntaId } });
    return pergunta;

  }

  public async delete(id: string): Promise<boolean> {

    await this.ormRepository.delete( id );
    return true;

  }
}

export default PerguntasRepository;