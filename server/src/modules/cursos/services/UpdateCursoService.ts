import { inject, injectable } from "tsyringe";
import Curso from "../infra/typeorm/entities/Curso";
import ICursosRepository from "../repositories/ICursosRepository";

interface Request {
    cursoId: number;
    nome?: string;
    descricao?: string;
}

@injectable()
class UpdateCursoService {
    constructor(
        @inject('CursosRepository')
        private cursosRepository: ICursosRepository,
    ) { }

    public async execute({ cursoId, nome, descricao }: Request): Promise<Curso | undefined> {

        const curso = await this.cursosRepository.findById(cursoId);
        
        if (curso) {
            if (!nome) nome = curso.nome;
            if (!descricao) descricao = curso.descricao;
        }

        return this.cursosRepository.update( cursoId, { nome, descricao });
    
    }
}

export default UpdateCursoService;