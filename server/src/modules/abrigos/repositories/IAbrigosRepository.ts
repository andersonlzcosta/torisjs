import Abrigo from '@modules/abrigos/infra/typeorm/entities/Abrigo';
import ICreateAbrigoDTO from '../dtos/ICreateAbrigoDTO';
import IUpdateAbrigoDTO from '../dtos/IUpdateAbrigoDTO';

export default interface IAbrigosRepository {
    findById(id: string): Promise<Abrigo | undefined>;
    findAll(): Promise<Abrigo[]>;
    create(data: ICreateAbrigoDTO): Promise<Abrigo>;
    save(abrigo: Abrigo): Promise<Abrigo>;
    update(abrigoId: string, data: IUpdateAbrigoDTO): Promise<Abrigo | undefined>;
    delete(id: string): Promise<Boolean>;
}