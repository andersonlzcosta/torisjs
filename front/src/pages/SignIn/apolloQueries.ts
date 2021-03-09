import { gql } from '@apollo/client';

export const LOGIN = gql`
query IniciarSessao(
  $senha: String!
  $email: String!
){
  iniciarSessao(
    senha: $senha
    email: $email
  ){
    token
    user{
      id
    }
  }
}
`;