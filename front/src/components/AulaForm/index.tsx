import React, { useEffect, useRef, useState } from 'react';

import { Container, Content } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Form } from '@unform/web';

import { FormHandles } from '@unform/core';

export interface IAulasData {
  id: number;
  nome: string;
  video_url: string;
}

interface IAulaFormProps {
  aula?: IAulasData;
  updateAula: (aula: IAulasData) => void;
}

const AulaForm: React.FC<IAulaFormProps> = ({ aula, updateAula }) => {
  const [childAula, setChildAula] = useState<IAulasData>();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = (data: IAulasData) => {
    updateAula(data);
  }

  useEffect(() => {
    setChildAula(aula);
  }, [aula]);

  return (
    <Container>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={aula}>
          <div className="full-width">
            <label>nome da aula</label>
            <Input name="nome" containerStyle={{ border: 'none', borderRadius: 0, width: '100%' }} />
          </div>

          <div className="full-width">
            <label>url do vídeo no youtube</label>
            <Input name="video_url" containerStyle={{ border: 'none', borderRadius: 0, width: '100%' }} />
          </div>

          <Button type="submit">salvar aula</Button>
        </Form>
      </Content>
    </Container>
  );
}

export default AulaForm;