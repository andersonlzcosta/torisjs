import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface IContainerProps {
  isVisible: boolean;
}

export const Container = styled.div<IContainerProps>`
  display: none;

  ${props => props.isVisible && css`
    display: flex;
  `}

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #fff;
  justify-content: center;
  align-items: center;
  z-index: 22;
`;

export const Content = styled.div`
  width: 90%;
  max-width: 500px;
  
  div{
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
  }

  p{
    font-size: 35px;
    text-align: center;
  }

  button{
    width: 48%;
    background: #dd4c37;
    margin: 0 5px;

    &:hover{
      background: ${shade(.2, '#dd4c37')};
    }
  }
  
  button:last-child{
    background: green;

    &:hover{
      background: ${shade(.2, 'green')};
    }
  }
`;