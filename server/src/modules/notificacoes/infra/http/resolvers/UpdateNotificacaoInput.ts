import { InputType, Field } from "type-graphql";

@InputType()
export class AtualizarNotificacaoInput {
    
    @Field()
    notificacaoId: number;
    @Field({ nullable: true })
    conteudo?: string;
    @Field({ nullable: true })
    arquivada?: boolean;
    @Field({ nullable: true })
    tipo?: string;
    @Field({ nullable: true })
    userId?: number;
    
}