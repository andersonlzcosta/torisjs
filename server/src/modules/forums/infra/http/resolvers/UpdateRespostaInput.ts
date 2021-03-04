import { InputType, Field } from "type-graphql";

@InputType()
export class AtualizarRespostaInput {
    @Field({ nullable: true })
    respostaId: number;
    @Field({ nullable: true })
    corpo?: string;
    @Field({ nullable: true })
    perguntaId?: number;
}