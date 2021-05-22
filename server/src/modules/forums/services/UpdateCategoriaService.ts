import { inject, injectable } from "tsyringe";
import Categoria from "../infra/typeorm/entities/Categoria";
import ICategoriasRepository from "../repositories/ICategoriasRepository";

interface Request {
    categoriaId: number;
    nome?: string;
}

@injectable()
class UpdateCategoriaService {
    constructor(
        @inject('ForumsCategoriasRepository')
        private categoriasRepository: ICategoriasRepository
    ) { }

    public async execute({ categoriaId, nome }: Request): Promise<Categoria | undefined> {

        const categoria = await this.categoriasRepository.findById(categoriaId);
        
        if (categoria) {
            if (!nome) nome = categoria.nome;
        }
        
        return this.categoriasRepository.update( 
            categoriaId, { 
                nome
            }
        );
    
    }
}

export default UpdateCategoriaService;