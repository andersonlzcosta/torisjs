import { getCustomRepository } from "typeorm";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
// import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface Request {
    id: number;
}

class DeleteUserService {
    public async execute( { id } : Request): Promise<boolean> {

        const usersRepository = getCustomRepository(UsersRepository);
        await usersRepository.delete( id );
        return true;

    }
}

export default DeleteUserService;