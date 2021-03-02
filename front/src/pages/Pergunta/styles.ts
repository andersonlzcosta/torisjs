import styled from 'styled-components';
import { DefaultBackground } from '../../styles/DefaultBackground';
import { DefaultContainer } from '../../styles/DefaultContainer';

export const Container = styled.div`
  ${DefaultContainer}
`;

export const ContentContainer = styled.div`
  max-width: 800px;
  width: 90%;

  h2{
    margin-bottom: 10px;
    margin-top: 100px;
    max-width: 630px;
  }

  h3{
    font-weight: 400;
    width: 100%;
    padding-left: 40px;
    margin-top: 0px;
  }

  > div + div {
    margin-top: 50px;
  }

  div{
    width: 100%;
  }

  form{
    width: 100%;

    input{
      background: #fff;
      color: #0B4385;
      letter-spacing: 1px;

      &::placeholder{
        color: #0B4385;
        opacity: .5;
      }
    }
  }
`;

export const Content = styled.div`
  ${DefaultBackground}
  align-items: flex-start;

  button.delete{
    position: absolute;
    top: -10px;
    right: -10px;
    background: #dd4c37;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    svg{
      stroke: #fff;
    }
  }
`;

export const PerguntaContainer = styled.div`
  width: 100%;
  position: relative;

    button.delete{
    position: absolute;
    top: 104px;
    right: -10px;
    background: #dd4c37;
    width: auto;
    padding: 0 20px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    letter-spacing: 0px;

    svg{
      stroke: #fff;
      margin-left: 10px;
    }
  }
`;