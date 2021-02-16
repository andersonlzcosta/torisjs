//  É uma boa ideia separar o abrigoID em outro DTO
// interface ICreateUserAbrigoDTO {
//     id: string;
// }

export default interface ICreateUserDTO {
    email: string;
    password: string;
    nome?: string;
    emailAlternativo?: string;
    nascimento?: Date;
    cargo?: string;
    telefone1?: string;
    telefone2?: string;
    profissao?: string;
    abrigoId?: string;
}