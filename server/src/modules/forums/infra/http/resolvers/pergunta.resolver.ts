import { Resolver, Query, Mutation, Field, ObjectType, Arg, InputType } from "type-graphql";
import Pergunta from '../../typeorm/entities/Pergunta';
import CreatePerguntaService from '../../../services/CreatePerguntaService';
import UpdatePerguntaService from '../../../services/UpdatePerguntaService';
import DeletePerguntaService from '../../../services/DeletePerguntaService';
import PerguntasRepository from "../../typeorm/repositories/PerguntasRepository";
import { getCustomRepository } from "typeorm";

// Preciso usar o DTO
@InputType()
class CriarForumPerguntaInput {
    @Field()
    titulo: string;
    @Field()
    corpo: string;
    @Field()
    foiResolvido: boolean;
}

@InputType()
class AtualizarForumPerguntaInput {
    @Field()
    perguntaId: string;
    @Field()
    titulo?: string;
    @Field()
    corpo?: string;
    @Field()
    foiResolvido?: boolean;
}

@ObjectType()
class ForumPerguntaResponse {
    @Field(() => Pergunta, { nullable: true })
    pergunta?: Pergunta;
}

@Resolver()
export class ForumPerguntaResolver {
    @Mutation(() => ForumPerguntaResponse)
    async criarForumPergunta(
        @Arg("options") options: CriarForumPerguntaInput
      ): Promise<ForumPerguntaResponse> {

        const createPergunta = new CreatePerguntaService();
        const pergunta = await createPergunta.execute(options);
        return { pergunta };

    }
 
    @Query(() => ForumPerguntaResponse)
    async verForumPergunta(
        @Arg("id") id: string
    ): Promise<ForumPerguntaResponse> {

        const perguntasRepository = getCustomRepository(PerguntasRepository);
        const pergunta = await perguntasRepository.findById(id);
        return { pergunta };

    }

    @Mutation(() => ForumPerguntaResponse)
    async atualizarForumPergunta(
        @Arg("options") options: AtualizarForumPerguntaInput
    ): Promise<ForumPerguntaResponse> {

        const updatePergunta = new UpdatePerguntaService();
        const pergunta = await updatePergunta.execute(options);
        return { pergunta };

    }

    @Mutation(() => Boolean)
    async deletarForumPergunta(
        @Arg("id") id: string
    ): Promise<boolean> {
       
        const deletePergunta = new DeletePerguntaService();
        await deletePergunta.execute( { id } );
        return true;
    }

    @Query(() => [Pergunta])
    async verForumPerguntas(): Promise<Pergunta[]> {

        const perguntasRepository = getCustomRepository(PerguntasRepository);
        const perguntas = await perguntasRepository.findAll();
        return perguntas;

    }
}