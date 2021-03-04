import { inject, injectable } from "tsyringe";
import Abrigo from "../infra/typeorm/entities/Abrigo";
import IAbrigosRepository from "../repositories/IAbrigosRepository";

interface Request {
    abrigoId: number;
    nome?: string;
    telefone1?: string;
    telefone2?: string;
    email1?: string;
    email2?: string;
    endereco?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;
    classificacao?: string;
    capacidade?: string;
    faixaEtaria?: string;
    lgbt?: boolean;
    genero?: string;
    pcd?: boolean;
    observacao?: string;
}

@injectable()
class UpdateAbrigoService {
    constructor(
        @inject('AbrigosRepository')
        private abrigosRepository: IAbrigosRepository
    ) { }

    public async execute({
        abrigoId,
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
    }: Request): Promise<Abrigo | undefined> {
        
        const abrigo = await this.abrigosRepository.findById(abrigoId);
        
        if (abrigo) {
            if (!nome) nome = abrigo.nome;
            if (!telefone1) telefone1 = abrigo.telefone1;
            if (!telefone2) telefone2 = abrigo.telefone2;
            if (!email1) email1 = abrigo.email1;
            if (!email2) email2 = abrigo.email2;
            if (!endereco) endereco = abrigo.endereco;
            if (!bairro) bairro = abrigo.bairro;
            if (!cidade) cidade = abrigo.cidade;
            if (!estado) estado = abrigo.estado;
            if (!classificacao) classificacao = abrigo.classificacao;
            if (!capacidade) capacidade = abrigo.capacidade;
            if (!faixaEtaria) faixaEtaria = abrigo.faixaEtaria;
            if (!lgbt) lgbt = abrigo.lgbt;
            if (!genero) genero = abrigo.genero;
            if (!pcd) pcd = abrigo.pcd;
            if (!observacao) observacao = abrigo.observacao;
        }

        return this.abrigosRepository.update(
            abrigoId, 
            { 
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
            }
        );
    
    }
}

export default UpdateAbrigoService;