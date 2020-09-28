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
`;
