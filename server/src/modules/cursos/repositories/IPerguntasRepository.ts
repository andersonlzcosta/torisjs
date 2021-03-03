import Pergunta from '@modules/cursos/infra/typeorm/entities/Pergunta';
import ICreatePerguntaDTO from '../dtos/ICreatePerguntaDTO';
import IUpdatePerguntaDTO from '../dtos/IUpdatePerguntaDTO';

export default interface IPerguntasRepository {
    findById(id: number): Promise<Pergunta | undefined>;
    findAll(): Promise<Pergunta[]>;
    save(pergunta: Pergunta): Promise<Pergunta>;
    create(data: ICreatePerguntaDTO): Promise<Pergunta | undefined>;
    update(perguntaId: number, data: IUpdatePerguntaDTO): Promise<Pergunta | undefined>;
    delete(id: number): Promise<Boolean>;
}