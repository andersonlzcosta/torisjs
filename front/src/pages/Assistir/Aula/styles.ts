import styled from 'styled-components';
import { DefaultBackground } from '../../../styles/DefaultBackground';
import { DefaultContainer } from '../../../styles/DefaultContainer';

export const Container = styled.div`
  ${DefaultContainer}
  background-color: #002F67;
  min-height: 100vh;
  justify-content:center;
  padding-top: 100px;
  padding-bottom: 100px;
`;

export const AulaContainer = styled.div`
  width: 90%;
  max-width: 900px;
  width: 100%;

  h1, h2{
    z-index: 1;
    margin-bottom: 5px;
    max-width: 100%;
    color: #fff;
  }

  h1::before, h2::before{
    background: #864296;
  }

  h2{
    margin-top: 70px;
    margin-bottom: 15px;
  }

  h3{
    font-size: 22px;
    font-weight: 400;
    letter-spacing: 1px;
    color: #fff;
    padding-left: 40px;
  }

  > div{
    max-height: 500px;
  }

  span{
    width: 100%;
    margin-left: 40px;
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 30px;
    letter-spacing: 2px;
    background-color: #fff;
    padding: 3px 10px;
    text-transform: lowercase;
    border-radius: 30px;
  }

  button.voltar{
    font-size: 12px;
    padding: 5px 15px;
  }

  button{
    box-shadow: 0px 10px 28px 0px #00234c;
    letter-spacing: 1px;
    font-size: 15px;
    padding: 10px 20px;
    width: auto;
    align-self: flex-start;
    
    background: #D6E9FA;
    color: #002F67;

    &:hover{
      background: #bcdfff;
    }
  }
`;

export const AulaArquivos = styled.div`
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;

  button{
    box-shadow: 0px 10px 28px 0px #00234c;
    font-size: 13px;
    padding: 9px 20px;
  }

  button + button{
    margin-left: 10px;
  }
`;