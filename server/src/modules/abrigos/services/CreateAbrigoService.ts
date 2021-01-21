import { getCustomRepository } from "typeorm";
import Abrigo from "../infra/typeorm/entities/Abrigo";
import AbrigosRepository from "../infra/typeorm/repositories/AbrigosRepository";

interface Request {
    nome: string;
    telefone1: string;
    telefone2: string;
    email1: string;
    email2: string;
    endereco: string;
    bairro: string;
    cidade: string;
    estado: string;
    classificacao: string;
    capacidade: string;
    faixaEtaria: string;
    lgbt: boolean;
    genero: string;
    pcd: boolean;
    observacao: string;
}

class CreateAbrigoService {
    public async execute({ nome, telefone1, telefone2, email1, email2, endereco, bairro, cidade, estado, classificacao, capacidade, faixaEtaria, lgbt, genero, pcd, observacao }: Request): Promise<Abrigo> {
        const abrigosRepository = getCustomRepository(AbrigosRepository);

        const abrigo = abrigosRepository.create({
            nome,
            telefone1,
            telefone2,
            email1,
            email2,
            endereco,
            bairro,
            cidade,
            estado,
            classificacao,
            capacidade,
            faixaEtaria,
            lgbt,
            genero,
            pcd,
            observacao
        });

        return abrigo;
    }
}

export default CreateAbrigoService;