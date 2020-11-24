import { Resolver, Query, Mutation, Field, ObjectType, Arg, InputType } from "type-graphql";
import Pergunta from '../../typeorm/entities/Pergunta';
import CreatePerguntaService from '../../../services/CreatePerguntaService';
import UpdatePerguntaService from '../../../services/UpdatePerguntaService';
import DeletePerguntaService from '../../../services/DeletePerguntaService';
import PerguntasRepository from "../../typeorm/repositories/PerguntasRepository";
import { getCustomRepository } from "typeorm";

// Preciso usar o DTO
@InputType()
class CriarPerguntaInput {
    @Field()
    ordem: number;
    @Field()
    enunciado: string;
    @Field()
    alternativa1: string;
    @Field()
    alternativa2: string;
    @Field()
    alternativa3: string;
    @Field()
    alternativa4: string;
    @Field()
    resposta: number;
    @Field()
    justificativa: string;
}

@InputType()
class AtualizarPerguntaInput {
    @Field()
    perguntaId: string;
    @Field()
    ordem?: number;
    @Field()
    enunciado?: string;
    @Field()
    alternativa1?: string;
    @Field()
    alternativa2?: string;
    @Field()
    alternativa3?: string;
    @Field()
    alternativa4?: string;
    @Field()
    resposta?: number;
    @Field()
    justificativa?: string;
}

@ObjectType()
class PerguntaResponse {
    @Field(() => Pergunta, { nullable: true })
    pergunta?: Pergunta;
}

@Resolver()
export class PerguntaResolver {
    @Mutation(() => PerguntaResponse)
    async criarPergunta(
        @Arg("options") options: CriarPerguntaInput
      ): Promise<PerguntaResponse> {

        const createPergunta = new CreatePerguntaService();
        const pergunta = await createPergunta.execute(options);
        return { pergunta };

    }
 
    @Query(() => PerguntaResponse)
    async verPergunta(
        @Arg("id") id: string
    ): Promise<PerguntaResponse> {

        const perguntasRepository = getCustomRepository(PerguntasRepository);
        const pergunta = await perguntasRepository.findById(id);
        return { pergunta };

    }

    @Mutation(() => PerguntaResponse)
    async atualizarPergunta(
        @Arg("options") options: AtualizarPerguntaInput
    ): Promise<PerguntaResponse> {

        console.log(options);
        const updatePergunta = new UpdatePerguntaService();
        const pergunta = await updatePergunta.execute(options);
        return { pergunta };

    }

    @Mutation(() => Boolean)
    async deletarPergunta(
        @Arg("id") id: string
    ): Promise<boolean> {
       
        const deletePergunta = new DeletePerguntaService();
        await deletePergunta.execute( { id } );
        return true;
    }
}