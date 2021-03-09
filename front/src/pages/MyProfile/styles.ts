import { darken } from 'polished';
import styled from 'styled-components';
import { DefaultContainer } from '../../styles/DefaultContainer';

export const Container = styled.div`
  ${DefaultContainer}
  
  button.floating{
    width: 100%;
    max-width: 500px;

    letter-spacing: 1px;
    font-size: 12px;
    z-index: 12;
    color: #002F67;
    background: #D6E9FA;
    box-shadow: 0px 15px 38px 0px #426fa340;

    &:hover{
      background: #bcdfff;
    }
  }
`;

export const ButtonsContainer = styled.div`
  flex-direction: row;
  align-items: stretch;
  max-width: 500px;
  margin-top: 20px;

  button{
    background: #dc7835;
    color: #fff;
    font-size: 12px;
    letter-spacing: 1px;

    &:hover{
      background: ${darken(0.1, '#dc7835')};
    }
  }

  button.voltar{
    background: #D6E9FA;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    
    &:hover{
      background: #bcdfff;
    }
  }
`;