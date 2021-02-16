import { getCustomRepository } from "typeorm";
import User from "../infra/typeorm/entities/User";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";

interface Request {
    userId: string;
    nome?: string;
    email?: string;
    emailAlternativo?: string;
    nascimento?: Date;
    cargo?: string;
    telefone1?: string;
    telefone2?: string;
    profissao?: string;
    old_password?: string;
    password?: string;
    abrigoId?: string;
}

class UpdateProfileService {
    public async execute({ userId, nome, email, emailAlternativo, nascimento, cargo, telefone1, telefone2, profissao, old_password, password, abrigoId }: Request): Promise<User | undefined> {

        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findById(userId);
        if (!user) {
            throw new Error('user not found on updateProfileService');
        }
        if (!(user.password == old_password)) { password = user.password };
        return usersRepository.update(userId, { nome, email, emailAlternativo, nascimento, cargo, telefone1, telefone2, profissao, password, abrigoId });

    }
}

export default UpdateProfileService;