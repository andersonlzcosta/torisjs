import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateNotificacaoInput {
    
    @Field()
    notificacaoId: string;
    @Field({ nullable: true })
    conteudo?: string;
    @Field({ nullable: true })
    arquivada?: boolean;
    @Field({ nullable: true })
    tipo?: string;
    @Field({ nullable: true })
    userId?: string;
    
}