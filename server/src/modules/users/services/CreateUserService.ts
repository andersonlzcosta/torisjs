import { hash } from "bcryptjs";
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

        const hashedPassword = await hash(password, 8);

        const user = await usersRepository.create({
            nome,
            email,
            idade,
            profissao,
            password: hashedPassword,
            abrigoId
        });

        return user;
    }
}

export default CreateUserService;