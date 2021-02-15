import styled from 'styled-components';
import { DefaultContent } from '../../styles/DefaultContent';
import { DefaultBackground } from '../../styles/DefaultBackground';
import { darken } from 'polished';

export const Container = styled.div`
  ${DefaultContent}
`;

export const Content = styled.div`
  ${DefaultBackground}

  button.delete{
    background: #dd4c37;
    max-width: 300px;
    padding: 6px 12px;
    font-size: 16px;

    &:hover{
      background: ${darken(0.1, '#dd4c37')};
    }
  }

  form{
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0;

    input{
      background: none;
      padding: 0px;
      /* border: none;
      border-bottom: 1px solid #0B4385; */
      color: #0B4385;
      border-radius: 0;
      letter-spacing: 0px;
      width: 100%;
      font-weight: 300;
      font-size: 17px;
      margin: 4px 0 0;
    }

    > div.full-width{
      width: 100%;
      align-items: flex-start;
      margin: 10px 0;
    }

    > div.half-width{
      width: 49%;
      align-items: flex-start;
      margin: 10px 0;
    }

    label{
      font-weight: 900;
      font-size: 13px;
    }

    select{
      font-size: 16px;
      border-radius: 20px;
      padding: 2px 10px;
      outline: none;
      margin: 3px 0 0 -5px;
      border-width: 2px;
    }

    aside{
      font-size: 12px;
    }

    .bigger{
      font-weight: 300;
      font-size: 27px;
    }

    svg{
      stroke: red;
    }
  }
`;