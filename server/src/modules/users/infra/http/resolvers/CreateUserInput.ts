import { InputType, Field } from "type-graphql";

@InputType()
export class CreateUserInput {

    @Field()
    email: string;
    @Field()
    password: string;
    @Field({ nullable: true })
    nome?: string;
    @Field({ nullable: true })
    idade?: string;
    @Field({ nullable: true })
    profissao?: string;
    @Field({ nullable: true })
    abrigoId?: string;
}