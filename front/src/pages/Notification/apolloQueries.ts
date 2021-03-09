import { gql } from '@apollo/client';

export const CREATE_NOTIFICATION = gql`
mutation CriarNotificacao(
  $conteudo: String!
  $arquivada: Boolean!
  $tipo: String!
  $userId: Float!
){
  criarNotificacao(options: {
    conteudo: $conteudo
    arquivada: $arquivada
    tipo: $tipo
    userId: $userId
  }){
    notificacao{
      id
      conteudo
      arquivada
      tipo
      user{
        id
        nome
      }
    }
  }
}
`;

export const VIEW_NOTIFICATIONS = gql`
query{
  verNotificacoes{
    id
    conteudo
    tipo
    arquivada
    user{
      id
      nome
    }
  }
}
`;