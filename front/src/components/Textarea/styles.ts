import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface inputProps {
  isErrored: boolean;
}

export const Container = styled.div<inputProps>`
  position: relative;
  border: 2px solid #0B4385;
  border-radius: 30px;
  width: 100%;

  ${(props) => props.isErrored && css`
    border-color: #c53333;
  `}

  & + div{
    margin-top: 8px;
  }

  textarea{
    width: 100%;
    border: none;
    padding: 20px;
    font-size: 17px;
    min-height: 300px;
    border-radius: 30px;

    &:focus{
      outline:none;
    }
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
