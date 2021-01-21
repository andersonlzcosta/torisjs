export default interface IUpdateUserDTO {
    nome?: string;
    email?: string;
    emailAlternativo?: string;
    nascimento?: Date;
    cargo?: string;
    telefone1?: string;
    telefone2?: string;
    profissao?: string;
    old_password?: string;
    password?: string;
    abrigoId?: string;
}