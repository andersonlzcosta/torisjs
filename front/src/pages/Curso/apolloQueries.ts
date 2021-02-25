import { gql } from '@apollo/client';

export const VER_CURSO = gql`
query VerCurso($id: String!){
  verCurso(id: $id){
    curso{
      id
      nome
      descricao
      modulos{
        id
        nome
      }
    }
  }
}
`;

export const DELETE_MODULO = gql`
mutation DeletarModulo(
  $id: String!
){
  deletarModulo(id: $id)
}
`;