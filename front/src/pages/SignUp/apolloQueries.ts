import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser(
    $nome: String
    $email: String!
    $pass: String!
  ) {
    registrar(options: {
      nome: $nome
      email: $email
      password: $pass
    }){
      user{
        id
        email
        nome
      }
    }
  }
`;