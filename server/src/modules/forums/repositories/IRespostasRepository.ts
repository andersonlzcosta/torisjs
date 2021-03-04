import Resposta from '@modules/forums/infra/typeorm/entities/Resposta';
import ICreateRespostaDTO from '../dtos/ICreateRespostaDTO';
import IUpdateRespostaDTO from '../dtos/IUpdateRespostaDTO';

export default interface IRespostasRepository {
    findById(id: number): Promise<Resposta | undefined>;
    findAll(): Promise<Resposta[]>;
    save(resposta: Resposta): Promise<Resposta>;
    create(data: ICreateRespostaDTO): Promise<Resposta | undefined>;
    update(respostaId: number, data: IUpdateRespostaDTO): Promise<Resposta | undefined>;
    delete(id: number): Promise<Boolean>;
}