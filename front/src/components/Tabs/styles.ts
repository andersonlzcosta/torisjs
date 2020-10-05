import styled from 'styled-components';
import { DefaultBackground } from '../../styles/DefaultBackground';

export const Container = styled.div`
  position: fixed;
  z-index: 12;
  top: 100px;
  flex-direction: row;

  a{
    ${DefaultBackground}
    color: #446A97;
    letter-spacing: 1px;
    margin: 0 10px;
    padding: 12px 20px;
    white-space: nowrap;
    font-size: 15px;
    text-decoration: none;

    &:hover{
      background: #f1f7ff;
    }
  }

  @media(max-width: 600px){
    top: 60px;
    justify-content: flex-start;
    overflow-x: auto;
    padding: 0px 0 5px;
    ::-webkit-scrollbar {
      display: none;
    }

    a{
      padding: 8px 20px;
      box-shadow: none;
    }
  }
`;
