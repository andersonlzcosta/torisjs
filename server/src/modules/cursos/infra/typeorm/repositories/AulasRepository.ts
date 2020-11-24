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

    // const aula = await this.ormRepository.findOne( id , { relations: ["profissionais"]});
    const aula = await this.ormRepository.findOne( id );
    return aula;

  }

  public async findAll(): Promise<Aula[]> {

    let aulas: Aula[];
    aulas = await this.ormRepository.find();
    return aulas;

  }

  public async create({ ordem, nome, video_url, duracao }: ICreateAulaDTO): Promise<Aula> {

    const aula = this.ormRepository.create({ ordem, nome, video_url, duracao });
    await this.ormRepository.save(aula);
    return aula;

  }

  public async update(aulaId: string, { ordem, nome, video_url, duracao }: IUpdateAulaDTO): Promise<Aula | undefined> {

    await this.ormRepository.update( aulaId, { id: aulaId, ordem, nome, video_url, duracao });   
    // const aula = await this.ormRepository.findOne({ where: { id: aulaId }, relations: ["users"] });
    const aula = await this.ormRepository.findOne({ where: { id: aulaId } });
    return aula;

  }

  public async delete(id: string): Promise<boolean> {

    await this.ormRepository.delete( id );
    return true;

  }
}

export default AulasRepository;