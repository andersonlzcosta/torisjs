import { gql } from '@apollo/client';

export const CREATE_AULA = gql`
mutation CriarAula(
  $ordem: Float
  $nome: String
  $descricao: String
  $video_url: String
  $duracao: String
  $moduloId: Float
){
  criarAula(options:{
    ordem: $ordem
    nome: $nome
    descricao: $descricao
    video_url: $video_url
    duracao: $duracao
    moduloId: $moduloId
  }){
    aula{
      id
      nome
      ordem
      descricao
      video_url
      duracao
    }
  }
}
`;

export const UPDATE_AULA = gql`
mutation AtualizarAula(
  $aulaId: Float!
  $ordem: Float
  $nome: String
  $descricao: String
  $video_url: String
  $duracao: String
  $moduloId: Float
){
  atualizarAula(options: {
    aulaId: $aulaId
    ordem: $ordem
    nome: $nome
    descricao: $descricao
    video_url: $video_url
    duracao: $duracao
    moduloId: $moduloId
  }){
    aula{
      id
      ordem
      nome
      descricao
      video_url
      duracao
    }
  }
}
`;