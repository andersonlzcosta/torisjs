import Categoria from '@modules/forums/infra/typeorm/entities/Categoria';
import ICreateCategoriaDTO from '../dtos/ICreateCategoriaDTO';
import IUpdateCategoriaDTO from '../dtos/IUpdateCategoriaDTO';

export default interface ICategoriasRepository {
    findById(id: number): Promise<Categoria | undefined>;
    findAll(): Promise<Categoria[]>;
    save(categoria: Categoria): Promise<Categoria>;
    create(data: ICreateCategoriaDTO): Promise<Categoria>;
    update(categoriaId: number, data: IUpdateCategoriaDTO): Promise<Categoria | undefined>;
    delete(id: number): Promise<Boolean>;
}