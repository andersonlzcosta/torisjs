import React, { useEffect, useRef, useState } from 'react';

import { Container, Content } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Form } from '@unform/web';

import { FormHandles } from '@unform/core';
import { IAulasData } from '../../pages/Curso';

interface IAulaFormProps {
  aula?: IAulasData;
  updateAula: (aula: IAulasData) => void;
}

interface ISubmittedData {
  id: string;
  nome: string;
  video_url: string;
  duracao: number;
}

const AulaForm: React.FC<IAulaFormProps> = ({ aula, updateAula }) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = (data: ISubmittedData) => {
    updateAula({
      id: parseInt(data.id),
      nome: data.nome,
      video_url: data.video_url,
      duracao: data.duracao
    });
  }

  return (
    <Container>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={aula}>
          <div className="full-width">
            <label>nome da aula</label>
            <Input name="nome" className="alt" />
          </div>

          <div className="full-width">
            <label>url do vídeo no youtube</label>
            <Input name="video_url" className="alt" />
          </div>

          <div className="full-width">
            <label>duração em minutos</label>
            <Input name="duracao" type="number" className="alt" />
          </div>

          <Input name="id" type="hidden" />

          <Button type="submit">salvar aula</Button>
        </Form>
      </Content>
    </Container>
  );
}

export default AulaForm;