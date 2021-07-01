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
      padding: 1px 10px;
      color: #0B4385;
      border-radius: 0;
      letter-spacing: .5px;
      width: 100%;
      font-weight: 300;
      font-size: 14px;
      margin: 1px 0 0;
      border-radius: 20px;
      border: 1px solid #d2deff;
      background: #f0f4ff;
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
      font-size: 12px;
      padding-left: 10px;
    }

    select{
      font-size: 14px;
      border-radius: 20px;
      padding: 1px 10px;
      outline: none;
      margin: 3px 0 0 -5px;
      border: 1px solid #d2deff;
      background: #f0f4ff;
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