import styled, { css } from 'styled-components';
import { DefaultBackground } from '../../styles/DefaultBackground';
import { DefaultContainer } from '../../styles/DefaultContainer';

interface IStatusProps {
  isResolved: boolean;
}

export const Container = styled.div`
  ${DefaultContainer}
`;

export const Content = styled.div`
  max-width: 500px;
  width: 90%;

  div + div{
    margin-top: 15px;
  }
`;

export const PerguntasList = styled.div`
  width: 100%;
`;

export const Pergunta = styled.div`
  ${DefaultBackground}
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  position: relative;
  transition: background-color .3s;
  padding: 0px 30px 0 0;

  &:hover{
    background-color: #fff9e5;
  }

  h3{
    margin: 0 0 5px;
    font-weight: 400;
    font-size: 17px;
  }

  p{
    margin: 0;
  }

  a{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-decoration: none;
    padding: 20px 30px 20px 40px;
  }

  span{}

  @media(max-width: 600px){

    div{
      margin-left: 10px;
    }

    h3{
      margin-bottom: 0px;
    }
  }
`;

export const Status = styled.span<IStatusProps>`
  width: 40px;
  height: 20px;
  position: absolute;
  border-radius: 50px;
  left: -20px;
  background: #fad552;

  ${props => props.isResolved && css`
    background: green;
  `}
`;