import { Resolver, Query, Mutation, Field, ObjectType, Arg, InputType } from "type-graphql";
import Abrigo from '../../typeorm/entities/Abrigo';
import CreateAbrigoService from '../../../services/CreateAbrigoService';
import UpdateAbrigoService from '../../../services/UpdateAbrigoService';
import DeleteAbrigoService from "@modules/abrigos/services/DeleteAbrigoService";
import AbrigosRepository from "../../typeorm/repositories/AbrigosRepository";
import { getCustomRepository } from "typeorm";

// Preciso usar o DTO
@InputType()
class CriarAbrigoInput {
    @Field()
    nome: string;
    @Field()
    telefone1: string;
    @Field()
    telefone2: string;
    @Field()
    email1: string;
    @Field()
    email2: string;
    @Field()
    endereco: string;
    @Field()
    bairro: string;
    @Field()
    cidade: string;
    @Field()
    estado: string;
    @Field()
    classificacao: string;
    @Field()
    capacidade: string;
    @Field()
    faixaEtaria: string;
    @Field()
    lgbt: boolean;
    @Field()
    genero: string;
    @Field()
    pcd: boolean;
    @Field()
    observacao: string;
}

@InputType()
class AtualizarAbrigoInput {
    @Field()
    nome?: string;
    @Field()
    telefone1?: string;
    @Field()
    telefone2?: string;
    @Field()
    email1?: string;
    @Field()
    email2?: string;
    @Field()
    endereco?: string;
    @Field()
    bairro?: string;
    @Field()
    cidade?: string;
    @Field()
    estado?: string;
    @Field()
    classificacao?: string;
    @Field()
    capacidade?: string;
    @Field()
    faixaEtaria?: string;
    @Field()
    lgbt?: boolean;
    @Field()
    genero?: string;
    @Field()
    pcd?: boolean;
    @Field()
    observacao?: string;
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

    @Mutation(() => Boolean)
    async deletarAbrigo(
        @Arg("id") id: string
    ): Promise<boolean> {
       
        const deleteAbrigo = new DeleteAbrigoService();
        await deleteAbrigo.execute( { id } );
        return true;
    }
 
    @Query(() => [Abrigo])
    async verAbrigos(): Promise<Abrigo[]> {

        const abrigosRepository = getCustomRepository(AbrigosRepository);
        const abrigos = await abrigosRepository.findAll();
        return abrigos;

    }
}