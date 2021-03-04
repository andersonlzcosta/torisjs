import { Resolver, Query, Mutation, Field, ObjectType, Arg, InputType } from "type-graphql";
import { container } from "tsyringe";

import Modulo from '../../typeorm/entities/Modulo';

import CreateModuloService from '../../../services/CreateModuloService';
import UpdateModuloService from '../../../services/UpdateModuloService';
import DeleteModuloService from '../../../services/DeleteModuloService';

// import { CriarModuloInput } from "./CreateModuloInput";
// import { AtualizarModuloInput } from "./UpdateModuloInput";

import ModulosRepository from "../../typeorm/repositories/ModulosRepository";
import { getCustomRepository } from "typeorm";

// Preciso usar o DTO
@InputType()
class CriarModuloInput {
    @Field({ nullable: true })
    nome: string;
    @Field({ nullable: true })
    cursoId: number;
}

@InputType()
class AtualizarModuloInput {
    @Field()
    moduloId: number;
    @Field({ nullable: true })
    nome?: string;
    @Field({ nullable: true })
    cursoId?: number;
}

@ObjectType()
class ModuloResponse {
    @Field(() => Modulo, { nullable: true })
    modulo?: Modulo;
}

@Resolver()
export class ModuloResolver {
    @Mutation(() => ModuloResponse)
    async criarModulo(
        @Arg("options") options: CriarModuloInput
    ): Promise<ModuloResponse> {

        const createModulo = new CreateModuloService();
        const modulo = await createModulo.execute(options);
        return { modulo };

    }

    @Query(() => ModuloResponse)
    async verModulo(
        @Arg("id") id: number
    ): Promise<ModuloResponse> {

        const modulosRepository = getCustomRepository(ModulosRepository);
        const modulo = await modulosRepository.findById(id);
        return { modulo };

    }

    @Mutation(() => ModuloResponse)
    async atualizarModulo(
        @Arg("options") options: AtualizarModuloInput
    ): Promise<ModuloResponse> {

        const updateModulo = container.resolve(UpdateModuloService);
        const modulo = await updateModulo.execute(options);
        return { modulo };

    }

    @Mutation(() => Boolean)
    async deletarModulo(
        @Arg("id") id: number
    ): Promise<boolean> {

        const deleteModulo = new DeleteModuloService();
        await deleteModulo.execute({ id });
        return true;
    }

    @Query(() => [Modulo])
    async verModulos(): Promise<Modulo[]> {

        const modulosRepository = getCustomRepository(ModulosRepository);
        const modulos = await modulosRepository.findAll();
        return modulos;

    }

    @Query(() => [Modulo])
    async verModulosPorCurso(
        @Arg("cursoId") cursoId: number
    ): Promise<Modulo[]> {

        const modulosRepository = getCustomRepository(ModulosRepository);
        const modulos = await modulosRepository.findAllByCurso(cursoId);
        return modulos;

    }
}