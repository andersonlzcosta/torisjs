//  É uma boa ideia separar o abrigoID em outro DTO
// interface ICreateUserAbrigoDTO {
//     id: string;
// }

export default interface ICreateUserDTO {
    email: string;
    password: string;
    nome?: string;
    idade?: string;
    profissao?: string;
    abrigoId?: string;
}