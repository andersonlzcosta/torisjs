import { gql } from '@apollo/client';

export const VER_CURSOS = gql`
query VerCursos{
  verCursos{
    id
    nome
    descricao
    modulos{
      id
      nome
    }
  }
}
`;