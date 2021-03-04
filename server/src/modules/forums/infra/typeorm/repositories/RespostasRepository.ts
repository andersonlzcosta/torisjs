import IRespostasRepository from '@modules/forums/repositories/IRespostasRepository';
import Resposta from '../entities/Resposta';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import ICreateRespostaDTO from '@modules/forums/dtos/ICreateRespostaDTO';
import IUpdateRespostaDTO from '@modules/forums/dtos/IUpdateRespostaDTO';

@EntityRepository(Resposta)
class RespostasRepository implements IRespostasRepository {
  private ormRepository: Repository<Resposta>;

  constructor() {
    this.ormRepository = getRepository(Resposta);
  }

  public async findById(id: number): Promise<Resposta | undefined> {

    const resposta = await this.ormRepository.findOne( id , { relations: ["pergunta"]});
    return resposta;

  }

  public async findAll(): Promise<Resposta[]> {

    let respostas: Resposta[];
    respostas = await this.ormRepository.find({ relations: ["pergunta"] });
    return respostas;

  }

  public async save(resposta: Resposta): Promise<Resposta> {
    
    return this.ormRepository.save(resposta);

  }

  public async create({ corpo, perguntaId }: ICreateRespostaDTO): Promise<Resposta | undefined> {

    const newResposta = this.ormRepository.create({ corpo, pergunta: { id: perguntaId } });
    await this.ormRepository.save(newResposta);
    const resposta = await this.ormRepository.findOne({ where: { id: newResposta.id }, relations: ["pergunta"] }); // need this line to return all fields from Abrigo, maybe eager loader would solve it
    return resposta;

  }

  public async update(respostaId: number, { corpo, perguntaId }: IUpdateRespostaDTO): Promise<Resposta | undefined> {

    await this.ormRepository.update( respostaId, { corpo, pergunta: { id: perguntaId } });   
    const resposta = await this.ormRepository.findOne({ where: { id: respostaId }, relations: ["pergunta"] });
    return resposta;

  }

  public async delete(id: number): Promise<boolean> {

    await this.ormRepository.delete( id );
    return true;

  }
}

export default RespostasRepository;