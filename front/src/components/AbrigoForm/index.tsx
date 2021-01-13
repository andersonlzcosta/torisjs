import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAbrigo } from '../../hooks/AbrigoHook';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, AbrigoUserContainer, AbrigoUser } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Popup from '../../components/Popup';

import Perfil from '../../images/perfil.jpg';
import { FiMinusCircle } from 'react-icons/fi';
import { gql, useMutation, useQuery } from '@apollo/client';

interface IAbrigoUsers {
  id: number;
  nome: string;
}

export interface IAbrigosData {
  id: string;
  nome: string;
  endereco: string;
  classificacao: string;
  capacidade: string;
  faixaEtaria: string;
  profissionais: IAbrigoUsers[];
}

interface IAbrigoFormProps {
  id?: string;
  headingText?: string;
  updateAbrigoList?: () => void;
}

interface IAbrigoResponse {
  abrigo: {
    id: string;
    nome: string;
    endereco: string;
    classificacao: string;
    capacidade: string;
    faixaEtaria: string;
    profissionais: IAbrigoUsers[];
  }
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

const GET_ABRIGO_BY_ID = gql`
query getAbrigoById($id: String!) {
  verAbrigo(id: $id){
    abrigo{
      id
      nome
      endereco
      classificacao
      capacidade
      faixaEtaria
      profissionais{
        id
        nome
      }
    }
  }
}
`;

const UPDATE_ABRIGO = gql`
  mutation AtualizarAbrigo(
      $id: String!
      $nome: String!
      $endereco: String!
      $classificacao: String!
      $capacidade: String!
      $faixaEtaria: String!
    ) {
    atualizarAbrigo(options: {
      abrigoId: $id
      nome: $nome
      endereco: $endereco
      classificacao: $classificacao
      capacidade: $capacidade
      faixaEtaria: $faixaEtaria
    }){
      abrigo{
        id
        nome
        endereco
        classificacao
        capacidade
        faixaEtaria
        profissionais{
          id
        }
      }
    }
  }
`;

const CRIAR_ABRIGO = gql`
  mutation CriarAbrigo(
      $nome: String!
      $endereco: String!
      $classificacao: String!
      $capacidade: String!
      $faixaEtaria: String!
    ) {
    criarAbrigo(options: {
      nome: $nome
      endereco: $endereco
      classificacao: $classificacao
      capacidade: $capacidade
      faixaEtaria: $faixaEtaria
    }){
      abrigo{
        id
        nome
        endereco
        classificacao
        capacidade
        faixaEtaria
      }
    }
  }
`;

const AbrigoForm: React.FC<IAbrigoFormProps> = ({ id, headingText, updateAbrigoList }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [heading, setHeading] = useState<string>();
  const [abrigoId, setAbrigoId] = useState<string>();
  const [abrigo, setAbrigo] = useState<IAbrigosData>();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isProfissionalPopupOpen, setIsProfissionalPopupOpen] = useState(false);

  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { setHookAbrigo } = useAbrigo();
  const { addToast } = useToast();

  useQuery<IVerAbrigoQuery>(GET_ABRIGO_BY_ID, {
    variables: { id: id },
    onCompleted(data) { data && setAbrigo(data.verAbrigo.abrigo) }
  });

  const [AtualizarAbrigo] = useMutation<IAtualizarAbrigoMutation>(UPDATE_ABRIGO, {
    onCompleted(data) {
      addToast({
        title: "Abrigo atualizado!",
        message: "você já pode visualizar o abrigo na lista",
        type: "success"
      });
      updateAbrigoList && updateAbrigoList();
      history.push('/abrigos/todos');
    },
    onError() {
      console.log('error');
      addToast({
        title: "Erro ao atualizar",
        message: "não foi possível conectar com o banco de dados",
        type: "error"
      });
    }
  });

