import styled, { css } from 'styled-components';
import { DefaultContainer } from '../../../styles/DefaultContainer';
import { DefaultBackground } from '../../../styles/DefaultBackground';
import { darken, shade } from 'polished';

interface IAulaProps {
  hasBeenWatched: boolean;
}

export const Container = styled.div`
  ${DefaultContainer}
`;

export const CursoContent = styled.div`
  ${DefaultBackground}
  max-width: 500px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;

  > h3, > p, > span{
    width: 100%;
    margin: 0;
  }

  > p, > span{
    margin-top: 10px;
  }

  > h3{
    font-size: 30px;
  }

  > p{
    font-size: 17px;
  }

  > span{
    width: auto;
    font-size: 13px;
    letter-spacing: 1px;
    margin: 20px 5px 0;
    padding: 3px 10px;
    background: #fad552;
    border-radius: 30px;
  }

  > button{
    margin-top: 30px;
  }
`;

export const Modulo = styled.div`
  width: 100%;
  align-items: flex-start;
  margin-top: 50px;

  > h4{
    margin: 0 0 0 20px;
  }
`;

export const Aula = styled.div<IAulaProps>`
  display: flex;
  width: 100%;
  border-radius: 53px;
  background: #fad552;
  margin-top: 10px;
  text-decoration: none;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 0 30px;
  transition: background .4s;

  &:hover{
    background: ${darken(.2, '#fad552')}
  }

  ${props => props.hasBeenWatched && css`
    background: #d2b348;

    &:hover{
      background: ${darken(.2, '#d2b348')}
    }

    a::after{
      content: 'assistida';
      color: #fff;
    }

    h4, span{
      color: #fff;
    }
  `}

  a{
    margin: 0px;
    padding: 20px 0px;
    width: 100%;
    text-decoration: none;
  }

  span{
    white-space: nowrap;
    margin-bottom: 0px;
    margin-left: 30px;
    font-weight: 700;
    font-size: 13px;
  }

  h4{
    font-weight: 400;
    margin: 0px;
    span{
      display: block;
      margin-left: 0;
    }
  }

  div + div{
    margin-top: 20px;
  }
`;
