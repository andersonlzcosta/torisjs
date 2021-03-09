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

export const PerguntaContainer = styled.div`
  max-width: 900px;
  width: 100%;
  align-items: flex-start;

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

  > p {
    font-size: 30px;
    padding-left: 40px;
    color: #fff;
  }

  form{
    padding-left: 40px;
    align-items: flex-start;
  }

  div{
    display: flex;
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
    margin-top: 10px;
  }

  label{
    font-size: 20px;
    color: #fff;
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
    background: #864296;

    &::after{
      background: #864296;

    }
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

  aside{
    margin-top: 40px;
    border-radius: 10px;
    background: #D6E9FA;


    p{
      margin: 10px 20px;
      font-size: 22px;
      font-weight: 600;
      letter-spacing: 1px;
    }
  }
`;
