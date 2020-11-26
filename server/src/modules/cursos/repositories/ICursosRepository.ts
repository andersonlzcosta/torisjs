import Curso from '@modules/cursos/infra/typeorm/entities/Curso';
import ICreateCursoDTO from '../dtos/ICreateCursoDTO';
import IUpdateCursoDTO from '../dtos/IUpdateCursoDTO';

export default interface ICursosRepository {
    findById(id: string): Promise<Curso | undefined>;
    findAll(): Promise<Curso[]>;
    save(curso: Curso): Promise<Curso>;
    create(data: ICreateCursoDTO): Promise<Curso>;
    update(cursoId: string, data: IUpdateCursoDTO): Promise<Curso | undefined>;
    delete(id: string): Promise<Boolean>;
}