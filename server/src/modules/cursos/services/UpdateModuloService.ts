import { inject, injectable } from "tsyringe";
import Modulo from "../infra/typeorm/entities/Modulo";
import IModulosRepository from "../repositories/IModulosRepository";

interface Request {
    moduloId: number;
    nome?: string;
    cursoId?: number;
}

@injectable()
class UpdateModuloService {
    constructor(
        @inject('ModulosRepository')
        private modulosRepository: IModulosRepository,
    ) { }

    public async execute({ moduloId, nome, cursoId }: Request): Promise<Modulo | undefined> {

        const modulo = await this.modulosRepository.findById(moduloId);
        
        if (modulo) {
            if (!nome) nome = modulo.nome;
            if (!cursoId) cursoId = modulo.curso.id;
        }

        return this.modulosRepository.update( moduloId, { nome, cursoId });
    
    }
}

export default UpdateModuloService;