  const [CriarAbrigo] = useMutation<ICriarAbrigoMutation>(CRIAR_ABRIGO, {
    onCompleted(data) {
      if (data) {
        setAbrigo(data.criarAbrigo.abrigo);
        addToast({
          type: 'success',
          title: 'Abrigo Criado!',
          message: 'este abrigo já está visível na lista.',
        });
        updateAbrigoList && updateAbrigoList();
        history.push('/abrigos/todos');
      }
    }
  });

  const handleSubmit = useCallback(async (data: IAbrigosData) => {
    try {
      setIsLoading(true);
      if (abrigo) {
        AtualizarAbrigo({
          variables: {
            id: abrigo.id,
            nome: data.nome,
            endereco: data.endereco,
            classificacao: data.classificacao,
            capacidade: data.capacidade,
            faixaEtaria: data.faixaEtaria
          }
        });
      } else {
        CriarAbrigo({
          variables: {
            nome: data.nome,
            endereco: data.endereco,
            classificacao: data.classificacao,
            capacidade: data.capacidade,
            faixaEtaria: data.faixaEtaria
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
      await api.delete(`/abrigos/${abrigoId}`);
      setIsLoading(false);
      addToast({
        type: 'success',
        title: 'Abrigo Deletado!',
        message: 'você será redirecionado para a listagem.',
      });
      setIsPopupOpen(!isPopupOpen);
      history.push('/abrigos/todos');
    } catch (err) {
      console.log(err);
      addToast({
        type: 'error',
        title: 'Erro ao deletar',
        message: 'tente novamente ou entre em contato com suporte.',
      });
      setIsPopupOpen(!isPopupOpen);
    }
  }, [abrigoId, setIsLoading, history]);

  const handleRemoveProfissional = (profissionalId: number) => {
    if (abrigo) {
      const profissionais = abrigo.profissionais.filter(
        profissional => profissional.id !== profissionalId
      );

      try {
        api.put(`/abrigos/${abrigo.id}`, { ...abrigo, profissionais });
        setAbrigo({ ...abrigo, profissionais });
        addToast({
          type: 'success',
          title: 'Profissional Removido!',
          message: 'informações do abrigo foram atualizadas',
        });
        setIsProfissionalPopupOpen(!isProfissionalPopupOpen);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao remover!',
          message: 'tente novamente ou entre em contato com suporte.',
        });
        setIsProfissionalPopupOpen(!isProfissionalPopupOpen);
      }
    }
  }

  const handleAddProfissional = () => {
    if (abrigo) {
      setHookAbrigo(abrigo);
      history.push('/profissionais/todos');
    }
  }

  useEffect(() => {
    headingText ? setHeading(headingText) : setHeading('criar novo abrigo')
    id ? setAbrigoId(id) : id
  }, []);

  return (
    <Container>
      <h1>{heading}</h1>
      <Content>

        <label>profissionais</label>
        <button className="alt" onClick={handleAddProfissional}>adicionar profissional</button>
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
            <select name="classificacao">
              <option value="publico">Público</option>
              <option value="privado">Privado</option>
            </select>
            {/* <Input name="classificacao" className="alt" /> */}
          </div>

          <div className="half-width">
            <label>Gênero</label>
            <select name="genero">
              <option value="ambos">Ambos</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
            </select>
          </div>

          <div className="half-width">
            <label>faixa etária</label>
            <select name="faixaEtaria">
              <option value="adulto">a partir de 18</option>
              <option value="crianca">até 18</option>
            </select>
            {/* <Input className="bigger alt" name="faixaEtaria" /> */}
          </div>

          <div className="half-width">
            <label>capacidade (entre 0 e 40)</label>
            <Input type="number" className="bigger alt number" name="capacidade" />
          </div>

          <div className="checkbox">
            <Input type="checkbox" className="checkbox" name="LGBTQI" />
            <label>aceita população LGBTQI+</label>
          </div>

          <div className="checkbox">
            <Input type="checkbox" className="checkbox" name="deficientes" />
            <label>Exclusivamente para crianças e adolescentes com deficiência</label>
          </div>

          <div className="full-width">
            <label>Observações Gerais</label>
            <textarea className="alt" name="observacoes"></textarea>
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