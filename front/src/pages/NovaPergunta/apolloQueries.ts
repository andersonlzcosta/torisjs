import { gql } from '@apollo/client';

export const CREATE_PERGUNTA = gql`
mutation createPergunta($titulo: String!, $corpo: String!){
  criarForumPergunta(options:{
    titulo: $titulo
    corpo: $corpo
    foiResolvido: false
  }){
    pergunta{
      id,
      titulo,
      corpo,
      foiResolvido
    }
  }
}`;