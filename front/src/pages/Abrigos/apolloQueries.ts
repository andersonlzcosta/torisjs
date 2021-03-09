import { gql } from '@apollo/client';

export const GET_ABRIGOS = gql`
{
  verAbrigos{
    id,
    nome,
    endereco
  }
}
`;

export const SEARCH_ABRIGOS = gql`
query ProcurarAbrigos(
  $nome: String!
){
  procurarAbrigos(
    nome: $nome
  ){
    id,
    nome,
    endereco
  }
}
`;