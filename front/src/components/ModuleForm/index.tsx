import React, { useRef } from 'react';

import { Container, Content } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Form } from '@unform/web';

import { FormHandles } from '@unform/core';

interface IModuloData {
  nome: string;
  id: number;
}

interface IModuleFormProps {
  modulo?: IModuloData;
  addModuleToCurso?: (moduleName: string) => void;
  updateModule?: (moduleId: number, moduleName: string) => void;
}

interface IFormData {
  nome: string;
  id?: string;
}

const ModuleForm: React.FC<IModuleFormProps> = ({ modulo, addModuleToCurso, updateModule }) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = (data: IFormData) => {
    if (data.id) {
      const moduleId = parseInt(data.id);
      updateModule && updateModule(moduleId, data.nome);
    } else {
      addModuleToCurso && addModuleToCurso(data.nome);
    }
  }

  return (
    <Container>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={modulo}>
          <div className="full-width">
            <label>nome do módulo</label>
            <Input name="nome" className="alt" />
          </div>

          <Input name="id" type="hidden" />

          <Button type="submit">salvar módulo</Button>
        </Form>
      </Content>
    </Container>
  );
}

export default ModuleForm;