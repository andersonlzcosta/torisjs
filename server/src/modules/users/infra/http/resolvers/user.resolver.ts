import { Resolver, Query, Mutation, Field, ObjectType, Arg, InputType } from "type-graphql";
import User from '../../typeorm/entities/User';
import CreateUserService from '../../../services/CreateUserService';
import UpdateUserService from '../../../services/UpdateUserService';
import DeleteUserService from '../../../services/DeleteUserService';
import UsersRepository from "../../typeorm/repositories/UsersRepository";
import { getCustomRepository } from "typeorm";

// Tlvz um DTO
@InputType()
class CreateUserInput {
    @Field()
    password: string;
    @Field()
    nome: string;
    @Field()
    idade: string;
    @Field()
    profissao: string;
    @Field()
    email: string;
    // considerar o abrigo objeto
    @Field()
    abrigoId: string;
}

@InputType()
class UpdateUserInput {
    @Field()
    userId: string;
    @Field()
    old_password?: string;
    @Field()
    password?: string;
    @Field()
    nome?: string;
    @Field()
    idade?: string;
    @Field()
    profissao?: string;
    @Field()
    email?: string;
    @Field()
    abrigoId?: string;
}

// Importar as classes de Erros do Rocket

// Não identifiquei um similar desse user response
@ObjectType()
class UserResponse {  
    @Field(() => User, { nullable: true })
    user?: User;
}

@Resolver()
export class UserResolver {

    @Mutation(() => UserResponse)
    async registrar(
        @Arg("options") options: CreateUserInput
      ): Promise<UserResponse> {

        const createUser = new CreateUserService();
        const user = await createUser.execute(options);
        return { user };
 
    }
 
    @Mutation(() => UserResponse)
    async login(
        @Arg("email") email: string
    ): Promise<UserResponse> {

        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findByEmail(email);
        return { user };

    }

    @Mutation(() => UserResponse)
    async updateUsuario(
        @Arg("options") options: UpdateUserInput
    ): Promise<UserResponse> {

        const updateUser = new UpdateUserService();
        const user = await updateUser.execute(options);
        return { user };

    }

    @Mutation(() => Boolean)
    async deletarUsuario(
        @Arg("id") id: string
    ): Promise<boolean> {
       
        const deleteUser = new DeleteUserService();
        await deleteUser.execute( { id } );
        return true;
    }
 
    @Query(() => [User])
    async verUsuarios(): Promise<User[]> {

        const usersRepository = getCustomRepository(UsersRepository);
        const users = await usersRepository.findAll();
        return users;
        
    }
}