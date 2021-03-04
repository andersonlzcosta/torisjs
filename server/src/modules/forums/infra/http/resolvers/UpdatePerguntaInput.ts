import { InputType, Field } from "type-graphql";

@InputType()
export class AtualizarForumPerguntaInput {
    @Field({ nullable: true })
    perguntaId: number;
    @Field({ nullable: true })
    titulo?: string;
    @Field({ nullable: true })
    corpo?: string;
    @Field({ nullable: true })
    foiResolvido?: boolean;
}