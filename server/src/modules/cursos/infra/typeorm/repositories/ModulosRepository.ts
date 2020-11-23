import IModulosRepository from '@modules/cursos/repositories/IModulosRepository';
import Modulo from '../entities/Modulo';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import ICreateModuloDTO from '@modules/cursos/dtos/ICreateModuloDTO';
import IUpdateModuloDTO from '@modules/cursos/dtos/IUpdateModuloDTO';

@EntityRepository(Modulo)
class ModulosRepository implements IModulosRepository {
  private ormRepository: Repository<Modulo>;

  constructor() {
    this.ormRepository = getRepository(Modulo);
  }

  public async findById(id: string): Promise<Modulo | undefined> {

    const modulo = await this.ormRepository.findOne( id , { relations: ["curso"]});
    return modulo;

  }

  public async findAll(): Promise<Modulo[]> {

    let modulos: Modulo[];
    modulos = await this.ormRepository.find();
    return modulos;

  }

  public async create({ nome }: ICreateModuloDTO): Promise<Modulo> {

    const modulo = this.ormRepository.create({ nome });
    await this.ormRepository.save(modulo);
    return modulo;

  }

  public async update(moduloId: string, { nome }: IUpdateModuloDTO): Promise<Modulo | undefined> {

    await this.ormRepository.update( moduloId, { id: moduloId, nome });   
    const modulo = await this.ormRepository.findOne({ where: { id: moduloId }, relations: ["curso"] });
    return modulo;

  }

  public async delete(id: string): Promise<boolean> {

    await this.ormRepository.delete( id );
    return true;

  }
}

export default ModulosRepository;