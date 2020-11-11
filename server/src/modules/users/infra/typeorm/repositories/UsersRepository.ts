import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '../entities/User';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

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
    const user = await this.ormRepository.findOne({ where: { email } });
    return user;
  }

  public async create({ nome, email, idade, profissao, password, abrigo_id }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({ nome, email, idade, profissao, password, abrigo_id });
    await this.ormRepository.save(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;