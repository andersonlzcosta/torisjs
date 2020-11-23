import Aula from '@modules/cursos/infra/typeorm/entities/Aula';
import ICreateAulaDTO from '../dtos/ICreateAulaDTO';
import IUpdateAulaDTO from '../dtos/IUpdateAulaDTO';

export default interface IAulasRepository {
    findById(id: string): Promise<Aula | undefined>;
    findAll(): Promise<Aula[]>;
    create(data: ICreateAulaDTO): Promise<Aula>;
    update(aulaId: string, data: IUpdateAulaDTO): Promise<Aula | undefined>;
    delete(id: string): Promise<Boolean>;
}