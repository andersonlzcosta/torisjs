import { InputType, Field } from "type-graphql";

@InputType()
export class CriarRespostaInput {
    @Field({ nullable: true })
    corpo: string;
    @Field({ nullable: true })
    perguntaId: number;
}