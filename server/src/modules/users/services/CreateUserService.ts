import { getCustomRepository } from "typeorm";
import User from "../infra/typeorm/entities/User";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";

interface Request {
    nome: string;
    email: string;
    idade: string;
    profissao: string;
    password: string;
    abrigoId: string;
}

class CreateUserService {
    public async execute({ nome, email, idade, profissao, password, abrigoId }: Request): Promise<User | undefined> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.create({
            nome,
            email,
            idade,
            profissao,
            password,
            abrigoId
        });

        return user;
    }
}

export default CreateUserService;