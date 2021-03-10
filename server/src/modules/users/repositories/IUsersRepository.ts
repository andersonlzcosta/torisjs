import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';

export default interface IUsersRepository {
    findById(id: number): Promise<User | undefined>;
    findAll(): Promise<User[]>;
    findByEmail(email: string): Promise<User | undefined>;
    findByName(nome: string): Promise<User[]>;
    save(user: User): Promise<User>;
    create(data: ICreateUserDTO): Promise<User | undefined>;
    update(userId: number, data: IUpdateUserDTO): Promise<User | undefined>;
    updateAbrigo(userId: number, abrigoId: number): Promise<User | undefined>;
    delete(id: number): Promise<Boolean>;
}