import { gql } from '@apollo/client';

export const GET_FORUM_PERGUNTAS = gql`
query{
  verForumPerguntas{
    id,
    titulo,
    foiResolvido,
    createdAt
  }
}`;