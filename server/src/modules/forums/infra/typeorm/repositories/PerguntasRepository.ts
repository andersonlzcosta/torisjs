import IPerguntasRepository from '@modules/forums/repositories/IPerguntasRepository';
import Pergunta from '../entities/Pergunta';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import ICreatePerguntaDTO from '@modules/forums/dtos/ICreatePerguntaDTO';
import IUpdatePerguntaDTO from '@modules/forums/dtos/IUpdatePerguntaDTO';

@EntityRepository(Pergunta)
class PerguntasRepository implements IPerguntasRepository {
  private ormRepository: Repository<Pergunta>;

  constructor() {
    this.ormRepository = getRepository(Pergunta);
  }

  public async findById(id: number): Promise<Pergunta | undefined> {

    const pergunta = await this.ormRepository.findOne( id , { relations: ["respostas"]});
    return pergunta;

  }

  public async findAll(): Promise<Pergunta[]> {

    let perguntas: Pergunta[];
    // perguntas = await this.ormRepository.find({ relations: ["respostas", "categorias"] });
    perguntas = await this.ormRepository.find({ relations: ["respostas"] });
    return perguntas;

  }

  public async save(pergunta: Pergunta): Promise<Pergunta> {
    
    return this.ormRepository.save(pergunta);

  }

 public async create({ titulo, corpo, foiResolvido }: ICreatePerguntaDTO): Promise<Pergunta> {

    const pergunta = this.ormRepository.create({ titulo, corpo, foiResolvido });
    await this.ormRepository.save(pergunta);
    return pergunta;

  }

  public async update(perguntaId: number, { titulo, corpo, foiResolvido }: IUpdatePerguntaDTO): Promise<Pergunta | undefined> {

    await this.ormRepository.update( perguntaId, { id: perguntaId, titulo, corpo, foiResolvido });   
    const pergunta = await this.ormRepository.findOne({ where: { id: perguntaId }, relations: ["respostas"] });
    return pergunta;

  }

  public async delete(id: number): Promise<boolean> {

    await this.ormRepository.delete( id );
    return true;

  }
}

export default PerguntasRepository;