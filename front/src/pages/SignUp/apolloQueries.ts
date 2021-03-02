import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser(
    $nome: String
    $email: String!
    $password: String!
  ) {
    registrar(options: {
      nome: $nome
      email: $email
      password: $password
    }){
      user{
        id
        email
        nome
      }
    }
  }
`;