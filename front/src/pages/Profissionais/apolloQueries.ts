import { gql } from "@apollo/client";

export const GET_USERS = gql`
{
  verUsuarios{
    id,
    nome,
    profissao,
  }
}
`;

export const CRIAR_USUARIO = gql`
mutation Register(
  $email: String!
  $password: String!
  $nome: String
  $emailAlternativo: String
  $nascimento: DateTime
  $cargo: String
  $telefone1: String
  $telefone2: String
  $profissao: String
  $abrigoId: Float
){
  registrar(options:{
    email: $email
    password: $password
    nome: $nome
    emailAlternativo: $emailAlternativo
    nascimento: $nascimento
    cargo: $cargo
    telefone1: $telefone1
    telefone2: $telefone2
    profissao: $profissao
    abrigoId: $abrigoId
  }){
    user{
      id
      nome
      email
      emailAlternativo
      nascimento
      cargo
      telefone1
      telefone2
      profissao
      abrigo{
        id
        nome
      }
    }
  }
}
`;

export const ATUALIZAR_USUARIO = gql`
mutation Update(
  $userId: Float!
  $email: String!
  $nome: String
  $emailAlternativo: String
  $nascimento: DateTime
  $cargo: String
  $telefone1: String
  $telefone2: String
  $profissao: String
  $abrigoId: Float
){
  updateUsuario(options:{
    userId: $userId
    email: $email
    nome: $nome
    emailAlternativo: $emailAlternativo
    nascimento: $nascimento
    cargo: $cargo
    telefone1: $telefone1
    telefone2: $telefone2
    profissao: $profissao
    abrigoId: $abrigoId
  }){
    user{
      id
      nome
      email
      emailAlternativo
      nascimento
      cargo
      telefone1
      telefone2
      profissao
      abrigo{
        id
        nome
      }
    }
  }
}
`;

export const DELETAR_USUARIO = gql`
  mutation Delete($id: Float!){
    deletarUsuario(id: $id)
  }
`;

export const GET_ABRIGOS = gql`
{
  verAbrigos{
    id,
    nome
  }
}
`;