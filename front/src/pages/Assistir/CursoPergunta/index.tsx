import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import api from '../../../services/api';

import Navbar from '../../../components/Navbar';
import NavbarDesktop from '../../../components/NavbarDesktop';
import TopMenu from '../../../components/TopMenu';

import { Container, PerguntaContainer } from './styles';
import { Form } from '@unform/web';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

interface IRouteParams {
  id: string;
}

interface IPergunta {
  id: number;
  enunciado: string;
  escolha_1: string;
  escolha_2: string;
  escolha_3: string;
  escolha_4: string;
  resposta_certa: number;
  justificativa: string;
}

const CursoPergunta: React.FC = () => {
  const { id } = useParams<IRouteParams>();
  const [pergunta, setPergunta] = useState<IPergunta>();
  const [selectedAnswer, setSelectedAnswer] = useState<number>();
  const [showJustificativa, setShowJustificativa] = useState(false);
  const [message, setMessage] = useState<string>();
  const { goBack } = useHistory();

  const handleSubmit = useCallback(() => {
    if (pergunta && selectedAnswer) {
      if (selectedAnswer === pergunta.resposta_certa) {
        setMessage('resposta certa!');
      } else {
        setMessage('resposta errada :(');
      }
    }
    setShowJustificativa(true);
  }, [selectedAnswer, pergunta]);

  const handleSelectAnswer = useCallback((event) => {
    setSelectedAnswer(event.target.value);
  }, []);

  useEffect(() => {
    api.get(`/cursoperguntas/${id}`).then(response => {
      setPergunta(response.data);
    });
  }, []);

  return (
    <Container>
      <TopMenu />

      {pergunta && (
        <PerguntaContainer>
          <button className="voltar" onClick={goBack}>Voltar</button>
          <h1>pergunta</h1>
          <p>{pergunta.enunciado}</p>

          <h2>selecione uma opção</h2>
          <Form onSubmit={handleSubmit} onChange={handleSelectAnswer}>
            <div>
              <Input type="radio" name="escolha_1" inputName="resposta" value="1" />
              <label>{pergunta.escolha_1}</label>
            </div>
            <div>
              <Input type="radio" name="escolha_2" inputName="resposta" value="2" />
              <label>{pergunta.escolha_2}</label>
            </div>

            <div>
              <Input type="radio" name="escolha_3" inputName="resposta" value="3" />
              <label>{pergunta.escolha_3}</label>
            </div>

            <div>
              <Input type="radio" name="escolha_4" inputName="resposta" value="4" />
              <label>{pergunta.escolha_4}</label>
            </div>

            {!showJustificativa && (
              <Button type="submit">enviar resposta</Button>
            )}
          </Form>

          <aside>
            {message && (
              <p>{message}</p>
            )}

            {showJustificativa && (
              <p>{pergunta.justificativa}</p>
            )}
          </aside>

          <h2>Próxima etapa</h2>
          <button className="proxima">clique para assistir a próxima aula / pergunta</button>
        </PerguntaContainer>
      )}

      <Navbar />
      <NavbarDesktop />
    </Container>
  );
}

export default CursoPergunta;