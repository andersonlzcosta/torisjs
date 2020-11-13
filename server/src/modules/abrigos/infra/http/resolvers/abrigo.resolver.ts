import { Resolver, Query, Mutation, Field, ObjectType, Arg, InputType } from "type-graphql";
import Abrigo from '../../typeorm/entities/Abrigo';
import CreateAbrigoService from '../../../services/CreateAbrigoService';
import AbrigosRepository from "../../typeorm/repositories/AbrigosRepository";
import { getCustomRepository } from "typeorm";
import User from "@modules/users/infra/typeorm/entities/User";

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

    @Query(() => String)
    helloAbrigo() {

        return "I say goodbye... Hello Hello!";

    }
}