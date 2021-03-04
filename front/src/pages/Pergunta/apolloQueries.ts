import { gql } from '@apollo/client';


export const GET_PERGUNTA_BY_ID = gql`
query getPerguntaById($id: String!){
  verForumPergunta(id: $id){
    pergunta{
      id,
      titulo,
      corpo,
      foiResolvido,
      createdAt,
      respostas{
        id,
        corpo,
        createdAt
      }
    }
  }
}`;

export const DELETE_PERGUNTA_BY_ID = gql`
mutation deletarPerguntaById($id: String!){
  deletarForumPergunta(id: $id)
}`;

export const CREATE_RESPOSTA = gql`
mutation createResposta($corpo: String!, $perguntaId: Float!){
  criarForumResposta(options: {
    corpo: $corpo
    perguntaId: $perguntaId
  }){
    resposta{
      id
      corpo
    }
  }
}`;

export const DELETE_RESPOSTA_BY_ID = gql`
mutation deletarResposta($id: String!){
  deletarForumResposta(id: $id)
}`;