import { InputType, Field } from "type-graphql";

@InputType()
export class CreateUserInput {

    @Field()
    email: string;
    @Field()
    password: string;
    @Field()
    nome?: string;
    @Field()
    idade?: string;
    @Field()
    profissao?: string;
    @Field()
    abrigoId?: string;
}