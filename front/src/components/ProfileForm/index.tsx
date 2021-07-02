import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useAbrigo } from '../../hooks/AbrigoHook';
import { useMutation, useQuery } from '@apollo/client';

import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content } from './styles';
import Input from '../../components/Input';
// import InputMasked from '../../components/InputMasked';
import Button from '../../components/Button';
import DatePicker from '../Datepicker';
import Popup from '../Popup';
import { useToast } from '../../hooks/toast';
import Select from '../Select';
import { GET_USERS, CRIAR_USUARIO, ATUALIZAR_USUARIO, DELETAR_USUARIO, GET_ABRIGOS } from '../../pages/Profissionais/apolloQueries';
import { credencial } from '../../hooks/auth';

export interface IUserData {
  id: number;
  email: string;
  nome: string;
  password: string;
  oldPassword: string;
  emailAlternativo: string;
  nascimento: any;
  cargo: string;
  telefone1: string;
  telefone2: string;
  profissao: string;
  abrigoId: string;
}

interface IProfileFormProps {
  inheritedUser?: IUserData;
  headingText?: string;
  updateProfissionaisList?: () => void;
}

interface IAbrigosData {
  id: string;
  nome: string;
}

interface IAbrigosQuery {
  verAbrigos: IAbrigosData[];
}

