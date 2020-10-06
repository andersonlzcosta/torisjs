import User from '../models/User';

class UsersRepository {
    private users: User[];

    constructor() {
        this.users = [];
    }

    public all(): User[] {
        return this.users;
    }
    //public findByNome(nome: string): User | null {
      //  const findUser = this.users.find(user => isEqual(nome, profissao),);
        
        //return findUser || null;
    //}

    public create(nome: string, profissao: string): User {
        const user = new User(nome, profissao);

        this.users.push(user);

        return user;
    }

}

export default UsersRepository;