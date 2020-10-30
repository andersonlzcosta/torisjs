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
  }

  div + div{
    margin-top: 20px;
  }
`;

export const Popup = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 20;
  background: #fff;

  div{
    max-width: 500px;
    width: 90%;
    justify-content: space-between;
    flex-wrap: wrap;
    flex-direction: row;
  }

  h4{
    width: 100%;
    text-align: center;
    font-weight: 400;
    font-size: 30px;
    margin: 0 0 50px 0;
  }

  button{
    width: 45%;
    background: green;
    
    &:hover{
      background: ${shade(.2, 'green')}
    }

    &.cancel{
      background: #dd4c37;
      &:hover{
        background: ${shade(.2, '#dd4c37')}
      }
    }
    
  }
`;