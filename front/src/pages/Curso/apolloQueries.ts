import { gql } from '@apollo/client';

export const VER_CURSO = gql`
query VerCurso($id: Float!){
  verCurso(id: $id){
    curso{
      id
      nome
      descricao
      modulos{
        id
      }
    }
  }
}
`;

export const DELETE_MODULO = gql`
mutation DeletarModulo(
  $id: Float!
){
  deletarModulo(id: $id)
}
`;

export const VER_MODULO_POR_CURSO = gql`
query VerModulosPorCurso($cursoId: Float!){
  verModulosPorCurso(cursoId: $cursoId){
    id
    nome
    aulas{
      id
      nome
      ordem
      video_url
      duracao
    }
    perguntas{
      id
      enunciado
      ordem
      alternativa1
      alternativa2
      alternativa3
      alternativa4
      resposta
      justificativa
    }
  }
}
`;

export const DELETE_AULA = gql`
mutation DeletarAula(
  $id: Float!
){
  deletarAula(id: $id)
}
`;