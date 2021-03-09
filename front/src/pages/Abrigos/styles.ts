import styled from 'styled-components';
import { DefaultBackground } from '../../styles/DefaultBackground';
import { DefaultContainer } from '../../styles/DefaultContainer';

export const Container = styled.div`
  ${DefaultContainer}
`;

export const Estatisticas = styled.div`
  width: 90%;
  max-width: 500px;
`;

export const Content = styled.div`
  ${DefaultBackground}
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px 30px;

  > div{
    width: 49%;
    align-items: flex-start;
    margin: 10px 0;
    h3, p{
      margin: 0;
    }

    h3{
      font-size: 13px;
      font-weight: 900;
      margin-bottom: 5px;
    }

    p{
      font-size: 22px;
      font-weight: 200;
    }
  }

  @media(max-width: 600px){
    > div p{
      font-size: 16px;
      line-height: 1.2em;
      font-weight: 400;
    }
  }
`;

export const AbrigosList = styled.div`
  width: 90%;
  max-width: 500px;

  div + div{
    margin-top: 15px;
  }
`;

export const Abrigo = styled.div`
  ${DefaultBackground}
  padding: 10px 30px 10px 30px;
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  position: relative;
  transition: background-color .3s;

  &:hover{
    background-color: #fff9e5;
  }

  div{
    align-items: flex-start;
  }

  h3{
    margin: 0 0 5px;
    font-weight: 400;
    font-size: 17px;
  }

  strong{
    font-size: 13px;
    font-weight: 900;
  }

  a{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-decoration: none;
  }

  button.plus-lateral{
    background: #67A4DD;
    position: absolute;
    padding: 0;
    top: 0;
    right: 0; 
    bottom: 0;
    left: auto;
    border-radius: 0;
    border-top-right-radius: 53px;
    border-bottom-right-radius: 53px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
    min-width: 60px;
    box-shadow: -22px 0px 38px 0px #426fa35e;

    img{
      width: 23px;
    }
  }

  @media(max-width: 600px){
    padding-right: 50px;

    div{
      margin-left: 10px;
    }

    h3{
      margin-bottom: 0px;
    }

    a{
      min-width: 45px;
    }
  }
`;

export const NoAbrigo = styled.div`
  ${DefaultBackground}
  font-size: 24px;
`;