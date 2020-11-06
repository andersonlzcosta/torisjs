import { Resolver, Query, Mutation, Field, ObjectType, Arg, InputType } from "type-graphql";
import Abrigo from '../../typeorm/entities/Abrigo';
import CreateAbrigoService from '../../../services/CreateAbrigoService';
import AbrigosRepository from "../../typeorm/repositories/AbrigosRepository";
import { getCustomRepository } from "typeorm";

// Preciso usar o DTO
@InputType()
export class AbrigoInput {
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
        @Arg("options") options: AbrigoInput
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
        const abrigo = await abrigosRepository.findById(id);;
        return { abrigo };
    }

    @Query(() => String)
    helloAbrigo() {
        return "I say goodbye... Hello Hello!";
    }
}