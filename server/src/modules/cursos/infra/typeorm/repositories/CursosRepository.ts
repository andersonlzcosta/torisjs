import ICursosRepository from '@modules/cursos/repositories/ICursosRepository';
import Curso from '../entities/Curso';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import ICreateCursoDTO from '@modules/cursos/dtos/ICreateCursoDTO';
import IUpdateCursoDTO from '@modules/cursos/dtos/IUpdateCursoDTO';

@EntityRepository(Curso)
class CursosRepository implements ICursosRepository {
  private ormRepository: Repository<Curso>;

  constructor() {
    this.ormRepository = getRepository(Curso);
  }

  public async findById(id: string): Promise<Curso | undefined> {

    const curso = await this.ormRepository.findOne( id , { relations: ["modulos"]});
    return curso;

  }

  public async findAll(): Promise<Curso[]> {

    let cursos: Curso[];
    cursos = await this.ormRepository.find({ relations: ["modulos"] });
    return cursos;

  }

  public async create({ nome, descricao }: ICreateCursoDTO): Promise<Curso> {

    const curso = this.ormRepository.create({ nome, descricao });
    await this.ormRepository.save(curso);
    return curso;

  }

  public async update(cursoId: string, { nome, descricao }: IUpdateCursoDTO): Promise<Curso | undefined> {

    await this.ormRepository.update( cursoId, { id: cursoId, nome, descricao });   
    const curso = await this.ormRepository.findOne({ where: { id: cursoId }, relations: ["modulos"] });
    return curso;

  }

  public async delete(id: string): Promise<boolean> {

    await this.ormRepository.delete( id );
    return true;

  }
}

export default CursosRepository;