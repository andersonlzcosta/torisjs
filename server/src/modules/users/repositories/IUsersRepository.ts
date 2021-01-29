import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';

export default interface IUsersRepository {
    findById(id: string): Promise<User | undefined>;
    findAll(): Promise<User[]>;
    findByEmail(email: string): Promise<User | undefined>;
    findByName(nome: string): Promise<User[]>;
    create(data: ICreateUserDTO): Promise<User | undefined>;
    save(user: User): Promise<User>;
    update(userId: string, data: IUpdateUserDTO): Promise<User | undefined>;
    delete(id: string): Promise<Boolean>;
}