import { inject, injectable } from "tsyringe";
import User from "../infra/typeorm/entities/User";
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface Request {
    email: string;
    password: string;
    nome?: string;
    emailAlternativo?: string;
    nascimento?: Date;
    cargo?: string;
    telefone1?: string;
    telefone2?: string;
    profissao?: string;
    abrigoId?: string;
}

@injectable()
class CreateUserService {
        constructor(
            @inject('UsersRepository')
            private usersRepository: IUsersRepository,
        
            @inject('HashProvider')
            private hashProvider: IHashProvider,
        ) { }
    
        public async execute({ nome, email, emailAlternativo, nascimento, cargo, telefone1, telefone2, profissao, password, abrigoId }: Request): Promise<User | undefined> {

        const encryptedPassword = await this.hashProvider.generateHash(password);

        const user = await this.usersRepository.create({
            nome,
            email,
            emailAlternativo,
            nascimento,
            cargo,
            telefone1,
            telefone2,
            profissao,
            password: encryptedPassword,
            abrigoId
        });

        return user;
    }
}

export default CreateUserService;