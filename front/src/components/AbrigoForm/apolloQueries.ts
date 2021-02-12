import { gql } from "@apollo/client";

export const GET_ABRIGOS = gql`
{
  verAbrigos{
    id,
    nome,
    endereco
  }
}
`;

export const GET_ABRIGO_BY_ID = gql`
query getAbrigoById($id: String!) {
  verAbrigo(id: $id){
    abrigo{
      id
      nome
      telefone1
      telefone2
      email1
      email2
      endereco
      bairro
      cidade
      estado
      classificacao
      capacidade
      faixaEtaria
      lgbt
      genero
      pcd
      observacao
      profissionais{
        id
        nome
      }
    }
  }
}
`;

export const UPDATE_ABRIGO = gql`
  mutation AtualizarAbrigo(
      $id: String!
      $nome: String
      $telefone1: String
      $telefone2: String
      $email1: String
      $email2: String
      $endereco: String
      $bairro: String
      $cidade: String
      $estado: String
      $classificacao: String
      $capacidade: String
      $faixaEtaria: String
      $lgbt: Boolean
      $genero: String
      $pcd: Boolean
      $observacao: String
    ) {
    atualizarAbrigo(options: {
      abrigoId: $id
      nome: $nome
      telefone1: $telefone1
      telefone2: $telefone2
      email1: $email1
      email2: $email2
      endereco: $endereco
      bairro: $bairro
      cidade: $cidade
      estado: $estado
      classificacao: $classificacao
      capacidade: $capacidade
      faixaEtaria: $faixaEtaria
      lgbt: $lgbt
      genero: $genero
      pcd: $pcd
      observacao: $observacao
    }){
      abrigo{
        id
      }
    }
  }
`;

export const CRIAR_ABRIGO = gql`
  mutation CriarAbrigo(
    $nome: String!
    $tel1: String!
    $tel2: String!
    $email1: String!
    $email2: String!
    $endereco: String!
    $bairro: String!
    $cidade: String!
    $estado: String!
    $classificacao: String!
    $capacidade: String!
    $faixaEtaria: String!
    $lgbt: Boolean!
    $genero: String!
    $pcd: Boolean!
    $observacao: String!
  ){
    criarAbrigo(options: {
      nome: $nome,
      telefone1: $tel1,
      telefone2: $tel2,
      email1: $email1,
      email2: $email2,
      endereco: $endereco,
      bairro: $bairro,
      cidade: $cidade,
      estado: $estado,
      classificacao: $classificacao,
      capacidade: $capacidade,
      faixaEtaria: $faixaEtaria,
      lgbt: $lgbt,
      genero: $genero,
      pcd: $pcd,
      observacao: $observacao,
    }){
      abrigo{
        id
        nome
      }
    }
  }
`;

export const DELETAR_ABRIGO = gql`
  mutation DeletarAbrigo($id: String!){
    deletarAbrigo(id: $id)
  }
`;