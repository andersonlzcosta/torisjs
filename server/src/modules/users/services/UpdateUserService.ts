import { getCustomRepository } from "typeorm";
import User, { Credencial } from "../infra/typeorm/entities/User";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";

interface Request {
    userId: number;
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

class UpdateProfileService {
    public async execute({ userId, nome, credencial, email, emailAlternativo, nascimento, cargo, telefone1, telefone2, profissao, old_password, password, abrigoId }: Request): Promise<User | undefined> {

        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findById(userId);
        if (!user) {
            throw new Error('user not found to update');
        }
        if (!(user.password == old_password)) { password = user.password };

        if (user) {
            if (!nome) nome = user.nome;
            if (!credencial) credencial = user.credencial;
            if (!email) email = user.email;
            if (!emailAlternativo) emailAlternativo = user.emailAlternativo;
            if (!nascimento) nascimento = user.nascimento;
            if (!cargo) cargo = user.cargo;
            if (!telefone1) telefone1 = user.telefone1;
            if (!telefone2) telefone2 = user.telefone2;
            if (!profissao) profissao = user.profissao;
            if (!password) password = user.password;
            if (!abrigoId && user.abrigo) abrigoId = user.abrigo.id;
        }
            
        return usersRepository.update(userId, { nome, credencial, email, emailAlternativo, nascimento, cargo, telefone1, telefone2, profissao, password, abrigoId });

    }
}

export default UpdateProfileService;