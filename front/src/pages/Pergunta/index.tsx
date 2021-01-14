import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import api from '../../services/api';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useToast } from '../../hooks/toast';

import Navbar from '../../components/Navbar';
import NavbarDesktop from '../../components/NavbarDesktop';
import TopMenu from '../../components/TopMenu';

import { Form } from '@unform/web';
import Textarea from '../../components/Textarea';
import Button from '../../components/Button';

import { Container, ContentContainer, Content, PerguntaContainer } from './styles';
import { FiMinusCircle } from 'react-icons/fi';
import Input from '../../components/Input';
import Popup from '../../components/Popup';

interface IRouteParams {
  id: string;
}

interface IRespostas {
  id: number;
  body: string;
  nomeUsuario: string;
  data: string;
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

const GET_PERGUNTA_BY_ID = gql`
query getPerguntaById($id: String!){
  verForumPergunta(id: $id){
    pergunta{
      id,
      titulo,
      corpo,
      foiResolvido,
      createdAt,
      respostas{
        id,
        corpo,
        createdAt
      }
    }
  }
}`;

const DELETE_PERGUNTA_BY_ID = gql`
mutation deletarPerguntaById($id: String!){
  deletarForumPergunta(id: $id)
}`;

const CREATE_PERGUNTA = gql`
mutation createPergunta($titulo: String!, $corpo: String!){
  criarForumPergunta(options:{
    titulo: $titulo
    corpo: $corpo
    foiResolvido: false
  }){
    pergunta{
      id,
      titulo,
      corpo
    }
  }
}`;

const Pergunta: React.FC = () => {
  const { id } = useParams<IRouteParams>();
  const [pergunta, setPergunta] = useState<IPerguntaData>();
  const [isLoading, setIsLoading] = useState(false);
  const [novaPergunta, setNovaPergunta] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPerguntaPopupOpen, setIsPerguntaPopupOpen] = useState(false);

  const history = useHistory();
  const { addToast } = useToast();

  useQuery<IVerPerguntaQuery>(GET_PERGUNTA_BY_ID, {
    variables: { id: id },
    onCompleted(data) {
      if (data) {
        const date = new Date(Number(data.verForumPergunta.pergunta.createdAt));
        setPergunta({
          ...data.verForumPergunta.pergunta,
          createdAt: `${date.getDate()}/${date.getMonth() + 1}`
        });
      }
    }, onError() {
      setNovaPergunta(true);
    }
  });

  const [deletarPerguntaById] = useMutation(DELETE_PERGUNTA_BY_ID, {
    onCompleted() {
      addToast({
        title: "Pergunta deletada!",
        type: "success"
      });
      history.push('/forum?refetch');
    },
    onError() {
      addToast({
        title: "Erro ao deletar",
        message: "não foi possível conectar com o banco de dados",
        type: "error"
      });
    }
  });

  const [createPergunta] = useMutation(CREATE_PERGUNTA, {
    onCompleted() {
      addToast({
        title: "Pergunta criada com sucesso!",
        type: "success"
      });
      history.push('/forum?refetch');
    },
    onError() {
      addToast({
        title: "Erro ao criar a pergunta",
        message: "não foi possível conectar com o banco de dados",
        type: "error"
      });
    }
  });

  const handleSubmitResposta = useCallback((data, { reset }) => {
    console.log(pergunta);
    setIsLoading(true);
    if (pergunta) {

      let updatedRespostas = pergunta.respostas;
      updatedRespostas.push({
        id: 812,
        body: data.resposta,
        data: '12/10/2020',
        nomeUsuario: 'Usuário'
      });

      const updatedPergunta = {
        ...pergunta,
        respostas: updatedRespostas
      }

      setPergunta(updatedPergunta);
      api.put(`/perguntas/${pergunta.id}`, updatedPergunta);
      setIsLoading(false);
      reset();
    }

  }, [pergunta, setIsLoading]);

  const handleDeleteResposta = (respostaId: number) => {
    if (pergunta) {
      const updatedRespostas = pergunta.respostas.filter(resposta =>
        resposta.id !== respostaId
      );

      const updatedPergunta = {
        ...pergunta,
        respostas: updatedRespostas
      }

      api.put(`/perguntas/${pergunta.id}`, updatedPergunta);
      setPergunta(updatedPergunta);
      setIsPopupOpen(!isPopupOpen);
    }
  }

  const handleSubmitPergunta = useCallback((data, { reset }) => {
    createPergunta({
      variables: {
        titulo: data.title,
        corpo: data.pergunta
      }
    });
    reset();
    history.push('/forum?refetch');
  }, []);

  const handleDeletePergunta = (perguntaId: number) => {
    deletarPerguntaById({
      variables: {
        id: perguntaId
      }
    });
  }

  useEffect(() => {
    // if (id === 'nova') {
    //   setNovaPergunta(true);
    // } else if (id) {
    //   api.get(`/perguntas/${id}`).then(response => {
    //     setPergunta(response.data);
    //   });
    // }
  }, []);

  return (
    <Container>
      <TopMenu />

      {novaPergunta && (
        <ContentContainer>
          <h2>Nova Pergunta</h2>
          <Form onSubmit={handleSubmitPergunta}>
            <Input name="title" placeholder="Título da pergunta" />
            <Textarea name="pergunta"></Textarea>

            <Button type="submit" loading={isLoading}>enviar pergunta</Button>
          </Form>
        </ContentContainer>
      )}

      {pergunta && (
        <ContentContainer>
          <PerguntaContainer>
            <h2>{pergunta.titulo}</h2>
            <h3>por {pergunta.nomeUsuario} no dia {pergunta.createdAt}</h3>
            <Content>
              {pergunta.corpo}
            </Content>

            <button className="delete" onClick={() => setIsPerguntaPopupOpen(true)}>deletar pergunta<FiMinusCircle size={18} /></button>
            <Popup isVisible={isPerguntaPopupOpen} onCancel={() => setIsPerguntaPopupOpen(false)} onFulfill={() => handleDeletePergunta(pergunta.id)} >
              Tem certeza que deseja deletar esta pergunta?
            </Popup>
          </PerguntaContainer>

          {pergunta.respostas && pergunta.respostas.length > 0 && <h2>Respostas</h2>}
          {pergunta.respostas && pergunta.respostas.map(resposta => (
            <div key={resposta.id}>
              <h3>{resposta.nomeUsuario} no dia {resposta.data} respondeu:</h3>
              <Content key={resposta.id}>
                {resposta.body}
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