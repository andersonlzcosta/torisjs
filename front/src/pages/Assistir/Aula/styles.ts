import styled from 'styled-components';
import { DefaultBackground } from '../../../styles/DefaultBackground';
import { DefaultContainer } from '../../../styles/DefaultContainer';

export const Container = styled.div`
  ${DefaultContainer}
  background-color: #fad552;
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
  }

  h1::before, h2::before{
    background: #9fc1e0;
  }

  h2{
    margin-top: 70px;
    margin-bottom: 15px;
  }

  > div{
    max-height: 500px;
  }

  span{
    width: 100%;
    padding-left: 40px;
    font-size: 20px;
    margin-bottom: 30px;
  }

  button.voltar{
    box-shadow: 0px 10px 28px 0px #847a36;
    letter-spacing: 1px;
    font-size: 12px;
    padding: 5px 15px;
    width: auto;
    align-self: flex-start;
  }

  button.proxima{
    box-shadow: 0px 10px 28px 0px #847a36;
    letter-spacing: 1px;
    font-size: 15px;
    padding: 10px 20px;
    width: auto;
    align-self: flex-start;
  }
`;

export const AulaArquivos = styled.div`
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;

  button{
    box-shadow: 0px 10px 28px 0px #847a36;
    letter-spacing: 1px;
    font-size: 13px;
    padding: 9px 20px;
    width: auto;
  }

  button + button{
    margin-left: 10px;
  }
`;