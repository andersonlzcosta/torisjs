import { gql } from "@apollo/client";

export const VER_USUARIO = gql`
query VerUsuario($id: Float!){
  verUsuario(id: $id){
    user{
      id
      nome
      email
      emailAlternativo
      nascimento
      cargo
      telefone1
      telefone2
      profissao
      abrigo{
        id
        nome
      }
    }
  }
}
`;