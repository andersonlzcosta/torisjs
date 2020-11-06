import IAbrigosRepository from '@modules/abrigos/repositories/IAbrigosRepository';
import Abrigo from '../entities/Abrigo';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import ICreateAbrigoDTO from '@modules/abrigos/dtos/ICreateAbrigoDTO';

@EntityRepository(Abrigo)
class AbrigosRepository implements IAbrigosRepository {
  private ormRepository: Repository<Abrigo>;

  constructor() {
    this.ormRepository = getRepository(Abrigo);
  }

  public async findById(id: string): Promise<Abrigo | undefined> {
    const abrigo = await this.ormRepository.findOne({ where: { id } });
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
}

export default AbrigosRepository;