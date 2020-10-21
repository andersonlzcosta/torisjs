import styled from 'styled-components';
import { DefaultContainer } from '../../../styles/DefaultContainer';
import { DefaultBackground } from '../../../styles/DefaultBackground';

export const Container = styled.div`
  ${DefaultContainer}
`;

export const CursoList = styled.div`
  width: 90%;
  max-width: 500px;

  div + div{
    margin-top: 15px;
  }
`;

export const Curso = styled.div`
  ${DefaultBackground}
  padding: 20px 0px 20px 10px;
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
    margin-left: 20px;
  }

  img{
    width: 70px;
    border-radius: 50%;
  }

  h3{
    margin: 0 0 5px;
    font-weight: 400;
    font-size: 17px;
  }

  strong{
    font-size: 13px;
    font-weight: 700;
    max-width: 400px;
  }

  a{
    width: 100%;
    display: flex;
    flex-direction: row;
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

    img {
      width: 50px;
    }

    a{
      min-width: 45px;
    }
  }
`;