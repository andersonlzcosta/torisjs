import { InputType, Field } from "type-graphql";

@InputType()
export class CriarNotificacaoInput {

    @Field()
    conteudo: string;
    @Field()
    arquivada: boolean;
    @Field()
    tipo: string;
    @Field()
    userId: number;
    
}