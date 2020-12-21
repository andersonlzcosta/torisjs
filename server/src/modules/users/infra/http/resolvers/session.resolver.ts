import { Resolver, Field, ObjectType, Arg, Query, Ctx } from "type-graphql";
import User from '../../typeorm/entities/User';

// import { MyContext } from "@shared/infra/http/types";
import CreateUserSessionService from "@modules/users/services/CreateUserSessionService";
import { container } from "tsyringe";
// import AppError from "@shared/errors/AppError";

@ObjectType()
class UserSessionResponse {  
    @Field(() => User, { nullable: true })
    user?: User;
    
    @Field(() => String, { nullable: true })
    token?: string;

    // @Field(() => AppError, { nullable: true })
    // error?: AppError;
}

@Resolver()
export class UserSessionResolver {
 
    @Query(() => UserSessionResponse)
    async iniciarSessao(
        @Arg("email") email: string,
        @Arg("senha") password: string,
        // @Ctx() { req }: MyContext
    ): Promise<UserSessionResponse> {

        const createUserSession = container.resolve(CreateUserSessionService);
        const { user, token } = await createUserSession.execute({ email, password });

        return { user, token };

    }

    // @Mutation(() => Boolean)
    // async destruirSessao(
    //     @Arg("id") id: string
    // ): Promise<boolean> {
       
    //     const deleteUser = new DeleteUserService();
    //     await deleteUser.execute( { id } );
    //     return true;
    // }
 
}