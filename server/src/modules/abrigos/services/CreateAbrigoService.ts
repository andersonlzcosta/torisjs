import { inject, injectable } from "tsyringe";
import Abrigo from "../infra/typeorm/entities/Abrigo";
import IAbrigosRepository from "../repositories/IAbrigosRepository";

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

@injectable()
class CreateAbrigoService {
    constructor(
        @inject('AbrigosRepository')
        private abrigosRepository: IAbrigosRepository
    ) { }
    
    public async execute({
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
     }: Request): Promise<Abrigo> {

        const abrigo = this.abrigosRepository.create({
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