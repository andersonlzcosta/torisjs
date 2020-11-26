import { getCustomRepository } from "typeorm";
import Curso from "../infra/typeorm/entities/Curso";
import CursosRepository from "../infra/typeorm/repositories/CursosRepository";

interface Request {
    cursoId: string;
    nome?: string;
    descricao?: string;
}

class UpdateCursoService {
    public async execute({ cursoId, nome, descricao }: Request): Promise<Curso | undefined> {

        const cursosRepository = getCustomRepository(CursosRepository);
        return cursosRepository.update( cursoId, { nome, descricao });
    
    }
}

export default UpdateCursoService;