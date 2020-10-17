import { uuid } from 'uuidv4';

class User {
    id: string;

    nome: string;

    idade: string;

    profissao: string;

    constructor({ nome, idade, profissao }: Omit<User, 'id'>) {
        this.id = uuid();
        this.nome = nome;
        this.idade = idade;
        this.profissao = profissao;
    }
}

export default User;