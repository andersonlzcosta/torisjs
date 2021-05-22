import { inject, injectable } from "tsyringe";
import ICategoriasRepository from "../repositories/ICategoriasRepository";

interface Request {
    id: number;
}

@injectable()
class DeleteCategoriaService {
    constructor(
        @inject('ForumsCategoriasRepository')
        private categoriasRepository: ICategoriasRepository
    ) { }

    public async execute( { id } : Request): Promise<boolean> {

        await this.categoriasRepository.delete( id );
        return true;

    }
}

export default DeleteCategoriaService;