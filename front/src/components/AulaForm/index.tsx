import React, { useState, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { Form } from '@unform/web';

import { CREATE_AULA, UPDATE_AULA } from './apolloQueries';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { FormHandles } from '@unform/core';
import { IAulasData } from '../../pages/Curso';
import { Container, Content } from './styles';
import Popup from '../Popup';

interface IAulaFormProps {
  aula?: IAulasData;
  order: number;
  moduleId: number;
  reloadModulo: () => void;
  closeForm: () => void;
}

interface ISubmittedData {
  nome: string;
  video_url: string;
  descricao: string;
  duracao: string;
}

const AulaForm: React.FC<IAulaFormProps> = ({ aula, order, moduleId, reloadModulo, closeForm }) => {
  const formRef = useRef<FormHandles>(null);
  const [isErrorFormVisible, setIsErrorFormVisible] = useState(false);

  const [CriarAula] = useMutation(CREATE_AULA, {
    onCompleted() {
      reloadModulo();
      closeForm();
    }
  });

  const [AtualizarAula] = useMutation(UPDATE_AULA, {
    onCompleted() {
      reloadModulo();
      closeForm();
    }
  });

  const handleSubmit = (data: ISubmittedData) => {
    if (!data.nome) {
      setIsErrorFormVisible(true);
    } else if (!data.descricao) {
      setIsErrorFormVisible(true);
    } else if (!data.video_url) {
      setIsErrorFormVisible(true);
    } else {
      if (!aula) {
        let correctOrder;
        order === 0 ? correctOrder = 1 : correctOrder = order
        CriarAula({
          variables: {
            ordem: correctOrder,
            nome: data.nome,
            descricao: data.descricao,
            video_url: data.video_url,
            duracao: data.duracao,
            moduloId: moduleId
          }
        })
      } else {
        AtualizarAula({
          variables: {
            aulaId: aula.id,
            ordem: aula.ordem,
            nome: data.nome,
            descricao: data.descricao,
            video_url: data.video_url,
            duracao: data.duracao,
            moduloId: moduleId
          }
        });
      }
    }
  }

  return (
    <Container>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={aula}>
          <div className="full-width">
            <label>nome da aula</label>
            <Input name="nome" className="alt line-bottom" />
          </div>

          <div className="full-width">
            <label>descrição</label>
            <Input name="descricao" className="alt line-bottom" />
          </div>

          <div className="full-width">
            <label>url do vídeo no youtube</label>
            <Input name="video_url" className="alt line-bottom" />
          </div>

          <div className="full-width">
            <label>duração em minutos</label>
            <Input name="duracao" type="number" className="alt line-bottom" />
          </div>

          <Input name="id" type="hidden" className="alt" />

          <Button type="submit">salvar aula</Button>
        </Form>
      </Content>
      <Popup
        isVisible={isErrorFormVisible}
        onCancel={() => setIsErrorFormVisible(false)}
        onFulfill={() => setIsErrorFormVisible(false)}>
        Por favor, preencha todos os campos do formulário
      </Popup>
    </Container>
  );
}

export default AulaForm;