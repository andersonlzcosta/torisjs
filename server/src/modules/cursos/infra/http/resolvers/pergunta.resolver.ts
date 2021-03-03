import { Resolver, Query, Mutation, Field, ObjectType, Arg, InputType } from "type-graphql";
import Pergunta from '../../typeorm/entities/Pergunta';
import CreatePerguntaService from '../../../services/CreatePerguntaService';
import UpdatePerguntaService from '../../../services/UpdatePerguntaService';
import DeletePerguntaService from '../../../services/DeletePerguntaService';
import PerguntasRepository from "../../typeorm/repositories/PerguntasRepository";
import { getCustomRepository } from "typeorm";
import { container } from "tsyringe";

// Preciso usar o DTO
@InputType()
class CriarModuloPerguntaInput {
    @Field({ nullable: true })
    ordem: number;
    @Field({ nullable: true })
    enunciado: string;
    @Field({ nullable: true })
    alternativa1: string;
    @Field({ nullable: true })
    alternativa2: string;
    @Field({ nullable: true })
    alternativa3: string;
    @Field({ nullable: true })
    alternativa4: string;
    @Field({ nullable: true })
    resposta: number;
    @Field({ nullable: true })
    justificativa: string;
    @Field({ nullable: true })
    moduloId:number;
}

@InputType()
class AtualizarModuloPerguntaInput {
    @Field()
    perguntaId: number;
    @Field({ nullable: true })
    ordem?: number;
    @Field({ nullable: true })
    enunciado?: string;
    @Field({ nullable: true })
    alternativa1?: string;
    @Field({ nullable: true })
    alternativa2?: string;
    @Field({ nullable: true })
    alternativa3?: string;
    @Field({ nullable: true })
    alternativa4?: string;
    @Field({ nullable: true })
    resposta?: number;
    @Field({ nullable: true })
    justificativa?: string;
    @Field({ nullable: true })
    moduloId?:number;
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
        @Arg("id") id: number
    ): Promise<ModuloPerguntaResponse> {

        const perguntasRepository = getCustomRepository(PerguntasRepository);
        const pergunta = await perguntasRepository.findById(id);
        return { pergunta };

    }

    @Mutation(() => ModuloPerguntaResponse)
    async atualizarModuloPergunta(
        @Arg("options") options: AtualizarModuloPerguntaInput
    ): Promise<ModuloPerguntaResponse> {

        const updatePergunta = container.resolve(UpdatePerguntaService);
        const pergunta = await updatePergunta.execute(options);
        return { pergunta };

    }

    @Mutation(() => Boolean)
    async deletarModuloPergunta(
        @Arg("id") id: number
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