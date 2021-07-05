import { Resolver, Query, Mutation, Field, ObjectType, Arg } from "type-graphql";
import User from '../../typeorm/entities/User';

import CreateUserService from '../../../services/CreateUserService';
import UpdateUserService from '../../../services/UpdateUserService';
import DeleteUserService from '../../../services/DeleteUserService';
import AddUserToAbrigoService from "@modules/users/services/AddUserToAbrigoService";

import UsersRepository from "../../typeorm/repositories/UsersRepository";
import { getCustomRepository } from "typeorm";
import { container } from "tsyringe";

import { CreateUserInput } from "./CreateUserInput";
import { UpdateUserInput } from "./UpdateUserInput";

import MailerTransporter from "@config/mailer";
import RecoveryUserService from "@modules/users/services/RecoveryUserService";
import LoginUserService from "@modules/users/services/LoginUserService";

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

        await MailerTransporter.sendMail({
            to: options.email,
            subject: 'Conta criada com sucesso',
            text: 'Lorem ipsum dolor'
        });

        return { user };
    }
 
    @Mutation(() => UserResponse)
    async login(
        @Arg("email") email: string,
        @Arg("password") password : string
    ): Promise<UserResponse> {
        const loginUser = container.resolve(LoginUserService);
        const user = await loginUser.execute({email, password});
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

    @Mutation(() => UserResponse)
    async recoverPassword(
        @Arg("email") email : string
    ) : Promise<UserResponse> {
        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findByEmail(email);

        if (!user) {
            throw new Error('User not found.');
        }

        let recoveryCode = "";
        const recoveryCodeLength = 6;
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;

        for (let i = 0; i < recoveryCodeLength; i++) {
            recoveryCode += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        const updateUser = new UpdateUserService();
        const updatedUser = await updateUser.execute({
            userId: user.id,
            recoveryCode,
        })

        await MailerTransporter.sendMail({
            to: email,
            subject: 'Código de recuperação - Rede Abrigo',
            text: recoveryCode
        })

        return { user: updatedUser };
    }

    @Mutation(() => UserResponse)
    async changePassword(
        @Arg("recoveryCode") recoveryCode : string,
        @Arg("email") email : string,
        @Arg("password") password : string,
    ) : Promise<UserResponse> {
        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findByEmail(email);

        if (!user) {
            throw new Error('User not found');
        }

        if (user.recoveryCode !== recoveryCode) {
            throw new Error('Recovery code mismatch');
        }

        const updateUser = container.resolve(RecoveryUserService);
        const updatedUser = await updateUser.execute({
            userId: user.id,
            password
        })

        return {
            user: updatedUser
        };
    }

    @Mutation(() => Boolean)
    async deletarUsuario(
        @Arg("id") id: number
    ): Promise<boolean> {
       
        const deleteUser = new DeleteUserService();
        await deleteUser.execute( { id } );
        return true;
    }
 
    @Query(() => UserResponse)
    async verUsuario(
        @Arg("id") id: number
    ): Promise<UserResponse> {

        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findById(id);
        return { user };
        
    }
 
    @Query(() => [User])
    async procurarUsuarios(
        @Arg("nome") nome: string
    ): Promise<User[]> {

        const usersRepository = getCustomRepository(UsersRepository);
        const users = await usersRepository.findByName(nome);
        return users;
        
    }
 
    @Query(() => [User])
    async verUsuarios(): Promise<User[]> {

        const usersRepository = getCustomRepository(UsersRepository);
        const users = await usersRepository.findAll();
        return users;
        
    }

    @Mutation(() => UserResponse)
    async adicionarUsuarioAoAbrigo(
        @Arg("userId") userId: number,
        @Arg("abrigoId") abrigoId: number
    ): Promise<UserResponse> {
       
        const adicionarUsuarioAoAbrigo = container.resolve(AddUserToAbrigoService);
        const user = await adicionarUsuarioAoAbrigo.execute( { userId, abrigoId } );
        return { user };
    }
    
}