import { Resolver, Query, Mutation, Field, ObjectType, Arg, InputType } from "type-graphql";
import Abrigo from '../../typeorm/entities/Abrigo';
import CreateAbrigoService from '../../../services/CreateAbrigoService';
import UpdateAbrigoService from '../../../services/UpdateAbrigoService';
import AbrigosRepository from "../../typeorm/repositories/AbrigosRepository";
import { getCustomRepository } from "typeorm";

// Preciso usar o DTO
@InputType()
class CriarAbrigoInput {
    @Field()
    nome: string;
    @Field()
    endereco: string;
    @Field()
    classificacao: string;
    @Field()
    capacidade: string;
    @Field()
    faixaEtaria: string;
}

@InputType()
class AtualizarAbrigoInput {
    @Field()
    abrigoId: string;
    @Field()
    nome?: string;
    @Field()
    endereco?: string;
    @Field()
    classificacao?: string;
    @Field()
    capacidade?: string;
    @Field()
    faixaEtaria?: string;
}


// return users by abrigo on constraints
// @ObjectType()
// class PaginatedUsers {
//   @Field(() => [User])
//   users: User[];
//   @Field()
//   hasMore: boolean;
// }

// Importar as classes de Erros do Rocket

// Não identifiquei um similar desse user response
@ObjectType()
class AbrigoResponse {
    @Field(() => Abrigo, { nullable: true })
    abrigo?: Abrigo;
}

@Resolver()
export class AbrigoResolver {
    @Mutation(() => AbrigoResponse)
    async criarAbrigo(
        @Arg("options") options: CriarAbrigoInput
      ): Promise<AbrigoResponse> {

        const createAbrigo = new CreateAbrigoService();
        const abrigo = await createAbrigo.execute(options);
        return { abrigo };

    }
 
    @Query(() => AbrigoResponse)
    async verAbrigo(
        @Arg("id") id: string
    ): Promise<AbrigoResponse> {

        const abrigosRepository = getCustomRepository(AbrigosRepository);
        const abrigo = await abrigosRepository.findById(id);
        return { abrigo };

    }

    @Mutation(() => AbrigoResponse)
    async atualizarAbrigo(
        @Arg("options") options: AtualizarAbrigoInput
    ): Promise<AbrigoResponse> {

        console.log(options);
        const updateAbrigo = new UpdateAbrigoService();
        const abrigo = await updateAbrigo.execute(options);
        return { abrigo };

    }
}