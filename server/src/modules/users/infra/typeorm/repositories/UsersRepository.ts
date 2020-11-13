import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '../entities/User';
import { EntityRepository, getCustomRepository, getRepository, Repository } from 'typeorm';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import AbrigosRepository from '@modules/abrigos/infra/typeorm/repositories/AbrigosRepository';

@EntityRepository(User)
class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { id } });
    return user;
  }

  public async findAll(): Promise<User[]> {
    let users: User[];

    users = await this.ormRepository.find();

    return users;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email: email }, relations: ["abrigo"]});
    return user;
  }

  // considerar o abrigo objeto
  public async create({ nome, email, idade, profissao, password, abrigoId }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({ nome, email, idade, profissao, password, abrigo: { id: abrigoId } });

    // need these lines to return all fields from Abrigo, maybe is the lazy eager loaders to solve it
    // const abrigo = await getCustomRepository(AbrigosRepository).findById(abrigoId);
    // user.abrigo = abrigo;

    await this.ormRepository.save(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;