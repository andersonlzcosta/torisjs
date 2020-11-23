import { getCustomRepository } from "typeorm";
import Modulo from "../infra/typeorm/entities/Modulo";
import ModulosRepository from "../infra/typeorm/repositories/ModulosRepository";

interface Request {
    nome: string;
}

class CreateModuloService {
    public async execute({ nome }: Request): Promise<Modulo> {
        const modulosRepository = getCustomRepository(ModulosRepository);

        const modulo = modulosRepository.create({
            nome
        });

        return modulo;
    }
}

export default CreateModuloService;