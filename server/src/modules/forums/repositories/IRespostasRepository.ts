import Resposta from '@modules/forums/infra/typeorm/entities/Resposta';
import ICreateRespostaDTO from '../dtos/ICreateRespostaDTO';
import IUpdateRespostaDTO from '../dtos/IUpdateRespostaDTO';

export default interface IRespostasRepository {
    findById(id: string): Promise<Resposta | undefined>;
    findAll(): Promise<Resposta[]>;
    save(resposta: Resposta): Promise<Resposta>;
    create(data: ICreateRespostaDTO): Promise<Resposta | undefined>;
    update(respostaId: string, data: IUpdateRespostaDTO): Promise<Resposta | undefined>;
    delete(id: string): Promise<Boolean>;
}