import { inject, injectable } from "tsyringe";
import Categoria from "../infra/typeorm/entities/Categoria";
import ICategoriasRepository from "../repositories/ICategoriasRepository";

interface Request {
    nome: string;
}

@injectable()
class CreateCategoriaService {
    constructor(
        @inject('ForumsCategoriasRepository')
        private categoriasRepository: ICategoriasRepository
    ) { }

    public async execute({ nome }: Request): Promise<Categoria> {

        const categoria = await this.categoriasRepository.create({
            nome
        });

        return categoria;
    }
}

export default CreateCategoriaService;