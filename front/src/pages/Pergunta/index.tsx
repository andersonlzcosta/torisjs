import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import api from '../../services/api';

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
  title: string;
  body: string;
  nomeUsuario: string;
  data: string;
  isResolved: boolean;
  respostas: IRespostas[];
}

const Pergunta: React.FC = () => {
  const { id } = useParams<IRouteParams>();
  const [pergunta, setPergunta] = useState<IPerguntaData>();
  const [isLoading, setIsLoading] = useState(false);
  const [novaPergunta, setNovaPergunta] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const history = useHistory();

  const handleSubmitResposta = useCallback((data, { reset }) => {
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
    const novaPergunta: IPerguntaData = {
      id: Math.floor(Math.random() * Math.floor(1000)),
      body: data.pergunta,
      data: '13/10/2020',
      isResolved: false,
      nomeUsuario: 'Renan',
      title: data.title,
      respostas: []
    }
    api.post('/perguntas', novaPergunta);
    setPergunta(novaPergunta);
    setNovaPergunta(false);
    reset();
  }, []);

  const handleDeletePergunta = (perguntaId: number) => {
    api.delete(`/perguntas/${perguntaId}`);
    history.push('/forum');
  }

  useEffect(() => {
    if (id === 'nova') {
      setNovaPergunta(true);
    } else if (id) {
      api.get(`/perguntas/${id}`).then(response => {
        setPergunta(response.data);
      });
    }
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
            <h2>{pergunta.title}</h2>
            <h3>por {pergunta.nomeUsuario} no dia {pergunta.data}</h3>
            <Content>
              {pergunta.body}
            </Content>

            <button className="delete" onClick={() => handleDeletePergunta(pergunta.id)}>deletar pergunta<FiMinusCircle size={18} /></button>
          </PerguntaContainer>

          {pergunta.respostas && pergunta.respostas.length > 0 && <h2>Respostas</h2>}
          {pergunta.respostas && pergunta.respostas.map(resposta => (
            <div key={resposta.id}>
              <h3>{resposta.nomeUsuario} no dia {resposta.data} respondeu:</h3>
              <Content key={resposta.id}>
                {resposta.body}
                {/* <button className="delete" onClick={() => handleDeleteResposta(resposta.id)}><FiMinusCircle size={24} /></button> */}
                <>
                  <Button className="delete" onClick={() => setIsPopupOpen(!isPopupOpen)} loading={isLoading}><FiMinusCircle size={24} /></Button>
                  <Popup isVisible={isPopupOpen} onCancel={() => setIsPopupOpen(!isPopupOpen)} onFulfill={() => handleDeleteResposta(resposta.id)} >
                    Tem certeza que deseja deletar este abrigo?
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