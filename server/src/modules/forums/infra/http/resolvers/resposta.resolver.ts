import { Resolver, Query, Mutation, Field, ObjectType, Arg, InputType } from "type-graphql";
import { container } from "tsyringe";

import Resposta from '../../typeorm/entities/Resposta';

import CreateRespostaService from '../../../services/CreateRespostaService';
import UpdateRespostaService from '../../../services/UpdateRespostaService';
import DeleteRespostaService from '../../../services/DeleteRespostaService';

import { CriarRespostaInput } from "./CreateRespostaInput";
import { AtualizarRespostaInput } from "./UpdateRespostaInput";

import RespostasRepository from "../../typeorm/repositories/RespostasRepository";
import { getCustomRepository } from "typeorm";

@ObjectType()
class RespostaResponse {
    @Field(() => Resposta, { nullable: true })
    resposta?: Resposta;
}

@Resolver()
export class ForumRespostaResolver {
    @Mutation(() => RespostaResponse)
    async criarForumResposta(
        @Arg("options") options: CriarRespostaInput
      ): Promise<RespostaResponse> {

        const createResposta = new CreateRespostaService();
        const resposta = await createResposta.execute(options);
        return { resposta };

    }
 
    @Query(() => RespostaResponse)
    async verForumResposta(
        @Arg("id") id: number
    ): Promise<RespostaResponse> {

        const respostasRepository = getCustomRepository(RespostasRepository);
        const resposta = await respostasRepository.findById(id);
        return { resposta };

    }

    @Mutation(() => RespostaResponse)
    async atualizarForumResposta(
        @Arg("options") options: AtualizarRespostaInput
    ): Promise<RespostaResponse> {

        const updateResposta = container.resolve(UpdateRespostaService);
        const resposta = await updateResposta.execute(options);
        return { resposta };

    }

    @Mutation(() => Boolean)
    async deletarForumResposta(
        @Arg("id") id: number
    ): Promise<boolean> {
       
        const deleteResposta = new DeleteRespostaService();
        await deleteResposta.execute( { id } );
        return true;
    }

    @Query(() => [Resposta])
    async verForumRespostas(): Promise<Resposta[]> {

        const respostasRepository = getCustomRepository(RespostasRepository);
        const respostas = await respostasRepository.findAll();
        return respostas;

    }
}