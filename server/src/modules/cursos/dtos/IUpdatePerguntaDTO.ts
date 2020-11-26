export default interface IUpdateAulaDTO {
    ordem?: number;
    enunciado?: string;
    alternativa1?: string;
    alternativa2?: string;
    alternativa3?: string;
    alternativa4?: string;
    resposta?: number;
    justificativa?: string;
    moduloId?: string;
}