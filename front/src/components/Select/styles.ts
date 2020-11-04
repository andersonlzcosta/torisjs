import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface inputProps {
  isErrored: boolean;
}

export const Container = styled.div<inputProps>`
  position: relative;
  width: 100%;
  align-items: flex-start;

  select{
    min-width: 100px;
    border: 1px solid #002f67;
    font-size: 15px;
    padding: 3px 5px;
  }

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
