import { Credencial } from "../infra/typeorm/entities/User";

export default interface IUpdateUserDTO {
    nome?: string;
    credencial?: Credencial;
    email?: string;
    emailAlternativo?: string;
    nascimento?: Date;
    cargo?: string;
    telefone1?: string;
    telefone2?: string;
    profissao?: string;
    old_password?: string;
    password?: string;
    abrigoId?: number;
}