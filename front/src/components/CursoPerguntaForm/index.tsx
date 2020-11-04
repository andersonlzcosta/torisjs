import React, { useRef } from 'react';

import { Container, Content } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Form } from '@unform/web';

import { FormHandles } from '@unform/core';
import { IPerguntasData } from '../../pages/Curso';
import Select from '../Select';

interface IPerguntaFormProps {
  pergunta?: IPerguntasData;
  updatePergunta: (pergunta: IPerguntasData) => void;
}

interface ISubmittedData {
  id: string;
  enunciado: string;
  escolha_1: string;
  escolha_2: string;
  escolha_3: string;
  escolha_4: string;
  resposta_certa: "1" | "2" | "3" | "4";
  justificativa: string;
}

const CursoPerguntaForm: React.FC<IPerguntaFormProps> = ({ pergunta, updatePergunta }) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = (data: ISubmittedData) => {
    updatePergunta({
      id: parseInt(data.id),
      enunciado: data.enunciado,
      escolha_1: data.escolha_1,
      escolha_2: data.escolha_2,
      escolha_3: data.escolha_3,
      escolha_4: data.escolha_4,
      resposta_certa: data.resposta_certa,
      justificativa: data.justificativa
    });
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
            <Input name="escolha_1" className="alt line-bottom" />
          </div>

          <div className="full-width">
            <label>escolha 2</label>
            <Input name="escolha_2" className="alt line-bottom" />
          </div>

          <div className="full-width">
            <label>escolha 3</label>
            <Input name="escolha_3" className="alt line-bottom" />
          </div>

          <div className="full-width">
            <label>escolha 4</label>
            <Input name="escolha_4" className="alt line-bottom" />
          </div>

          <div className="full-width">
            <label>qual é a resposta certa?</label>
            <Select name="resposta_certa" />
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