import { InputType, Field } from "type-graphql";

@InputType()
export class CriarForumCategoriaInput {
    @Field({ nullable: true })
    nome: string;
}