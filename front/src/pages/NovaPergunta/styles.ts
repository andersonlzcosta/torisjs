import styled from 'styled-components';
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
    svg{
      stroke: #dd4c37;
    }
  }
`;