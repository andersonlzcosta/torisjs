import { getCustomRepository } from "typeorm";
import Modulo from "../infra/typeorm/entities/Modulo";
import ModulosRepository from "../infra/typeorm/repositories/ModulosRepository";

interface Request {
    moduloId: string;
    nome?: string;
    cursoId?: string;
}

class UpdateModuloService {
    public async execute({ moduloId, nome, cursoId }: Request): Promise<Modulo | undefined> {

        const modulosRepository = getCustomRepository(ModulosRepository);
        return modulosRepository.update( moduloId, { nome, cursoId });
    
    }
}

export default UpdateModuloService;