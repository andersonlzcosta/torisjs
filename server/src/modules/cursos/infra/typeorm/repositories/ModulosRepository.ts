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
    modulos = await this.ormRepository.find({ relations: ["curso", "aulas", "perguntas"] });
    return modulos;

  }

  public async save(modulo: Modulo): Promise<Modulo> {
    
    return this.ormRepository.save(modulo);

  }

  public async create({ nome, cursoId }: ICreateModuloDTO): Promise<Modulo | undefined> {

    const newModulo = this.ormRepository.create({ nome, curso: { id: cursoId } });
    await this.ormRepository.save(newModulo);
    const modulo = await this.ormRepository.findOne({ where: { id: newModulo.id }, relations: ["curso"] }); // need this line to return all fields from Abrigo, maybe eager loader would solve it
    return modulo;

  }

  public async update(moduloId: string, { nome, cursoId }: IUpdateModuloDTO): Promise<Modulo | undefined> {

    await this.ormRepository.update( moduloId, { id: moduloId, nome, curso: { id: cursoId } });   
    const modulo = await this.ormRepository.findOne({ where: { id: moduloId }, relations: ["curso"] });
    return modulo;

  }

  public async delete(id: string): Promise<boolean> {

    await this.ormRepository.delete( id );
    return true;

  }
}

export default ModulosRepository;