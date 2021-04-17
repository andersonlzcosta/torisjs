import { InputType, Field } from "type-graphql";

@InputType()
export class AtualizarForumCategoriaInput {
    @Field({ nullable: true })
    categoriaId: number;
    @Field({ nullable: true })
    nome?: string;
}