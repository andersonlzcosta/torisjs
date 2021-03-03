import { getCustomRepository } from "typeorm";
import Modulo from "../infra/typeorm/entities/Modulo";
import ModulosRepository from "../infra/typeorm/repositories/ModulosRepository";

interface Request {
    nome: string;
    cursoId: number;
}

class CreateModuloService {
    public async execute({ nome, cursoId }: Request): Promise<Modulo | undefined> {
        const modulosRepository = getCustomRepository(ModulosRepository);

        const modulo = modulosRepository.create({
            nome,
            cursoId
        });

        return modulo;
    }
}

export default CreateModuloService;