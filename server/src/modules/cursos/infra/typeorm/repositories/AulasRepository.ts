import IAulasRepository from '@modules/cursos/repositories/IAulasRepository';
import Aula from '../entities/Aula';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import ICreateAulaDTO from '@modules/cursos/dtos/ICreateAulaDTO';
import IUpdateAulaDTO from '@modules/cursos/dtos/IUpdateAulaDTO';

@EntityRepository(Aula)
class AulasRepository implements IAulasRepository {
  private ormRepository: Repository<Aula>;

  constructor() {
    this.ormRepository = getRepository(Aula);
  }

  public async findById(id: string): Promise<Aula | undefined> {

    const aula = await this.ormRepository.findOne( id , { relations: ["modulo"]});
    return aula;

  }

  public async findAll(): Promise<Aula[]> {

    let aulas: Aula[];
    aulas = await this.ormRepository.find({ relations: ["modulo"]});
    return aulas;

  }

  public async save(aula: Aula): Promise<Aula> {
    
    return this.ormRepository.save(aula);

  }

  public async create({ ordem, nome, video_url, duracao, moduloId }: ICreateAulaDTO): Promise<Aula | undefined> {

    const newAula = this.ormRepository.create({ ordem, nome, video_url, duracao, modulo: { id: moduloId } });
    await this.ormRepository.save(newAula);
    const aula = this.ormRepository.findOne({ where: { id: newAula.id }, relations: ["modulo"] });
    return aula;
  }

  public async update(aulaId: string, { ordem, nome, video_url, duracao, moduloId }: IUpdateAulaDTO): Promise<Aula | undefined> {

    await this.ormRepository.update( aulaId, { id: aulaId, ordem, nome, video_url, duracao, modulo: { id: moduloId } });   
    const aula = await this.ormRepository.findOne({ where: { id: aulaId }, relations: ["modulo"] });
    return aula;

  }

  public async delete(id: string): Promise<boolean> {

    await this.ormRepository.delete( id );
    return true;

  }
}

export default AulasRepository;