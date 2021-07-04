import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '../entities/User';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';
// import AbrigosRepository from '@modules/abrigos/infra/typeorm/repositories/AbrigosRepository';

@EntityRepository(User)
class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: number): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { id }, relations: ["abrigo", "notificacoes"] });
    return user;
  }
  
  public async findAll(): Promise<User[]> {
    let users: User[];
    users = await this.ormRepository.find({ relations: ["abrigo", "notificacoes"] });
    return users;

  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email: email }, relations: ["abrigo", "notificacoes"]});
    return user;
  }


  public async findByName(nome: string): Promise<User[]> {
    const users = await this.ormRepository.find({  where: `"nome" ILIKE '%${nome}%'` });
    return users;

  }

  public async save(user: User): Promise<User> {

    return this.ormRepository.save(user);

  }

  public async create({ nome,
                        credencial,
                        email,
                        emailAlternativo,
                        nascimento,
                        cargo,
                        telefone1,
                        telefone2,
                        profissao,
                        password,
                        abrigoId }: ICreateUserDTO): Promise<User | undefined> {
    const newUser = this.ormRepository.create({ nome,
                                                credencial,
                                                email,
                                                emailAlternativo,
                                                nascimento,
                                                cargo,
                                                telefone1,
                                                telefone2,
                                                profissao,
                                                password,
                                                abrigo: { id: abrigoId } });
    await this.ormRepository.save(newUser);
    const user = await this.ormRepository.findOne({ where: { id : newUser.id }, relations: ["abrigo", "notificacoes"] });
    return user;

  }

  public async update(userId: number, { nome, credencial, email, emailAlternativo, nascimento, cargo, telefone1, telefone2, profissao, password, abrigoId, recoveryCode }: IUpdateUserDTO): Promise<User | undefined> {

    await this.ormRepository.update(userId, { id: userId, nome, credencial, email, emailAlternativo, nascimento, cargo, telefone1, telefone2, profissao, password, abrigo: { id: abrigoId }, recoveryCode });
    const user = await this.ormRepository.findOne({ where: { id: userId }, relations: ["abrigo", "notificacoes"] });
    return user;

  }
  
  public async updateAbrigo(userId: number, abrigoId:number): Promise<User | undefined> {

    await this.ormRepository.update( userId, { id: userId, abrigo: { id: abrigoId } });   
    const user = await this.ormRepository.findOne({ where: { id: userId }, relations: ["abrigo", "notificacoes"] });
    return user;

  }

  public async delete(id: number): Promise<boolean> {

    await this.ormRepository.delete(id);
    return true;

  }
}

export default UsersRepository;