import { InputType, Field } from "type-graphql";

@InputType()
export class AtualizarAbrigoInput {
    
    @Field()
    abrigoId: string;
    @Field({ nullable: true })
    nome?: string;
    @Field({ nullable: true })
    telefone1?: string;
    @Field({ nullable: true })
    telefone2?: string;
    @Field({ nullable: true })
    email1?: string;
    @Field({ nullable: true })
    email2?: string;
    @Field({ nullable: true })
    endereco?: string;
    @Field({ nullable: true })
    bairro?: string;
    @Field({ nullable: true })
    cidade?: string;
    @Field({ nullable: true })
    estado?: string;
    @Field({ nullable: true })
    classificacao?: string;
    @Field({ nullable: true })
    capacidade?: string;
    @Field({ nullable: true })
    faixaEtaria?: string;
    @Field({ nullable: true })
    lgbt?: boolean;
    @Field({ nullable: true })
    genero?: string;
    @Field({ nullable: true })
    pcd?: boolean;
    @Field({ nullable: true })
    observacao?: string;
    
}