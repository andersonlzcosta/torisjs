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

  public async findByName(nome: string): Promise<Abrigo[]> {

    const abrigos = await this.ormRepository.find({  where: `"nome" ILIKE '%${nome}%'` });
    return abrigos;

  }

  public async create({ nome, telefone1, telefone2, email1, email2, endereco, bairro, cidade, estado, classificacao, capacidade, faixaEtaria, lgbt, genero, pcd, observacao }: ICreateAbrigoDTO): Promise<Abrigo> {

    const abrigo = this.ormRepository.create({ nome, telefone1, telefone2, email1, email2, endereco, bairro, cidade, estado, classificacao, capacidade, faixaEtaria, lgbt, genero, pcd, observacao });
    await this.ormRepository.save(abrigo);
    return abrigo;

  }

  public async save(abrigo: Abrigo): Promise<Abrigo> {

    return this.ormRepository.save(abrigo);

  }

  public async update(abrigoId: string, { nome, telefone1, telefone2, email1, email2, endereco, bairro, cidade, estado, classificacao, capacidade, faixaEtaria, lgbt, genero, pcd, observacao }: IUpdateAbrigoDTO): Promise<Abrigo | undefined> {

    await this.ormRepository.update( abrigoId, { id: abrigoId, nome, telefone1, telefone2, email1, email2, endereco, bairro, cidade, estado, classificacao, capacidade, faixaEtaria, lgbt, genero, pcd, observacao });   
    const abrigo = await this.ormRepository.findOne({ where: { id: abrigoId }, relations: ["profissionais"] });
    return abrigo;

  }

  public async delete(id: string): Promise<boolean> {

    await this.ormRepository.delete( id );
    return true;

  }
}

export default AbrigosRepository;