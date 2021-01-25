import { Resolver, Query, Mutation, Field, ObjectType, Arg, InputType } from "type-graphql";
import User from '../../typeorm/entities/User';
import CreateUserService from '../../../services/CreateUserService';
import UpdateUserService from '../../../services/UpdateUserService';
import DeleteUserService from '../../../services/DeleteUserService';
import UsersRepository from "../../typeorm/repositories/UsersRepository";
import { getCustomRepository } from "typeorm";
import { container } from "tsyringe";

import { CreateUserInput } from "./CreateUserInput";
import { UpdateUserInput } from "./UpdateUserInput";

// Não identifiquei um similar desse user response
@ObjectType()
class UserResponse {  
    @Field(() => User, { nullable: true })
    user?: User;

    // @Field(() => AppError, { nullable: true })
    // error?: AppError;
}

@Resolver()
export class UserResolver {

    @Mutation(() => UserResponse)
    async registrar(
        @Arg("options") options: CreateUserInput
      ): Promise<UserResponse> {

        const createUser = container.resolve(CreateUserService);
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
 
    @Query(() => UserResponse)
    async verUsuario(
        @Arg("id") id: string
    ): Promise<UserResponse> {

        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findById(id);
        return { user };
        
    }
 
    @Query(() => [User])
    async verUsuarios(): Promise<User[]> {

        const usersRepository = getCustomRepository(UsersRepository);
        const users = await usersRepository.findAll();
        return users;
        
    }
}