import ICategoriasRepository from '@modules/forums/repositories/ICategoriasRepository';
import Categoria from '../entities/Categoria';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import ICreateCategoriaDTO from '@modules/forums/dtos/ICreateCategoriaDTO';
import IUpdateCategoriaDTO from '@modules/forums/dtos/IUpdateCategoriaDTO';

@EntityRepository(Categoria)
class CategoriasRepository implements ICategoriasRepository {
  private ormRepository: Repository<Categoria>;

  constructor() {
    this.ormRepository = getRepository(Categoria);
  }

  public async findById(id: number): Promise<Categoria | undefined> {

    const categoria = await this.ormRepository.findOne( id , { relations: ["perguntas"] });
    return categoria;

  }

  public async findAll(): Promise<Categoria[]> {

    let categorias: Categoria[];
    categorias = await this.ormRepository.find({ relations: ["perguntas"] });
    return categorias;

  }

  public async save(categoria: Categoria): Promise<Categoria> {
    
    return this.ormRepository.save(categoria);

  }

 public async create({ nome }: ICreateCategoriaDTO): Promise<Categoria> {

    const categoria = this.ormRepository.create({ nome });
    await this.ormRepository.save(categoria);
    return categoria;

  }

  public async update(categoriaId: number, { nome }: IUpdateCategoriaDTO): Promise<Categoria | undefined> {

    await this.ormRepository.update( categoriaId, { id: categoriaId, nome });   
    const categoria = await this.ormRepository.findOne({ where: { id: categoriaId }, relations: ["perguntas"] });
    return categoria;

  }

  public async delete(id: number): Promise<boolean> {

    await this.ormRepository.delete( id );
    return true;

  }
}

export default CategoriasRepository;