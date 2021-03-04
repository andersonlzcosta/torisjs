import { inject, injectable } from "tsyringe";
import IAbrigosRepository from "../repositories/IAbrigosRepository";

interface Request {
    id: number;
}

@injectable()
class DeleteAbrigoService {
    constructor(
        @inject('AbrigosRepository')
        private abrigosRepository: IAbrigosRepository
    ) { }

    public async execute( { id } : Request): Promise<boolean> {

        await this.abrigosRepository.delete( id );
        return true;

    }
}

export default DeleteAbrigoService;