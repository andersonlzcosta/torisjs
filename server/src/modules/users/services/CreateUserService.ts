import { inject, injectable } from "tsyringe";
import User from "../infra/typeorm/entities/User";
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface Request {
    nome: string;
    email: string;
    idade: string;
    profissao: string;
    password: string;
    abrigoId: string;
}

@injectable()
class CreateUserService {
        constructor(
            @inject('UsersRepository')
            private usersRepository: IUsersRepository,
        
            @inject('HashProvider')
            private hashProvider: IHashProvider,
        ) { }
    
        public async execute({ nome, email, idade, profissao, password, abrigoId }: Request): Promise<User | undefined> {

        const encryptedPassword = await this.hashProvider.generateHash(password);

        const user = await this.usersRepository.create({
            nome,
            email,
            idade,
            profissao,
            password: encryptedPassword,
            abrigoId
        });

        return user;
    }
}

export default CreateUserService;