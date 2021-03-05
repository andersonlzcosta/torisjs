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
      descricao
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

export const DELETE_MODULO_PERGUNTA = gql`
mutation DeletarPergunta(
  $id: Float!
){
  deletarModuloPergunta(id: $id)
}
`;

export const ATUALIZAR_ORDEM_AULA = gql`
mutation AtualizarOrdemAula(
  $aulaId: Float!
  $ordem: Float
  $moduloId: Float
){
  atualizarAula(options: {
    aulaId: $aulaId
    ordem: $ordem
    moduloId: $moduloId
  }){
    aula{
      id
      ordem
      nome
      descricao
      video_url
      duracao
    }
  }
}
`;

export const ATUALIZAR_ORDEM_PERGUNTA = gql`
mutation AtualizarOrdemPergunta(
  $perguntaId: Float!
  $moduloId: Float
  $ordem: Float
){
  atualizarModuloPergunta(options:{
    perguntaId: $perguntaId
    moduloId: $moduloId
    ordem: $ordem
  }){
    pergunta{
      id
      ordem
      enunciado
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