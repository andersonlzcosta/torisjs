import { getCustomRepository } from "typeorm";
import Curso from "../infra/typeorm/entities/Curso";
import CursosRepository from "../infra/typeorm/repositories/CursosRepository";

interface Request {
    nome: string;
    descricao: string;
}

class CreateCursoService {
    public async execute({ nome, descricao }: Request): Promise<Curso> {
        const cursosRepository = getCustomRepository(CursosRepository);

        const curso = cursosRepository.create({
            nome,
            descricao
        });

        return curso;
    }
}

export default CreateCursoService;