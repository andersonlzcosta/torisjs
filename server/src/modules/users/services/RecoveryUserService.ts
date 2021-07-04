import { inject, injectable } from "tsyringe";
import { getCustomRepository } from "typeorm";
import User from "../infra/typeorm/entities/User";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

interface Request {
    userId: number;
    password: string;
}

@injectable()
class RecoveryUserService {
    constructor(
        @inject('HashProvider')
        private hashProvider: IHashProvider
    ) {}

    public async execute({ userId, password }: Request): Promise<User | undefined> {
        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findById(userId);
        if (!user) {
            throw new Error('user not found to update');
        }

        if (!password) {
            throw new Error('Password is required');
        }
        
        const encryptedPassword = await this.hashProvider.generateHash(password);
            
        return usersRepository.update(userId, {
            ...user,
            password: encryptedPassword,
            recoveryCode: ''
        });
    }
}

export default RecoveryUserService;