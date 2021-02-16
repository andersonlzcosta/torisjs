import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiMinusCircle } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useMutation, useQuery } from '@apollo/client';
import * as Yup from 'yup';

import { useAbrigo } from '../../hooks/AbrigoHook';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import Perfil from '../../images/perfil.jpg';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Textarea from '../../components/Textarea';
import CheckboxInput from '../../components/CheckboxInput';
import Button from '../../components/Button';
import Popup from '../../components/Popup';

import { Container, Content, AbrigoUserContainer, AbrigoUser } from './styles';
import { GET_ABRIGO_BY_ID, CRIAR_ABRIGO, DELETAR_ABRIGO, UPDATE_ABRIGO, GET_USERS } from './apolloQueries';
import { GET_ABRIGOS } from '../../pages/Abrigos/apolloQueries';

interface IAbrigoUsers {
  id: string;
  nome: string;
}

export interface IAbrigosData {
  id: string;
  nome: string;
  telefone1: string;
  telefone2: string;
  email1: string;
  email2: string;
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  classificacao: string;
  capacidade: string;
  faixaEtaria: string;
  lgbt: boolean;
  genero: string;
  pcd: boolean;
  observacao: string;
  profissionais: IAbrigoUsers[];
}

interface IAbrigoFormProps {
  id?: string;
  headingText?: string;
}

interface IAbrigoResponse {
  abrigo: IAbrigosData;
}

interface IVerAbrigoQuery {
  verAbrigo: IAbrigoResponse;
}

interface IAtualizarAbrigoMutation {
  atualizarAbrigo: IAbrigoResponse;
}

interface ICriarAbrigoMutation {
  criarAbrigo: IAbrigoResponse;
}

interface IProfissionaisData {
  id: string;
  nome: string;
  profissao: string;
}

interface IProfissionaisQuery {
  verUsuarios: IProfissionaisData[];
}

interface ISelectOptions {
  value: string;
  label: string;
}

