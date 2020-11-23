import { Resolver, Query, Mutation, Field, ObjectType, Arg, InputType } from "type-graphql";
import Modulo from '../../typeorm/entities/Modulo';
import CreateModuloService from '../../../services/CreateModuloService';
import UpdateModuloService from '../../../services/UpdateModuloService';
import DeleteModuloService from '../../../services/DeleteModuloService';
import ModulosRepository from "../../typeorm/repositories/ModulosRepository";
import { getCustomRepository } from "typeorm";

// Preciso usar o DTO
@InputType()
class CriarModuloInput {
    @Field()
    nome: string;
}

@InputType()
class AtualizarModuloInput {
    @Field()
    moduloId: string;
    @Field()
    nome?: string;
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
        @Arg("id") id: string
    ): Promise<ModuloResponse> {

        const modulosRepository = getCustomRepository(ModulosRepository);
        const modulo = await modulosRepository.findById(id);
        return { modulo };

    }

    @Mutation(() => ModuloResponse)
    async atualizarModulo(
        @Arg("options") options: AtualizarModuloInput
    ): Promise<ModuloResponse> {

        console.log(options);
        const updateModulo = new UpdateModuloService();
        const modulo = await updateModulo.execute(options);
        return { modulo };

    }

    @Mutation(() => Boolean)
    async deletarModulo(
        @Arg("id") id: string
    ): Promise<boolean> {
       
        const deleteModulo = new DeleteModuloService();
        await deleteModulo.execute( { id } );
        return true;
    }
}