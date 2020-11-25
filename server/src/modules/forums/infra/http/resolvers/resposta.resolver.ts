import { Resolver, Query, Mutation, Field, ObjectType, Arg, InputType } from "type-graphql";
import Resposta from '../../typeorm/entities/Resposta';
import CreateRespostaService from '../../../services/CreateRespostaService';
import UpdateRespostaService from '../../../services/UpdateRespostaService';
import DeleteRespostaService from '../../../services/DeleteRespostaService';
import RespostasRepository from "../../typeorm/repositories/RepostasRepository";
import { getCustomRepository } from "typeorm";

// Preciso usar o DTO
@InputType()
class CriarRespostaInput {
    @Field()
    corpo: string;
    @Field()
    perguntaId: string;
}

@InputType()
class AtualizarRespostaInput {
    @Field()
    respostaId: string;
    @Field()
    corpo?: string;
    @Field()
    perguntaId?: string;
}

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
        @Arg("id") id: string
    ): Promise<RespostaResponse> {

        const respostasRepository = getCustomRepository(RespostasRepository);
        const resposta = await respostasRepository.findById(id);
        return { resposta };

    }

    @Mutation(() => RespostaResponse)
    async atualizarForumResposta(
        @Arg("options") options: AtualizarRespostaInput
    ): Promise<RespostaResponse> {

        console.log(options);
        const updateResposta = new UpdateRespostaService();
        const resposta = await updateResposta.execute(options);
        return { resposta };

    }

    @Mutation(() => Boolean)
    async deletarForumResposta(
        @Arg("id") id: string
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