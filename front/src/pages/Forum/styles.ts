import styled, { css } from 'styled-components';
import { DefaultBackground } from '../../styles/DefaultBackground';
import { DefaultContainer } from '../../styles/DefaultContainer';

interface IStatusProps {
  isResolved: boolean;
}

interface IFilterDataProps {
  isVisible: boolean;
}

interface ICategoryButton {
  isSelected: boolean;
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

export const Filter = styled.div`
  ${DefaultBackground}
  max-width: 500px;
  width: 90%;
  margin-bottom: 20px;
  z-index: auto;

`;

export const FilterDataOverlay = styled.div<IFilterDataProps>`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background: #fad552;
  z-index: 19;
  display: none;

  ${props => props.isVisible && css`
    display: flex;
  `}

  > div{
    max-width: 600px;
    width: 90%;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
  }

  button + button{
    margin-left: 20px;
  }

  h2::before{
    background: #9fc1e0;
  }

  h2{
    margin-top: 70px;
    margin-bottom: 15px;
    max-width: 100%;
    margin-bottom: 5px;
  }

  p{
    width: 100%;
    margin-top: 0px;
    font-size: 17px;
    margin-bottom: 40px;
  }
  
  button.voltar{
    box-shadow: 0px 10px 28px 0px #847a36;
    letter-spacing: 1px;
    font-size: 12px;
    padding: 5px 15px;
    width: auto;
    align-self: flex-start;
  }
`;

export const ActiveCategoriesList = styled.div`
  flex-direction: row;
  justify-content: flex-start;

  > div {
    font-size: 16px;
    background: #67A4DD;
    border-radius: 30px;
    padding: 3px 10px 3px 15px;
    flex-direction: row;
    white-space: nowrap;
    color: #fff;
    margin: 10px 5px 0px;

    button{
      background: none;
      padding: 3px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 15px;
      margin-left: 5px;

      svg{
        stroke: #fff;
        transition: stroke .4s;

        &:hover{
          stroke: #dd4c37
        }
      }
    }
  }
`;

export const Category = styled.button<ICategoryButton>`
  &:hover{
    background: green;
  }

  ${props => props.isSelected && css`
    background: green;
  `}

  width: auto;
  letter-spacing: 1px;
  font-size: 13px;
  padding: 5px 15px;
  box-shadow: 0px 10px 28px 0px #847a36;
`;