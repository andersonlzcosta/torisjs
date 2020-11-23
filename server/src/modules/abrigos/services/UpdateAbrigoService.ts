import { getCustomRepository } from "typeorm";
import Abrigo from "../infra/typeorm/entities/Abrigo";
import AbrigosRepository from "../infra/typeorm/repositories/AbrigosRepository";
// import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface Request {
    abrigoId?: string;
    nome: string;
    endereco: string;
    classificacao: string;
    capacidade: string;
    faixaEtaria: string;
}

class UpdateAbrigoService {
    public async execute({ abrigoId, nome, endereco, classificacao, capacidade, faixaEtaria }: Request): Promise<Abrigo | undefined> {

        const abrigosRepository = getCustomRepository(AbrigosRepository);
        return abrigosRepository.update( abrigoId, { nome, endereco, classificacao, capacidade, faixaEtaria });
    
    }
}

export default UpdateAbrigoService;