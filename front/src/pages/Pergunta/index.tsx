import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { Form } from '@unform/web';
import { FiMinusCircle } from 'react-icons/fi';

import { useToast } from '../../hooks/toast';
import { GET_FORUM_PERGUNTAS } from '../Forum/apolloQueries';
import { GET_PERGUNTA_BY_ID, DELETE_PERGUNTA_BY_ID, CREATE_RESPOSTA, DELETE_RESPOSTA_BY_ID } from './apolloQueries';

import Navbar from '../../components/Navbar';
import NavbarDesktop from '../../components/NavbarDesktop';
import TopMenu from '../../components/TopMenu';

import Button from '../../components/Button';
import Textarea from '../../components/Textarea';
import Popup from '../../components/Popup';

import { Container, ContentContainer, Content, PerguntaContainer } from './styles';

interface IRouteParams {
  id: string;
}

interface IRespostas {
  id: string;
  corpo: string;
  createdAt: string;
}

interface IPerguntaData {
  id: number;
  titulo: string;
  corpo: string;
  nomeUsuario: string;
  createdAt: string;
  foiResolvido: boolean;
  respostas: IRespostas[];
}

interface IVerPerguntaQuery {
  verForumPergunta: {
    pergunta: IPerguntaData;
  };
}


const Pergunta: React.FC = () => {
  const { id } = useParams<IRouteParams>();
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPerguntaPopupOpen, setIsPerguntaPopupOpen] = useState(false);
  const [parsedData, setParsedData] = useState<string>();

  const history = useHistory();
  const { addToast } = useToast();

  const [getPergunta, { data: perguntaQl }] = useLazyQuery<IVerPerguntaQuery>(GET_PERGUNTA_BY_ID, {
    variables: { id: id },
    fetchPolicy: "no-cache",
    onCompleted(data) {
      const date = new Date(Number(data.verForumPergunta.pergunta.createdAt));
      setParsedData(`${date.getDate()}/${date.getMonth() + 1}`);
    }, onError() {
      addToast({
        title: "erro ao carregar pergunta",
        type: "error"
      })
    }
  });

  const [deletarPerguntaById] = useMutation(DELETE_PERGUNTA_BY_ID, {
    refetchQueries: [{ query: GET_FORUM_PERGUNTAS }],
    onCompleted() {
      addToast({
        title: "Pergunta deletada!",
        type: "success"
      });
      history.push('/forum');
    },
    onError() {
      addToast({
        title: "Erro ao deletar",
        message: "não foi possível conectar com o banco de dados",
        type: "error"
      });
    }
  });

  const [createResposta] = useMutation(CREATE_RESPOSTA, {
    onCompleted() {
      addToast({
        title: "Resposta enviada!",
        type: "success"
      });
      getPergunta();
    },
    onError() {
      addToast({
        title: "Erro ao enviar resposta",
        type: "error"
      });
    }
  });

  const [deletarResposta] = useMutation(DELETE_RESPOSTA_BY_ID, {
    onCompleted() {
      addToast({
        title: "Resposta deletada!",
        type: "success"
      });
      getPergunta();
    },
    onError() {
      addToast({
        title: "Erro ao deletar",
        type: "error"
      });
    }
  });

  const handleSubmitResposta = useCallback((data: { resposta: string }) => {
    setIsLoading(true);

    if (!perguntaQl) {
      throw new Error('Pergunta não encontrada');
    }
    console.log(perguntaQl.verForumPergunta.pergunta.id);
    createResposta({
      variables: {
        corpo: data.resposta,
        perguntaId: perguntaQl.verForumPergunta.pergunta.id
      }
    });

    setIsLoading(false);
  }, [perguntaQl]);

  const handleDeleteResposta = (respostaId: string) => {
    deletarResposta({
      variables: {
        id: respostaId
      }
    });
    setIsPopupOpen(false);
  }

  const handleDeletePergunta = (perguntaId: number) => {
    deletarPerguntaById({
      variables: {
        id: perguntaId
      }
    });
  }

  useEffect(() => {
    id && getPergunta()
  }, [id]);

  return (
    <Container>
      <TopMenu />

      {perguntaQl && (
        <ContentContainer>
          <PerguntaContainer>
            <h2>{perguntaQl.verForumPergunta.pergunta.titulo}</h2>
            <h3>por {perguntaQl.verForumPergunta.pergunta.nomeUsuario} no dia {parsedData}</h3>
            <Content>
              {perguntaQl.verForumPergunta.pergunta.corpo}
            </Content>

            <button className="delete" onClick={() => setIsPerguntaPopupOpen(true)}>deletar pergunta<FiMinusCircle size={18} /></button>
            <Popup isVisible={isPerguntaPopupOpen} onCancel={() => setIsPerguntaPopupOpen(false)} onFulfill={() => handleDeletePergunta(perguntaQl.verForumPergunta.pergunta.id)} >
              Tem certeza que deseja deletar esta pergunta?
            </Popup>
          </PerguntaContainer>

          {perguntaQl.verForumPergunta.pergunta.respostas && perguntaQl.verForumPergunta.pergunta.respostas.length > 0 && <h2>Respostas</h2>}
          {perguntaQl.verForumPergunta.pergunta.respostas && perguntaQl.verForumPergunta.pergunta.respostas.map(resposta => (
            <div key={resposta.id}>
              <h3>Feita no dia {resposta.createdAt}:</h3>
              <Content key={resposta.id}>
                {resposta.corpo}
                <>
                  <Button className="delete" onClick={() => setIsPopupOpen(true)} loading={isLoading}><FiMinusCircle size={24} /></Button>
                  <Popup isVisible={isPopupOpen} onCancel={() => setIsPopupOpen(false)} onFulfill={() => handleDeleteResposta(resposta.id)} >
                    Tem certeza que deseja deletar esta resposta?
                  </Popup>
                </>
              </Content>
            </div>
          ))}

          <h2>escreva uma resposta</h2>
          <Content>
            <Form onSubmit={handleSubmitResposta}>
              <Textarea name="resposta"></Textarea>

              <Button type="submit" loading={isLoading}>enviar resposta</Button>
            </Form>
          </Content>
        </ContentContainer>
      )}

      <Navbar />
      <NavbarDesktop />
    </Container>
  );
}

export default Pergunta;