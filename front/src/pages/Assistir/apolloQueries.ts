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

export const VER_MODULO_POR_CURSO = gql`
query VerModulosPorCurso($cursoId: Float!){
  verModulosPorCurso(cursoId: $cursoId){
    id
    nome
    aulas{
      id
      ordem
      nome
      descricao
      video_url
      duracao
    }
    perguntas{
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

export const VER_AULA = gql`
query VerAula($id: Float!){
  verAula(id: $id){
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

export const VER_PERGUNTA = gql`
query VerModuloPergunta($id: Float!){
  verModuloPergunta(id: $id){
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