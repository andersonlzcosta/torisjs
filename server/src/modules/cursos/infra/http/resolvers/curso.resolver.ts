import { Resolver, Query, Mutation, Field, ObjectType, Arg, InputType } from "type-graphql";
import Curso from '../../typeorm/entities/Curso';
import CreateCursoService from '../../../services/CreateCursoService';
import UpdateCursoService from '../../../services/UpdateCursoService';
import DeleteCursoService from '../../../services/DeleteCursoService';
import CursosRepository from "../../typeorm/repositories/CursosRepository";
import { getCustomRepository } from "typeorm";

// Preciso usar o DTO
@InputType()
class CriarCursoInput {
    @Field()
    nome: string;
    @Field()
    descricao: string;
}

@InputType()
class AtualizarCursoInput {
    @Field()
    cursoId: string;
    @Field()
    nome?: string;
    @Field()
    descricao?: string;
}


// return users by curso on constraints
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
class CursoResponse {
    @Field(() => Curso, { nullable: true })
    curso?: Curso;
}

@Resolver()
export class CursoResolver {
    @Mutation(() => CursoResponse)
    async criarCurso(
        @Arg("options") options: CriarCursoInput
      ): Promise<CursoResponse> {

        const createCurso = new CreateCursoService();
        const curso = await createCurso.execute(options);
        return { curso };

    }
 
    @Query(() => CursoResponse)
    async verCurso(
        @Arg("id") id: string
    ): Promise<CursoResponse> {

        const cursosRepository = getCustomRepository(CursosRepository);
        const curso = await cursosRepository.findById(id);
        return { curso };

    }

    @Mutation(() => CursoResponse)
    async atualizarCurso(
        @Arg("options") options: AtualizarCursoInput
    ): Promise<CursoResponse> {

        console.log(options);
        const updateCurso = new UpdateCursoService();
        const curso = await updateCurso.execute(options);
        return { curso };

    }

    @Mutation(() => Boolean)
    async deletarCurso(
        @Arg("id") id: string
    ): Promise<boolean> {
       
        const deleteCurso = new DeleteCursoService();
        await deleteCurso.execute( { id } );
        return true;
    }
}