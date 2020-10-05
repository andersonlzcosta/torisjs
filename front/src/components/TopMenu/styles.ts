import styled, { css } from 'styled-components';
import { DefaultBackground } from '../../styles/DefaultBackground';

interface IContainerProps {
  isDesktop?: boolean;
}

export const Container = styled.div<IContainerProps>`
  ${DefaultBackground}

  display: none;
  
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  width: 96%;
  max-width: 500px;
  padding: 9px 0;
  position: fixed;
  z-index: 10;
  top: 40px;

  ${(props => props.isDesktop && css`
    display: flex;
    position: absolute;
  `)}

  > img{
    position: absolute;
    left: 15px;
  }

  a{
    display: flex;
    align-items: center;
    text-decoration: none;
    margin-right: 15px;
    letter-spacing: 1px;
    font-weight: 300;
    font-size: 15px;
    color: #446A97;
    img{
      margin-left: 5px;
    }
  }

  @media(max-width: 950px){
    display: flex;
  }

  @media(max-width: 600px){
    top: 10px;
    padding: 5px 0;
  }

`;