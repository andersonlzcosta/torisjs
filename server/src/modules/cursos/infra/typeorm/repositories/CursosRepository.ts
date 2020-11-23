import ICursosRepository from '@modules/cursos/repositories/ICursosRepository';
import Curso from '../entities/Curso';
import { EntityRepository, getRepository, Repository } from 'typeorm';
// import ICreateCursoDTO from '@modules/cursos/dtos/ICreateCursoDTO';
// import IUpdateCursoDTO from '@modules/cursos/dtos/IUpdateCursoDTO';

@EntityRepository(Curso)
class CursosRepository implements ICursosRepository {
  private ormRepository: Repository<Curso>;

  constructor() {
    this.ormRepository = getRepository(Curso);
  }

  public async findById(id: string): Promise<Curso | undefined> {

    const abrigo = await this.ormRepository.findOne( id , { relations: ["profissionais"]});
    return abrigo;

  }

  public async findAll(): Promise<Curso[]> {

    let abrigos: Curso[];
    abrigos = await this.ormRepository.find();
    return abrigos;

  }

  // public async create({ nome, endereco, classificacao, capacidade, faixaEtaria }: ICreateCursoDTO): Promise<Curso> {

  //   const abrigo = this.ormRepository.create({ nome, endereco, classificacao, capacidade, faixaEtaria });
  //   await this.ormRepository.save(abrigo);
  //   return abrigo;

  // }

  // public async save(abrigo: Curso): Promise<Curso> {

  //   return this.ormRepository.save(abrigo);

  // }

  // public async update(abrigoId: string, { nome, endereco, classificacao, capacidade, faixaEtaria }: IUpdateCursoDTO): Promise<Curso | undefined> {

  //   await this.ormRepository.update( abrigoId, { id: abrigoId, nome, endereco, classificacao, capacidade, faixaEtaria });   
  //   const abrigo = await this.ormRepository.findOne({ where: { id: abrigoId }, relations: ["users"] });
  //   return abrigo;

  // }
}

export default CursosRepository;