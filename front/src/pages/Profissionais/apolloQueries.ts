import { gql } from "@apollo/client";

export const GET_USERS = gql`
{
  verUsuarios{
    id,
    nome,
    email,
    profissao
  }
}
`;

export const CRIAR_USUARIO = gql`
mutation Register(
  $email: String!
  $pass: String!
  $nome: String
  $emailAlt: String
  $nascimento: DateTime
  $cargo: String
  $tel1: String
  $tel2: String
  $profissao: String
  $abrigoId: String
){
  registrar(options:{
    email: $email
    password: $pass
    nome: $nome
    emailAlternativo: $emailAlt
    nascimento: $nascimento
    cargo: $cargo
    telefone1: $tel1
    telefone2: $tel2
    profissao: $profissao
    abrigoId: $abrigoId
  }){
    user{
      id
    }
  }
}
`;

export const ATUALIZAR_USUARIO = gql`
mutation Update(
  $userId: String!
  $email: String!
  $pass: String!
  $nome: String
  $emailAlt: String
  $nascimento: DateTime
  $cargo: String
  $tel1: String
  $tel2: String
  $profissao: String
  $abrigoId: String
){
  updateUsuario(options:{
    userId: $userId
    email: $email
    password: $pass
    nome: $nome
    emailAlternativo: $emailAlt
    nascimento: $nascimento
    cargo: $cargo
    telefone1: $tel1
    telefone2: $tel2
    profissao: $profissao
    abrigoId: $abrigoId
  }){
    user{
      id
    }
  }
}
`;

export const DELETAR_USUARIO = gql`
  mutation Delete($id: String!){
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