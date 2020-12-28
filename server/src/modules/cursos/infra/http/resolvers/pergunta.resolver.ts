import { Resolver, Query, Mutation, Field, ObjectType, Arg, InputType } from "type-graphql";
import Pergunta from '../../typeorm/entities/Pergunta';
import CreatePerguntaService from '../../../services/CreatePerguntaService';
import UpdatePerguntaService from '../../../services/UpdatePerguntaService';
import DeletePerguntaService from '../../../services/DeletePerguntaService';
import PerguntasRepository from "../../typeorm/repositories/PerguntasRepository";
import { getCustomRepository } from "typeorm";

// Preciso usar o DTO
@InputType()
class CriarModuloPerguntaInput {
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
    @Field()
    moduloId:string;
}

@InputType()
class AtualizarModuloPerguntaInput {
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
    @Field()
    moduloId?:string;
}

@ObjectType()
class ModuloPerguntaResponse {
    @Field(() => Pergunta, { nullable: true })
    pergunta?: Pergunta;
}

@Resolver()
export class ModuloPerguntaResolver {
    @Mutation(() => ModuloPerguntaResponse)
    async criarModuloPergunta(
        @Arg("options") options: CriarModuloPerguntaInput
      ): Promise<ModuloPerguntaResponse> {

        const createPergunta = new CreatePerguntaService();
        const pergunta = await createPergunta.execute(options);
        return { pergunta };

    }
 
    @Query(() => ModuloPerguntaResponse)
    async verModuloPergunta(
        @Arg("id") id: string
    ): Promise<ModuloPerguntaResponse> {

        const perguntasRepository = getCustomRepository(PerguntasRepository);
        const pergunta = await perguntasRepository.findById(id);
        return { pergunta };

    }

    @Mutation(() => ModuloPerguntaResponse)
    async atualizarModuloPergunta(
        @Arg("options") options: AtualizarModuloPerguntaInput
    ): Promise<ModuloPerguntaResponse> {

        console.log(options);
        const updatePergunta = new UpdatePerguntaService();
        const pergunta = await updatePergunta.execute(options);
        return { pergunta };

    }

    @Mutation(() => Boolean)
    async deletarModuloPergunta(
        @Arg("id") id: string
    ): Promise<boolean> {
       
        const deletePergunta = new DeletePerguntaService();
        await deletePergunta.execute( { id } );
        return true;
    }

    @Query(() => [Pergunta])
    async verModuloPerguntas(): Promise<Pergunta[]> {

        const perguntasRepository = getCustomRepository(PerguntasRepository);
        const perguntas = await perguntasRepository.findAll();
        return perguntas;

    }
}