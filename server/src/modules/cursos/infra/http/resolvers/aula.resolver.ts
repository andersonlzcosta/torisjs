import { Resolver, Query, Mutation, Field, ObjectType, Arg, InputType } from "type-graphql";
import Aula from '../../typeorm/entities/Aula';
import CreateAulaService from '../../../services/CreateAulaService';
import UpdateAulaService from '../../../services/UpdateAulaService';
import DeleteAulaService from '../../../services/DeleteAulaService';
import AulasRepository from "../../typeorm/repositories/AulasRepository";
import { getCustomRepository } from "typeorm";

// Preciso usar o DTO
@InputType()
class CriarAulaInput {
    @Field()
    ordem: number;
    @Field()
    nome: string;
    @Field()
    video_url: string;
    @Field()
    duracao: string;
}

@InputType()
class AtualizarAulaInput {
    @Field()
    aulaId: string;
    @Field()
    ordem?: number;
    @Field()
    nome?: string;
    @Field()
    video_url?: string;
    @Field()
    duracao?: string;
}

@ObjectType()
class AulaResponse {
    @Field(() => Aula, { nullable: true })
    aula?: Aula;
}

@Resolver()
export class AulaResolver {
    @Mutation(() => AulaResponse)
    async criarAula(
        @Arg("options") options: CriarAulaInput
      ): Promise<AulaResponse> {

        const createAula = new CreateAulaService();
        const aula = await createAula.execute(options);
        return { aula };

    }
 
    @Query(() => AulaResponse)
    async verAula(
        @Arg("id") id: string
    ): Promise<AulaResponse> {

        const aulasRepository = getCustomRepository(AulasRepository);
        const aula = await aulasRepository.findById(id);
        return { aula };

    }

    @Mutation(() => AulaResponse)
    async atualizarAula(
        @Arg("options") options: AtualizarAulaInput
    ): Promise<AulaResponse> {

        console.log(options);
        const updateAula = new UpdateAulaService();
        const aula = await updateAula.execute(options);
        return { aula };

    }

    @Mutation(() => Boolean)
    async deletarAula(
        @Arg("id") id: string
    ): Promise<boolean> {
       
        const deleteAula = new DeleteAulaService();
        await deleteAula.execute( { id } );
        return true;
    }
}