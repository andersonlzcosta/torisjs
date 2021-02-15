import { gql } from '@apollo/client';

export const GET_ABRIGOS = gql`
{
  verAbrigos{
    id,
    nome,
    endereco
  }
}
`;