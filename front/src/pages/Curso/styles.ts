import styled, { css } from 'styled-components';
import { DefaultBackground } from '../../styles/DefaultBackground';
import { DefaultContainer } from '../../styles/DefaultContainer';

interface IAulaContainerProps {
  isEditingAula: boolean;
}

export const Container = styled.div`
  ${DefaultContainer}
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;

  @media(max-width: 1400px){
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
`;

export const AulasContainer = styled.div<IAulaContainerProps>`
  ${DefaultBackground}
  max-width: 500px;
  margin: 75px 0 0 50px;
  position: relative;
  min-height: 300px;

  > div:last-child{
    display: none;
  }

  ${props => props.isEditingAula && css`
    > label, > button, > div{
      display:none;
    }

    div:last-child{
      display: flex;
    }
  `}

  label{
    width: 100%;
    font-weight: 900;
    font-size: 13px;
    margin-bottom: 4px;
  }

  button.alt{
    width: auto;
    text-align: center;
    font-weight: 200;
    font-size: 14px;
    background: #D6E9FA;
    color: #002F67;
    border-radius: 30px;
    padding: 8px 15px;
    margin: 0px auto 15px 0px;
    transition: background .4s;
    box-shadow: none;
    letter-spacing: 1px;

    &:hover{
      background: #bcdfff;
    }
  }

  @media(max-width: 1400px){
    margin: 40px 0 0 0px;
  }
`;

export const ListaAulas = styled.div`
  width: 100%;
`;

export const Aula = styled.div`
  flex-direction: row;
  justify-content: center;
  width: 100%;

  button{
    background: none;
    border-radius: 0px;
    text-align: left;
    padding: 0;
    font-size: 17px;
    width: 100%;
    box-shadow: none;
    letter-spacing: 1px;

    &:hover{
      background: none;
    }

    &:last-child{
      width:24px;
      svg{
        stroke: #dd4c37;
      }
    }
  }
`;
