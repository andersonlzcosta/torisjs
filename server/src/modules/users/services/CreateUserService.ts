import { getCustomRepository } from "typeorm";
import User from "../infra/typeorm/entities/User";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";

interface Request {
    nome: string;
    email: string;
    idade: string;
    profissao: string;
    password: string;
}

class CreateUserService {
    public async execute({ nome, email, idade, profissao, password }: Request): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = usersRepository.create({
            nome,
            email,
            idade,
            profissao,
            password
        });

        return user;
    }
}

export default CreateUserService;