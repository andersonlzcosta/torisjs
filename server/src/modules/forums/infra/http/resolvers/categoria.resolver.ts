import { Resolver, Query, Mutation, Field, ObjectType, Arg } from "type-graphql";
import { container } from "tsyringe";

import Categoria from '../../typeorm/entities/Categoria';

import CreateCategoriaService from '../../../services/CreateCategoriaService';
import UpdateCategoriaService from '../../../services/UpdateCategoriaService';
import DeleteCategoriaService from '../../../services/DeleteCategoriaService';

import { AtualizarForumCategoriaInput } from "./UpdateCategoriaInput";
import { CriarForumCategoriaInput } from "./CreateCategoriaInput";

import CategoriasRepository from "../../typeorm/repositories/CategoriasRepository";
import { getCustomRepository } from "typeorm";

@ObjectType()
class ForumCategoriaResponse {
    @Field(() => Categoria, { nullable: true })
    categoria?: Categoria;
}

@Resolver()
export class ForumCategoriaResolver {
    @Mutation(() => ForumCategoriaResponse)
    async criarForumCategoria(
        @Arg("options") options: CriarForumCategoriaInput
      ): Promise<ForumCategoriaResponse> {

        const createCategoria = container.resolve(CreateCategoriaService);
        const categoria = await createCategoria.execute(options);
        return { categoria };

    }
 
    @Query(() => ForumCategoriaResponse)
    async verForumCategoria(
        @Arg("id") id: number
    ): Promise<ForumCategoriaResponse> {

        const categoriasRepository = getCustomRepository(CategoriasRepository);
        const categoria = await categoriasRepository.findById(id);
        return { categoria };

    }

    @Mutation(() => ForumCategoriaResponse)
    async atualizarForumCategoria(
        @Arg("options") options: AtualizarForumCategoriaInput
    ): Promise<ForumCategoriaResponse> {

        const updateCategoria = container.resolve(UpdateCategoriaService);
        const categoria = await updateCategoria.execute(options);
        return { categoria };

    }

    @Mutation(() => Boolean)
    async deletarForumCategoria(
        @Arg("id") id: number
    ): Promise<boolean> {
       
        const deleteCategoria = container.resolve(DeleteCategoriaService);
        await deleteCategoria.execute( { id } );
        return true;
    }

    @Query(() => [Categoria])
    async verForumCategorias(): Promise<Categoria[]> {

        const categoriasRepository = getCustomRepository(CategoriasRepository);
        const categorias = await categoriasRepository.findAll();
        return categorias;

    }
}