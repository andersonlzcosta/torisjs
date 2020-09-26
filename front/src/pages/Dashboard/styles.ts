import styled from 'styled-components';
import { DefaultContainer } from '../../styles/defaultContainer';

export const Container = styled.div`
  width: 100%;
  min-height: 100%;

`;

export const Profissionais = styled.div`
  width: 90%;
  max-width: 500px;

  > div{
    ${DefaultContainer}
    padding: 10px 0px 10px 10px;
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
    position: relative;

    div{
      align-items: flex-start;
      margin-left: 20px;
    }
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
    font-weight: 900;
  }

  a{
    background: #67A4DD;
    position: absolute;
    top: 0;
    right: 0; 
    bottom: 0;
    left: auto;
    border-top-right-radius: 53px;
    border-bottom-right-radius: 53px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 60px;
    box-shadow: -22px 0px 38px 0px #426fa35e;

    img{
      width: 23px;
    }
  }

  div + div{
    margin-top: 15px;
  }
`;