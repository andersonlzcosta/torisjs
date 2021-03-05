import { gql } from '@apollo/client';

export const CREATE_MODULO_PERGUNTA = gql`
mutation CriarPergunta(
  $moduloId: Float
  $ordem: Float
  $enunciado: String
  $alternativa1: String
  $alternativa2: String
  $alternativa3: String
  $alternativa4: String
  $resposta: Float
  $justificativa: String
){
  criarModuloPergunta(options:{
    moduloId: $moduloId
    ordem: $ordem
    enunciado: $enunciado
    alternativa1: $alternativa1
    alternativa2: $alternativa2
    alternativa3: $alternativa3
    alternativa4: $alternativa4
    resposta: $resposta
    justificativa: $justificativa
  }){
    pergunta{
      id
      ordem
      enunciado
      alternativa1
      alternativa2
      alternativa3
      alternativa4
      resposta
      justificativa
    }
  }
}
`;

export const UPDATE_MODULO_PERGUNTA = gql`
mutation AtualizarPergunta(
  $perguntaId: Float!
  $moduloId: Float
  $ordem: Float
  $enunciado: String
  $alternativa1: String
  $alternativa2: String
  $alternativa3: String
  $alternativa4: String
  $resposta: Float
  $justificativa: String
){
  atualizarModuloPergunta(options:{
    perguntaId: $perguntaId
    moduloId: $moduloId
    ordem: $ordem
    enunciado: $enunciado
    alternativa1: $alternativa1
    alternativa2: $alternativa2
    alternativa3: $alternativa3
    alternativa4: $alternativa4
    resposta: $resposta
    justificativa: $justificativa
  }){
    pergunta{
      id
      ordem
      enunciado
      alternativa1
      alternativa2
      alternativa3
      alternativa4
      resposta
      justificativa
    }
  }
}
`;