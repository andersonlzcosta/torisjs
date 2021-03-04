import { gql } from '@apollo/client';

export const CRIAR_MODULO = gql`
mutation CriarModulo(
  $nome: String!
  $cursoId: Float!
){
  criarModulo(options: {
    nome: $nome
    cursoId: $cursoId
  }){
    modulo{
      id
      nome
    }
  }
}
`;

export const UPDATE_MODULO = gql`
mutation AtualizaModulo(
  $moduloId: Float!
  $nome: String!
  $cursoId: Float!
){
  atualizarModulo(options: {
    moduloId: $moduloId
    nome: $nome
    cursoId: $cursoId
  }){
    modulo{
      id
      nome
    }
  }
}
`;

