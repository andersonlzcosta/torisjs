import Modulo from '@modules/cursos/infra/typeorm/entities/Modulo';
import ICreateModuloDTO from '../dtos/ICreateModuloDTO';
import IUpdateModuloDTO from '../dtos/IUpdateModuloDTO';

export default interface IModulosRepository {
    findById(id: string): Promise<Modulo | undefined>;
    findAll(): Promise<Modulo[]>;
    save(modulo: Modulo): Promise<Modulo>;
    create(data: ICreateModuloDTO): Promise<Modulo | undefined>;
    update(moduloId: string, data: IUpdateModuloDTO): Promise<Modulo | undefined>;
    delete(id: string): Promise<Boolean>;
}