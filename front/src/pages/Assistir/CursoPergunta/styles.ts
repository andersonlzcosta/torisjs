import styled from 'styled-components';
import { DefaultBackground } from '../../../styles/DefaultBackground';
import { DefaultContainer } from '../../../styles/DefaultContainer';

export const Container = styled.div`
  ${DefaultContainer}
  background-color: #63BE45;
  min-height: 100vh;
  justify-content:center;
  padding-top: 100px;
  padding-bottom: 100px;
`;

export const PerguntaContainer = styled.div`
  max-width: 900px;
  width: 100%;
  align-items: flex-start;

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

  > p {
    font-size: 30px;
    padding-left: 40px;
  }

  form{
    padding-left: 40px;
  }

  div{
    width: 100%;
    max-width: 600px;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    div{
      border: none;
      width: 20px;
      margin-right: 5px;
    }
  }

  div + div{
    margin-top: 8px;
  }

  label{
    font-size: 20px;
  }

  span{
    width: 100%;
    padding-left: 40px;
    font-size: 20px;
    margin-bottom: 30px;
  }

  input[type="radio"]{
    border: none;
    width: 20px;
  }

  button.voltar{
    box-shadow: 0px 10px 28px 0px #847a36;
    letter-spacing: 1px;
    font-size: 12px;
    padding: 5px 15px;
    width: auto;
    align-self: flex-start;
  }

  button{
    box-shadow: 0px 10px 28px 0px #847a36;
    letter-spacing: 1px;
    font-size: 15px;
    padding: 10px 20px;
    width: auto;
    align-self: flex-start;
  }

  aside{
    padding-left: 40px;
    margin-top: 40px;

    p{
      margin: 0px;
      font-size: 22px;
      font-weight: 600;
      letter-spacing: 1px;
    }
  }
`;
