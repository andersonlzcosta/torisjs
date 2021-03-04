import { gql } from '@apollo/client';

export const CREATE_CURSO = gql`
mutation CriarCurso(
  $nome: String!
  $descricao: String!
){
  criarCurso(options: {
    nome: $nome
    descricao: $descricao
  }){
    curso{
      id
      nome
      descricao
    }
  }
}
`;

export const DELETAR_CURSO = gql`
mutation DeletarCurso($id: Float!){
  deletarCurso(id: $id)
}
`;

export const UPDATE_CURSO = gql`
mutation AtualizarCurso(
  $cursoId: Float!
  $nome: String!
  $descricao: String!
){
  atualizarCurso(options: {
    cursoId: $cursoId
    nome: $nome
    descricao: $descricao
  }){
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
