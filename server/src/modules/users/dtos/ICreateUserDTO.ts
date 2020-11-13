//  É uma boa ideia separar o abrigoID em outro DTO
// interface ICreateUserAbrigoDTO {
//     id: string;
// }

export default interface ICreateUserDTO {
    nome: string;
    email: string;
    idade: string;
    profissao: string;
    password: string;
    abrigoId: string;
}