const AbrigoForm: React.FC<IAbrigoFormProps> = ({ id, headingText }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [heading, setHeading] = useState<string>();
  const [abrigoId, setAbrigoId] = useState<string>();
  const [abrigo, setAbrigo] = useState<IAbrigosData>();
  const [profissionais, setProfissionais] = useState<ISelectOptions[]>();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isProfissionalPopupOpen, setIsProfissionalPopupOpen] = useState(false);

  const formRef = useRef<FormHandles>(null);
  const profissionaisFormRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { setHookAbrigo } = useAbrigo();
  const { addToast } = useToast();

  useQuery<IVerAbrigoQuery>(GET_ABRIGO_BY_ID, {
    variables: { id: id },
    onCompleted(data) {
      setAbrigo(data.verAbrigo.abrigo);
    }
  });

  useQuery<IProfissionaisQuery>(GET_USERS, {
    onCompleted(data) {
      const profissionaisSelect = data.verUsuarios.map(profissional => {
        const options = {
          value: profissional.id,
          label: profissional.nome
        }
        return options;
      });

      profissionaisSelect.unshift({
        value: "null",
        label: "selecionar"
      });
      setProfissionais(profissionaisSelect);
    }
  });

  const [AtualizarAbrigo] = useMutation<IAtualizarAbrigoMutation>(UPDATE_ABRIGO, {
    refetchQueries: [{ query: GET_ABRIGOS }],
    onCompleted() {
      addToast({
        title: "Abrigo atualizado!",
        message: "você já pode visualizar o abrigo na lista",
        type: "success"
      });
      history.push('/abrigos/todos');
    },
    onError(err) {
      console.log(err);
      addToast({
        title: "Erro ao atualizar",
        message: "Tente novamente",
        type: "error"
      });
    }
  });

  const [DeletarAbrigo] = useMutation(DELETAR_ABRIGO, {
    refetchQueries: [{ query: GET_ABRIGOS }],
    onCompleted() {
      addToast({
        title: "Abrigo deletado!",
        type: "success"
      });
      history.push('/abrigos/todos');
    },
    onError() {
      addToast({
        title: "Erro ao deletar",
        message: "não foi possível conectar com o banco de dados",
        type: "error"
      });
    }
  });

  const [CriarAbrigo] = useMutation(CRIAR_ABRIGO, {
    refetchQueries: [{ query: GET_ABRIGOS }],
    onCompleted() {
      addToast({
        type: 'success',
        title: 'Abrigo Criado!',
        message: 'este abrigo já está visível na lista.',
      });
      history.push('/abrigos/todos');
    },
    onError() {
      addToast({
        type: 'error',
        title: 'Ocorreu um erro ao criar o abrigo',
      });
    }
  });

  const handleSubmit = useCallback(async (data: IAbrigosData) => {

    console.log(data);
    try {
      setIsLoading(true);
      if (abrigo) {
        console.log("update");
        AtualizarAbrigo({
          variables: {
            id: abrigo.id,
            nome: data.nome,
            telefone1: data.telefone1,
            telefone2: data.telefone2,
            email1: data.email1,
            email2: data.email2,
            endereco: data.endereco,
            bairro: data.bairro,
            cidade: data.cidade,
            estado: data.estado,
            classificacao: data.classificacao,
            capacidade: data.capacidade,
            faixaEtaria: data.faixaEtaria,
            lgbt: data.lgbt,
            genero: data.genero,
            pcd: data.pcd,
            observacao: data.observacao
          }
        });
      } else {
        console.log('create');
        CriarAbrigo({
          variables: {
            nome: data.nome,
            tel1: data.telefone1,
            tel2: data.telefone2,
            email1: data.email1,
            email2: data.email2,
            endereco: data.endereco,
            bairro: data.bairro,
            cidade: data.cidade,
            estado: data.estado,
            classificacao: data.classificacao,
            capacidade: data.capacidade,
            faixaEtaria: data.faixaEtaria,
            lgbt: data.lgbt,
            genero: data.genero,
            pcd: data.pcd,
            observacao: data.observacao
          }
        });
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      addToast({
        type: 'error',
        title: 'Erro ao cadastrar!',
        message: 'tente novamente ou entre em contato com suporte.',
      });
    }
  }, [abrigo, setIsLoading, setAbrigoId]);

  const handleDelete = useCallback(async () => {
    try {
      setIsLoading(true);
      DeletarAbrigo({
        variables: {
          id: abrigoId
        }
      });
      setIsLoading(false);
      setIsPopupOpen(!isPopupOpen);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao deletar',
        message: 'tente novamente ou entre em contato com suporte.',
      });
      setIsPopupOpen(!isPopupOpen);
    }
  }, [abrigoId, setIsLoading, history]);

  const handleRemoveProfissional = (profissionalId: string) => {
    if (abrigo) {
      // update abrigo ID in user
    }
  }

  const handleAddProfissional = (formData: { profissionais: string; }) => {
    console.log(formData);
    if (formData.profissionais !== "null") {
      //update apenas abrigoId in user
    }
  }

  useEffect(() => {
    headingText ? setHeading(headingText) : setHeading('criar novo abrigo')
    id && setAbrigoId(id)
  }, [id]);

  return (
    <Container>
      <h1>{heading}</h1>
      <Content>
        <Form ref={profissionaisFormRef} onSubmit={handleAddProfissional} className="full-width">
          <div className="full-width">
            <label>profissionais</label>
            {profissionais && (
              <Select name="profissionais" options={profissionais} />
            )}
          </div>
          <button className="alt" type="submit">adicionar profissional</button>
        </Form>

        {abrigo && abrigo.profissionais && abrigo.profissionais.map(profissional => (
          <AbrigoUserContainer key={profissional.id}>
            <AbrigoUser >
              <div>
                <img src={Perfil} />
                <h3>{profissional.nome}</h3>
              </div>
              <button onClick={() => setIsProfissionalPopupOpen(!isProfissionalPopupOpen)}><FiMinusCircle size={24} /></button>
            </AbrigoUser>
            <Popup isVisible={isProfissionalPopupOpen} onCancel={() => setIsProfissionalPopupOpen(!isProfissionalPopupOpen)} onFulfill={() => handleRemoveProfissional(profissional.id)} >
              Tem certeza que deseja remover este profissional?
            </Popup>
          </AbrigoUserContainer>
        ))}

        <Form ref={formRef} onSubmit={handleSubmit} initialData={abrigo}>
          <div className="full-width">
            <label>nome</label>
            <Input name="nome" className="alt" />
          </div>

          <div className="half-width">
            <label>Estado</label>
            <Input name="estado" className="alt" />
          </div>

          <div className="half-width">
            <label>Cidade</label>
            <Input name="cidade" className="alt" />
          </div>

          <div className="half-width">
            <label>bairro</label>
            <Input name="bairro" className="alt" />
          </div>

          <div className="half-width">
            <label>endereço</label>
            <Input name="endereco" className="alt" />
          </div>

          <div className="half-width">
            <label>Telefone 1</label>
            <Input name="telefone1" className="alt" />
          </div>

          <div className="half-width">
            <label>Telefone 2</label>
            <Input name="telefone2" className="alt" />
          </div>

          <div className="half-width">
            <label>Email 1</label>
            <Input name="email1" className="alt" />
          </div>

          <div className="half-width">
            <label>Email 2</label>
            <Input name="email2" className="alt" />
          </div>

          <div className="half-width">
            <label>classificação</label>
            <Select name="classificacao" options={[
              { value: "publico", label: "Público" },
              { value: "privado", label: "Privado" },
            ]} />
          </div>

          <div className="half-width">
            <label>Gênero</label>
            <Select name="genero" options={[
              { value: "ambos", label: "Ambos" },
              { value: "masculino", label: "Masculino" },
              { value: "feminino", label: "Feminino" },
            ]} />
          </div>

          <div className="half-width">
            <label>faixa etária</label>
            <Select name="faixaEtaria" options={[
              { value: "adulto", label: "a partir de 18" },
              { value: "crianca", label: "até 18" },
            ]} />
          </div>

          <div className="half-width">
            <label>capacidade (entre 0 e 40)</label>
            <Input type="number" className="bigger alt number" name="capacidade" />
          </div>

          <CheckboxInput name="lgbt" options={{ id: 'lgbt', value: 'lgbt', label: 'aceita população LGBTQI+' }} />

          <CheckboxInput name="pcd" options={{ id: 'pdc', value: 'pdc', label: 'Exclusivamente para crianças e adolescentes com deficiência' }} />

          <div className="full-width">
            <label>Observações Gerais</label>
            <Textarea className="alt" name="observacao"></Textarea>
          </div>

          <Button type="submit" loading={isLoading}>salvar</Button>
        </Form>

        {abrigo && (
          <>
            <Button className="delete" onClick={() => setIsPopupOpen(!isPopupOpen)} loading={isLoading}>deletar abrigo</Button>
            <Popup isVisible={isPopupOpen} onCancel={() => setIsPopupOpen(!isPopupOpen)} onFulfill={handleDelete} >
              Tem certeza que deseja deletar este abrigo?
            </Popup>
          </>
        )}
      </Content>
    </Container>
  );
}

export default AbrigoForm;