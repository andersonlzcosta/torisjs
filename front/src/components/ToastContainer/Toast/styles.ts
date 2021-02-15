import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ContainerProps {
  type?: 'info' | 'success' | 'error';
  checkDesc: boolean;
}

const toastTypeVariations = {
  info: css`
    background: #ebf0ff;
    color: #3172b7;
  `,
  success: css`
    background: #63BE45;
    color: #2e656a;
  `,
  error: css`
    background: #fddede;
    color: #c53030;
  `,
}

export const Container = styled(animated.div) <ContainerProps>`
  width: 360px;
  flex-direction: row;
  position: relative;
  padding: 16px 40px 16px 16px;
  border-radius: 53px;
  box-shadow: 2px 2px 8px rgba(0,0,0,0.2);

  display: flex;

  & + div{
    margin-top: 8px;
  }

  ${props => toastTypeVariations[props.type || 'info']}

  > svg{
    margin: 4px 12px 0 0;
  }

  div{
    flex: 1;
    align-items: flex-start;
    p{
      margin-top: 4px;
      margin-bottom: 0px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  button{
    position: absolute;
    right: 26px;
    top: 19px;
    opacity: 0.6;
    border: 0;
    background: transparent;
    color: inherit;
    width: auto;
    padding: 0;
    box-shadow: none;

    &:hover{
      background: none;
    }
  }

  ${props => !props.checkDesc && css`
    align-items: center;
    svg{margin-top: 0;}
  `}
`;
