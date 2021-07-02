import styled from 'styled-components';
import { DefaultContent } from '../../styles/DefaultContent';
import { DefaultBackground } from '../../styles/DefaultBackground';
import { darken } from 'polished';

export const Container = styled.div`
  ${DefaultContent}
`;

export const Content = styled.div`
  ${DefaultBackground}

  label{
    font-weight: 900;
    font-size: 13px;
    width: 100%;
    margin-bottom: 5px;
  }

  button.alt{
    width: auto;
    text-align: center;
    font-weight: 200;
    font-size: 14px;
    background: #D6E9FA;
    color: #002F67;
    border-radius: 30px;
    padding: 8px 15px;
    margin: 0px auto 15px 0px;
    transition: background .4s;
    box-shadow: none;
    letter-spacing: 1px;

    &:hover{
      background: #bcdfff;
    }
  }

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

    > div.checkbox{
      width: 100%;
      flex-direction: row;
    }

    label{
      margin: 0;
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

    textarea{
      width: 100%;
      border-radius: 10px;
      min-height: 150px;
      border-color: #002F67;
      margin: 5px 0 0 0;
      outline: none;
      border-radius: 30px;
      padding: 15px;
    }

    .bigger{
      font-weight: 300;
      font-size: 27px;
    }

    &.full-width{
      width: 100%;
    }
  }

  div + div{
    margin-top: 10px;
  }
`;

export const AbrigoUserContainer = styled.div`
  width:100%;
`;

export const AbrigoUser = styled.aside`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  div{
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 15px;
  }

  h3{
    margin: 0;
  }

  button{
    background: none;
    box-shadow: none;
    width: 24px;
    height: 24px;
    padding: 0;

    &:hover{
      background: none;
    }

    svg{
      stroke: #dd4c37;
    }
  }
`;