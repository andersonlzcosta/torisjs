import { getCustomRepository } from "typeorm";
import User from "../models/User";
import UsersRepository from "../repositories/UsersRepository";

interface Request {
    nome: string;
    idade: string;
    profissao: string;
    password: string;
}

class CreateUserService {
    private usersRepository: UsersRepository;
    
    public async execute({ nome, idade, profissao }: Request): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = this.usersRepository.create({ 
            nome,
            idade,
            profissao
        });

        await usersRepository.save(user);

        return user;
     } 
}

export default CreateUserService;