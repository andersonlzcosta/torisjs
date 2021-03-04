import Modulo from '@modules/cursos/infra/typeorm/entities/Modulo';
import ICreateModuloDTO from '../dtos/ICreateModuloDTO';
import IUpdateModuloDTO from '../dtos/IUpdateModuloDTO';

export default interface IModulosRepository {
    findById(id: number): Promise<Modulo | undefined>;
    findAll(): Promise<Modulo[]>;
    findAllByCurso(cursoId: number): Promise<Modulo[]>;
    save(modulo: Modulo): Promise<Modulo>;
    create(data: ICreateModuloDTO): Promise<Modulo | undefined>;
    update(moduloId: number, data: IUpdateModuloDTO): Promise<Modulo | undefined>;
    delete(id: number): Promise<Boolean>;
}