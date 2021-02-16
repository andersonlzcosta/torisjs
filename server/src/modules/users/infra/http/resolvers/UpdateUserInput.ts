import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateUserInput {

    @Field()
    userId: string;
    @Field({ nullable: true })
    old_password?: string;
    @Field({ nullable: true })
    password?: string;
    @Field({ nullable: true })
    nome?: string;
    @Field({ nullable: true })
    emailAlternativo?: string;
    @Field({ nullable: true })
    nascimento?: Date;
    @Field({ nullable: true })
    cargo?: string;
    @Field({ nullable: true })
    telefone1?: string;
    @Field({ nullable: true })
    telefone2?: string;
    @Field({ nullable: true })
    profissao?: string;
    @Field({ nullable: true })
    email?: string;
    @Field({ nullable: true })
    abrigoId?: string;
    
}