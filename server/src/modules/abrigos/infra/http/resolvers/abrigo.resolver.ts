import { Resolver, Query, Mutation, Field, ObjectType, Arg } from "type-graphql";
import { container } from "tsyringe";

import Abrigo from '../../typeorm/entities/Abrigo';

import CreateAbrigoService from '../../../services/CreateAbrigoService';
import UpdateAbrigoService from '../../../services/UpdateAbrigoService';
import DeleteAbrigoService from "@modules/abrigos/services/DeleteAbrigoService";
import FindAllAbrigosService from "@modules/abrigos/services/FindAllAbrigosService";

import { CriarAbrigoInput } from "./CreateAbrigoInput";
import { AtualizarAbrigoInput } from "./UpdateAbrigoInput";

import AbrigosRepository from "../../typeorm/repositories/AbrigosRepository";
import { getCustomRepository } from "typeorm";


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

        const createAbrigo = container.resolve(CreateAbrigoService);
        const abrigo = await createAbrigo.execute(options);
        return { abrigo };

    }
 
    @Query(() => AbrigoResponse)
    async verAbrigo(
        @Arg("id") id: number
    ): Promise<AbrigoResponse> {

        const abrigosRepository = getCustomRepository(AbrigosRepository);
        const abrigo = await abrigosRepository.findById(id);
        return { abrigo };

    }

    @Mutation(() => AbrigoResponse)
    async atualizarAbrigo(
        @Arg("options") options: AtualizarAbrigoInput
    ): Promise<AbrigoResponse> {

        const updateAbrigo = container.resolve(UpdateAbrigoService);
        const abrigo = await updateAbrigo.execute(options);
        return { abrigo };

    }

    @Mutation(() => Boolean)
    async deletarAbrigo(
        @Arg("id") id: number
    ): Promise<boolean> {
       
        const deleteAbrigo = container.resolve(DeleteAbrigoService);
        await deleteAbrigo.execute( { id } );
        return true;
    }
 
    @Query(() => [Abrigo])
    async procurarAbrigos(
        @Arg("nome") nome: string
    ): Promise<Abrigo[]> {

        const abrigosRepository = getCustomRepository(AbrigosRepository);
        const abrigos = await abrigosRepository.findByName(nome);
        return abrigos;

    }

    @Query(() => [Abrigo])
    async verAbrigos(): Promise<Abrigo[]> {

        const abrigosRepository = getCustomRepository(AbrigosRepository);
        const abrigos = await abrigosRepository.findAll();
        return abrigos;

    }
}