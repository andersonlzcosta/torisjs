import Abrigo from '@modules/abrigos/infra/typeorm/entities/Abrigo';
import ICreateAbrigoDTO from '../dtos/ICreateAbrigoDTO';

export default interface IAbrigosRepository {
    findById(id: string): Promise<Abrigo | undefined>;
    findAll(): Promise<Abrigo[]>;
    create(data: ICreateAbrigoDTO): Promise<Abrigo>;
    save(abrigo: Abrigo): Promise<Abrigo>;
}