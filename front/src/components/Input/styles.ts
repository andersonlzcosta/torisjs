import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface inputProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<inputProps>`
  position: relative;
  border-radius: 30px;
  border: 2px solid #0B4385;
  width: 100%;

  ${(props) => props.isFocused && css`
  `}

  ${(props) => props.isFilled && css`
  `}

  ${(props) => props.isErrored && css`
    border-color: #c53333;
  `}

  & + div{
    margin-top: 8px;
  }
`;

export const Error = styled(Tooltip)`
  position: absolute;
  top: 17px;
  right: 20px;
  height: 20px;

  svg{
    margin-right: 0;
    stroke: #fff;
  }

  span{
    background: #c53030;
    color: #fff;

    &::before{
      border-color: #c53030 transparent;
    }
  }

  @media(max-width: 600px){
    top: 10px;
    right: 11px;
  }
`;
