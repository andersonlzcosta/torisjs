import Aula from '@modules/cursos/infra/typeorm/entities/Aula';
import ICreateAulaDTO from '../dtos/ICreateAulaDTO';
import IUpdateAulaDTO from '../dtos/IUpdateAulaDTO';

export default interface IAulasRepository {
    findById(id: number): Promise<Aula | undefined>;
    findAll(): Promise<Aula[]>;
    save(aula: Aula): Promise<Aula>;
    create(data: ICreateAulaDTO): Promise<Aula | undefined>;
    update(aulaId: number, data: IUpdateAulaDTO): Promise<Aula | undefined>;
    delete(id: number): Promise<Boolean>;
}