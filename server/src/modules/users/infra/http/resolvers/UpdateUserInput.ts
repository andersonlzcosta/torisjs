import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateUserInput {
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