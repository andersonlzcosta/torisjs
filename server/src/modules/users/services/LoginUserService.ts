import { inject, injectable } from "tsyringe";
import { getCustomRepository } from "typeorm";
import User from "../infra/typeorm/entities/User";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

interface Request {
    email: string;
    password: string;
}

@injectable()
class LoginUserService {
    constructor(
        @inject('HashProvider')
        private hashProvider : IHashProvider
    ) {}

    public async execute({ email, password }: Request): Promise<User | undefined> {
        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findByEmail(email);

        if (!user) {
            throw new Error('user not found');
        }

        const encryptedPassword = await this.hashProvider.compareHash(password, user.password);
        if (!encryptedPassword) {
            throw new Error('Password mismatch');
        }

        return user;
    }
}

export default LoginUserService;