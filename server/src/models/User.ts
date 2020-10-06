import { uuid } from 'uuidv4';

class User {
    id: string;

    nome: string;

    idade: string;

    profissao: string;

    constructor(nome: string, idade: string) {
        this.id = uuid();
        this.nome = nome;
        this.idade = idade;
    }
}

export default User;