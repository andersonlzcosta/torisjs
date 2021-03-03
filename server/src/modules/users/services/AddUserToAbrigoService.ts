import { inject, injectable } from "tsyringe";
import User from "../infra/typeorm/entities/User";
import IUsersRepository from "../repositories/IUsersRepository";

interface Request {
    userId: number;
    abrigoId: number;
}

@injectable()
class AddUserToAbrigoService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) { }

    public async execute({ userId, abrigoId } : Request):  Promise<User | undefined> {

        return this.usersRepository.updateAbrigo( userId, abrigoId );
    
    }
}

export default AddUserToAbrigoService;