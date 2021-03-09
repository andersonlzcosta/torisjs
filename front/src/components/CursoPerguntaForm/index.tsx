import React, { useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useMutation } from '@apollo/client';

import { CREATE_MODULO_PERGUNTA, UPDATE_MODULO_PERGUNTA } from './apolloQueries';

import { Container, Content } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { IPerguntasData } from '../../pages/Curso';
import Select from '../Select';

interface IPerguntaFormProps {
  pergunta?: IPerguntasData;
  order: number;
  moduleId: number;
  reloadModulo: () => void;
  closeForm: () => void;
}

interface ISubmittedData {
  id: string;
  enunciado: string;
  alternativa1: string;
  alternativa2: string;
  alternativa3: string;
  alternativa4: string;
  resposta: "1" | "2" | "3" | "4";
  justificativa: string;
}

const CursoPerguntaForm: React.FC<IPerguntaFormProps> = ({
  pergunta,
  order,
  moduleId,
  reloadModulo,
  closeForm
}) => {
  const formRef = useRef<FormHandles>(null);

  const [CriarPergunta] = useMutation(CREATE_MODULO_PERGUNTA, {
    onCompleted() {
      reloadModulo();
      closeForm();
    }
  });

  const [AtualizarPergunta] = useMutation(UPDATE_MODULO_PERGUNTA, {
    onCompleted() {
      reloadModulo();
      closeForm();
    }
  })

  const handleSubmit = (data: ISubmittedData) => {
    if (!pergunta) {
      let correctOrder;
      order === 0 ? correctOrder = 1 : correctOrder = order
      CriarPergunta({
        variables: {
          moduloId: moduleId,
          ordem: correctOrder,
          enunciado: data.enunciado,
          alternativa1: data.alternativa1,
          alternativa2: data.alternativa2,
          alternativa3: data.alternativa3,
          alternativa4: data.alternativa4,
          resposta: Number(data.resposta),
          justificativa: data.justificativa
        }
      });
    } else {
      AtualizarPergunta({
        variables: {
          perguntaId: pergunta.id,
          moduloId: moduleId,
          ordem: pergunta.ordem,
          enunciado: data.enunciado,
          alternativa1: data.alternativa1,
          alternativa2: data.alternativa2,
          alternativa3: data.alternativa3,
          alternativa4: data.alternativa4,
          resposta: Number(data.resposta),
          justificativa: data.justificativa
        }
      });
    }
  }

  return (
    <Container>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={pergunta}>
          <div className="full-width">
            <label>enunciado</label>
            <Input name="enunciado" className="alt line-bottom" />
          </div>

          <div className="full-width">
            <label>escolha 1</label>
            <Input name="alternativa1" className="alt line-bottom" />
          </div>

          <div className="full-width">
            <label>escolha 2</label>
            <Input name="alternativa2" className="alt line-bottom" />
          </div>

          <div className="full-width">
            <label>escolha 3</label>
            <Input name="alternativa3" className="alt line-bottom" />
          </div>

          <div className="full-width">
            <label>escolha 4</label>
            <Input name="alternativa4" className="alt line-bottom" />
          </div>

          <div className="full-width">
            <label>qual é a resposta certa?</label>
            <Select name="resposta" options={[
              { value: "1", label: "1" },
              { value: "2", label: "2" },
              { value: "3", label: "3" },
              { value: "4", label: "4" },
            ]} />
          </div>

          <div className="full-width">
            <label>justificativa</label>
            <Input name="justificativa" className="alt line-bottom" />
          </div>

          <Input name="id" type="hidden" className="alt" />

          <Button type="submit">salvar pergunta</Button>
        </Form>
      </Content>
    </Container>
  );
}

export default CursoPerguntaForm;