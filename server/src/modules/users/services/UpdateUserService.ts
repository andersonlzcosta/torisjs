import { getCustomRepository } from "typeorm";
import User from "../infra/typeorm/entities/User";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
// import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface Request {
    userId: string;
    nome?: string;
    email?: string;
    idade?: string;
    profissao?: string;
    old_password?: string;
    password?: string;
    abrigoId?: string;
}

class UpdateProfileService {
    public async execute({ userId, nome, email, idade, profissao, old_password, password, abrigoId }: Request): Promise<User | undefined> {

        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findById(userId);
        if (!(user.password == old_password)) { password = user.password };
        return usersRepository.update( userId, { nome, email, idade, profissao, password, abrigoId });
    
    }
}

export default UpdateProfileService;