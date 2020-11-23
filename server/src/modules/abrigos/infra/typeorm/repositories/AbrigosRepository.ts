import IAbrigosRepository from '@modules/abrigos/repositories/IAbrigosRepository';
import Abrigo from '../entities/Abrigo';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import ICreateAbrigoDTO from '@modules/abrigos/dtos/ICreateAbrigoDTO';
import IUpdateAbrigoDTO from '@modules/abrigos/dtos/IUpdateAbrigoDTO';

@EntityRepository(Abrigo)
class AbrigosRepository implements IAbrigosRepository {
  private ormRepository: Repository<Abrigo>;

  constructor() {
    this.ormRepository = getRepository(Abrigo);
  }

  public async findById(id: string): Promise<Abrigo | undefined> {

    const abrigo = await this.ormRepository.findOne( id , { relations: ["profissionais"]});
    return abrigo;

  }

  public async findAll(): Promise<Abrigo[]> {

    let abrigos: Abrigo[];
    abrigos = await this.ormRepository.find();
    return abrigos;

  }

  public async create({ nome, endereco, classificacao, capacidade, faixaEtaria }: ICreateAbrigoDTO): Promise<Abrigo> {

    const abrigo = this.ormRepository.create({ nome, endereco, classificacao, capacidade, faixaEtaria });
    await this.ormRepository.save(abrigo);
    return abrigo;

  }

  public async save(abrigo: Abrigo): Promise<Abrigo> {

    return this.ormRepository.save(abrigo);

  }

  public async update(abrigoId: string, { nome, endereco, classificacao, capacidade, faixaEtaria }: IUpdateAbrigoDTO): Promise<Abrigo | undefined> {

    await this.ormRepository.update( abrigoId, { id: abrigoId, nome, endereco, classificacao, capacidade, faixaEtaria });   
    const abrigo = await this.ormRepository.findOne({ where: { id: abrigoId }, relations: ["users"] });
    return abrigo;

  }
}

export default AbrigosRepository;