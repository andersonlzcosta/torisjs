import React, { useCallback, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Form } from '@unform/web';

import { VER_PERGUNTA } from '../apolloQueries';

import Navbar from '../../../components/Navbar';
import NavbarDesktop from '../../../components/NavbarDesktop';
import TopMenu from '../../../components/TopMenu';

import { Container, PerguntaContainer } from './styles';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

interface IRouteParams {
  id: string;
}

interface IPergunta {
  verModuloPergunta: {
    pergunta: {
      id: number;
      ordem: number;
      enunciado: string;
      alternativa1: string;
      alternativa2: string;
      alternativa3: string;
      alternativa4: string;
      resposta: number;
      justificativa: string;
      modulo: {
        id: number;
        nome: string;
        aulas: {
          id: number;
          ordem: number;
        }[]
        perguntas: {
          id: number;
          ordem: number;
        }[]
      }
    }
  }
}

interface IProximaAulaButtonProps {
  ordem: number;
  modulo: {
    aulas: {
      id: number;
      ordem: number;
    }[]
    perguntas: {
      id: number;
      ordem: number;
    }[]
  }
}

interface IAtividade {
  id: number;
  ordem: number;
  type: string;
}

const ProximaAulaButton: React.FC<IProximaAulaButtonProps> = ({ordem, modulo}) => {
  const atividades : IAtividade[] = [];
  modulo.aulas.map(aula => {
    atividades.push({
      ...aula,
      type: 'aula'
    })
  })
  modulo.perguntas.map(pergunta => {
    atividades.push({
      ...pergunta,
      type: 'curso-pergunta'
    })
  })
  atividades.sort((a, b) => a.ordem - b.ordem)
  const proximaAula = atividades[ordem]

  return (
    proximaAula && (
      <>
        <h2>Próxima etapa</h2>
        <Link to={`/${proximaAula.type}/${proximaAula.id}`}>
          <button className="proxima">clique para assistir a próxima aula / pergunta</button>
        </Link>
      </>
    ) || <></>
  )
}

const CursoPergunta: React.FC = () => {
  const { id } = useParams<IRouteParams>();
  const [selectedAnswer, setSelectedAnswer] = useState<number>(0);
  const [showJustificativa, setShowJustificativa] = useState(false);
  const [message, setMessage] = useState<string>();
  const { goBack } = useHistory();

  const { data: pergunta } = useQuery<IPergunta>(VER_PERGUNTA, {
    variables: { id: Number(id) }
  });

  const handleSubmit = () => {
    if (pergunta) {
      if (Number(selectedAnswer) === pergunta.verModuloPergunta.pergunta.resposta) {
        setMessage('resposta certa!');
      } else {
        setMessage('resposta errada :(');
      }
    }
    setShowJustificativa(true);
  };

  const handleSelectAnswer = (event: any) => {
    setSelectedAnswer(event.target.value);
  };

  return (
    <Container>
      <TopMenu />

      {pergunta && (
        <PerguntaContainer>
          <button className="voltar" onClick={goBack}>Voltar</button>
          <h1>Pergunta</h1>
          <p>{pergunta.verModuloPergunta.pergunta.enunciado}</p>

          <h2>Selecione uma opção</h2>
          <Form onSubmit={handleSubmit} onChange={handleSelectAnswer}>
            {pergunta.verModuloPergunta.pergunta.alternativa1 && (
              <div>
                <Input type="radio" name="alternativa1" inputName="resposta" value="1" />
                <label>{pergunta.verModuloPergunta.pergunta.alternativa1}</label>
              </div>
            )}

            {pergunta.verModuloPergunta.pergunta.alternativa2 && (
              <div>
                <Input type="radio" name="alternativa2" inputName="resposta" value="2" />
                <label>{pergunta.verModuloPergunta.pergunta.alternativa2}</label>
              </div>
            )}

            {pergunta.verModuloPergunta.pergunta.alternativa3 && (
              <div>
                <Input type="radio" name="alternativa3" inputName="resposta" value="3" />
                <label>{pergunta.verModuloPergunta.pergunta.alternativa3}</label>
              </div>
            )}

            {pergunta.verModuloPergunta.pergunta.alternativa4 && (
              <div>
                <Input type="radio" name="alternativa4" inputName="resposta" value="4" />
                <label>{pergunta.verModuloPergunta.pergunta.alternativa4}</label>
              </div>
            )}

            {!showJustificativa && (
              <Button type="submit">enviar resposta</Button>
            )}
          </Form>

          <aside>
            {message && (
              <p>{message}</p>
            )}

            {showJustificativa && (
              <p>{pergunta.verModuloPergunta.pergunta.justificativa}</p>
            )}
          </aside>

          <ProximaAulaButton
            ordem={pergunta.verModuloPergunta.pergunta.ordem}
            modulo={pergunta.verModuloPergunta.pergunta.modulo} />
        </PerguntaContainer>
      )}

      <Navbar />
      <NavbarDesktop />
    </Container>
  );
}

export default CursoPergunta;