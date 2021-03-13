import { Credencial } from "../infra/typeorm/entities/User";

export default interface ICreateUserDTO {
    email: string;
    password: string;
    nome?: string;
    credencial?: Credencial;
    emailAlternativo?: string;
    nascimento?: Date;
    cargo?: string;
    telefone1?: string;
    telefone2?: string;
    profissao?: string;
    abrigoId?: number;
}