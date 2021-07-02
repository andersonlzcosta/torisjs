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

  &.alt{
    border: none;
    border-radius: 0;
    width: 100%;
  }

  &.line-bottom input{
    border-bottom: 1px solid #0B4385;
  }

  &.checkbox{
    border: none;
    width: 20px;
    margin: -3px 3px 0px 0px;
  }

  &.number{
    width: 100px;
  }
`;

export const Error = styled(Tooltip)`
  position: absolute;
  top: 3px;
  right: 3px;
  height: 16px;
  width: 16px!important;

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
