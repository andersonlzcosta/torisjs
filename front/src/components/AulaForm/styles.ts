import styled from 'styled-components';
import { DefaultBackground } from '../../styles/DefaultBackground';

export const Container = styled.div`
  ${DefaultBackground}
  background-color: #fad552;
  border-radius: 13px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  right: 0;
`;

export const Content = styled.div`

  form{
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0;

    input{
      background: none;
      padding: 0px;
      color: #002F67;
      border-radius: 0;
      letter-spacing: 0px;
      width: 100%;
      font-size: 17px;
      margin: 4px 0 0;
    }

    > div{
      align-items: flex-start;
      margin: 10px 0;
    }

    > div.full-width{
      width: 100%;
    }

    > div.half-width{
      width: 49%;
    }

    label{
      font-weight: 900;
      font-size: 13px;
    }

    button{
      max-width: 250px;
      font-size: 14px;
      box-shadow: none;
    }
  }
`;