const ProfileForm: React.FC<IProfileFormProps> = ({ inheritedUser, headingText, updateProfissionaisList }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [heading, setHeading] = useState<string>();
  const [user, setUser] = useState<IUserData>();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [abrigos, setAbrigos] = useState<IAbrigosData[]>();

  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { hookAbrigo } = useAbrigo();
  const { addToast } = useToast();

  const [Register] = useMutation(CRIAR_USUARIO, {
    onCompleted() {
      addToast({
        title: "Profissional criado com sucesso!",
        message: "você será redirecionado para todos",
        type: "success"
      });
      updateProfissionaisList && updateProfissionaisList();
      history.push('/profissionais/todos');
    }, onError() {
      addToast({
        title: "Erro ao criar",
        message: "tente novamente",
        type: "error"
      });
    }
  });

  const [Update] = useMutation(ATUALIZAR_USUARIO, {
    refetchQueries: [{ query: GET_USERS }],
    onCompleted() {
      addToast({
        title: "Profissional atualizado com sucesso!",
        message: "você será redirecionado para todos",
        type: "success"
      });

      history.push('/profissionais/todos');
    }, onError() {
      addToast({
        title: "Ocorreu um erro",
        message: "tente novamente",
        type: "error"
      });
    }
  });

  const [Delete] = useMutation(DELETAR_USUARIO, {
    refetchQueries: [{
      query: GET_USERS
    }],
    onCompleted() {
      addToast({ title: "usuário deletado", type: "success" });
      updateProfissionaisList && updateProfissionaisList();
      history.push('/profissionais/todos');
    },
    onError() { addToast({ title: "usuário deletado", type: "error" }) },
  });

  useQuery<IAbrigosQuery>(GET_ABRIGOS, {
    onCompleted(data) {
      if (data) {
        setAbrigos([{ id: "", nome: "--selecione um abrigo--" }, ...data.verAbrigos]);
      }
    }
  });

  const handleSubmit = useCallback(async (formData: any) => {
    setIsLoading(true);
    try {
      if (!formRef.current) {
        throw new Error('formRef invalid');
      }
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        nome: Yup.string().required('O nome é obrigatório'),
        email: Yup.string().required('E-mail é obrigatório').email('Use um e-mail válido'),
        emailAlternativo: Yup.string().email('Use um email válido'),
        password: Yup.string().required('a senha é obrigatoria'),
        cargo: Yup.string().required('O cargo é obrigatório'),
        profissao: Yup.string().required('A profissão é obrigatória'),
        abrigoId: Yup.string(),
        nascimento: Yup.date().required('Esta data é obrigatória'),
      });

      await schema.validate(formData, {
        abortEarly: false
      });

      let parsedData = {} as any;
      Object.keys(formData).forEach(key => {
        if (formData[key] !== '') {
          if (key === 'abrigoId') {
            parsedData[key] = Number(formData[key]);
            return
          }
          if (formData[key] === 'Admin') {
            parsedData[key] = credencial.Admin
            return
          }
          if (formData[key] === 'AbrigoAdmin') {
            parsedData[key] = credencial.AbrigoAdmin
            return
          }
          parsedData[key] = formData[key];
        }
      });

      if (user) {
        parsedData.userId = user.id;
        await Update({
          variables: parsedData
        });
      } else {
        await Register({
          variables: parsedData
        });
      }
      setIsLoading(false);
    } catch (err) {
      const errors = getValidationErrors(err);
      if (!formRef.current) {
        throw new Error('formRef invalid');
      }
      formRef.current.setErrors(errors);
      setIsLoading(false);
      return
    }
  }, [user]);

  const handleDelete = useCallback(async () => {
    setIsLoading(true);
    if (user) {
      Delete({
        variables: { id: user.id }
      });
    }
    setIsPopupOpen(!isPopupOpen);
    setIsLoading(false);
  }, [setIsLoading, user]);

  useEffect(() => {
    hookAbrigo.id ? setHeading('visualizar perfil') : setHeading(headingText)

    if (inheritedUser) {
      setUser(inheritedUser);
    }
  }, [inheritedUser]);

  return (
    <Container>
      <h1>{heading}</h1>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={inheritedUser}>
          <div className="full-width">
            <label>nome</label>
            <Input name="nome" className="alt" />
          </div>

          <div className="full-width">
            <label>tipo de usuário</label>
            <Select name="credencial" options={[
              { value: 'Aluno', label: 'Profissional' },
              // { value: 'AbrigoAdmin', label: 'Administrador de Abrigo' },
              { value: 'Admin', label: 'Administrador da Plataforma' },
            ]} />
          </div>

          <div className="half-width">
            <label>data de nascimento</label>
            <DatePicker name="nascimento" />
          </div>

          <div className="half-width">
            <label>profissão</label>
            <Input className="alt" name="profissao" />
          </div>

          <div className="half-width">
            <label>email</label>
            <Input className="alt" name="email" />
          </div>

          <div className="half-width">
            <label>telefone</label>
            {/* <InputMasked mask="(99) 99999-9999" className="alt" name="telefone1" /> */}
            <Input className="alt" name="telefone1" type="number" />
          </div>

          <div className="half-width">
            <label>cargo</label>
            <Select name="cargo" options={[
              { value: 'diretor', label: 'Diretor' },
              { value: 'assessor', label: 'Assessor' },
              { value: 'assistente-social', label: 'Assistente Social' },
              { value: 'psicologo', label: 'Psicologo' },
              { value: 'pedagogo', label: 'Pedagogo' },
              { value: 'educador', label: 'Educador' }
            ]} />
          </div>

          {abrigos && (
            <div className="half-width">
              <label>abrigo associado</label>
              <Select name="abrigoId" options={abrigos.map(abrigo => {
                return { value: abrigo.id, label: abrigo.nome }
              })} />
            </div>
          )}

          {user && (
            <>
              <div className="half-width">
                <label>senha antiga</label>
                <Input className="alt" name="old_password" type="password" />
              </div>

              <div className="half-width">
                <label>senha nova</label>
                <Input className="alt" name="password" type="password" />
              </div>
            </>
          )}

          {!user && (
            <div className="half-width">
              <label>senha</label>
              <Input className="alt" name="password" type="password" />
            </div>
          )}


          {!hookAbrigo.id && (
            <Button type="submit" loading={isLoading}>salvar</Button>
          )}
        </Form>

        {user && !hookAbrigo.id && (
          <>
            <Button className="delete" onClick={() => setIsPopupOpen(!isPopupOpen)} loading={isLoading}>deletar perfil</Button>
            <Popup isVisible={isPopupOpen} onCancel={() => setIsPopupOpen(!isPopupOpen)} onFulfill={handleDelete} >
              Tem certeza que deseja deletar este perfil?
            </Popup>
          </>
        )}
      </Content>
    </Container>
  );
}

export default ProfileForm;