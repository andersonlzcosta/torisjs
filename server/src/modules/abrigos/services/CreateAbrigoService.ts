import { getCustomRepository } from "typeorm";
import Abrigo from "../infra/typeorm/entities/Abrigo";
import AbrigosRepository from "../infra/typeorm/repositories/AbrigosRepository";

interface Request {
    nome: string;
    endereco: string;
    classificacao: string;
    capacidade: string;
    faixaEtaria: string;
}

class CreateAbrigoService {
    public async execute({ nome, endereco, classificacao, capacidade, faixaEtaria }: Request): Promise<Abrigo> {
        const abrigosRepository = getCustomRepository(AbrigosRepository);

        const abrigo = abrigosRepository.create({
            nome,
            endereco,
            classificacao,
            capacidade,
            faixaEtaria
        });

        return abrigo;
    }
}

export default CreateAbrigoService;