import { Resolver, Query, Mutation, Field, ObjectType, Arg, InputType } from "type-graphql";
import User from '../../typeorm/entities/User';
import CreateUserService from '../../../services/CreateUserService';
import UsersRepository from "../../typeorm/repositories/UsersRepository";
import { getCustomRepository } from "typeorm";

// Tlvz um DTO
@InputType()
export class UsernamePasswordInput {
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
    async register(
        @Arg("options") options: UsernamePasswordInput
      ): Promise<UserResponse> {

        const createUser = new CreateUserService();

        const user = await createUser.execute(options);

        return { user };
      }
 
    @Mutation(() => UserResponse)
    async login(
        @Arg("email") email: string
    ): Promise<UserResponse> {
        // AuthenticateUserService.ts
        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findByEmail(email);;
        return { user };
    }
    // ShowProfileService.ts


    // @Query(() => [User])
    // async users(): Promise<User[]> {
    //     const usersRepository = getCustomRepository(UsersRepository);
    //     const users = await usersRepository.findAll();
    //     return users;
    // }

    // @Mutation(() => [User])
    // async updateUser()
    // ResetPasswordService.ts
    // UpdateUserAvatarService.ts
    // UpdateProfileService.ts

    // @Mutation(() => Boolean)
    // async deleteUser()

    @Query(() => String)
    helloUser() {
        return "I say goodbye... Hello Hello!";
    }
}