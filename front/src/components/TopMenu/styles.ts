import styled from 'styled-components';
import { DefaultContainer } from '../../styles/defaultContainer';

export const Container = styled.div`
  ${DefaultContainer}
  padding: 9px 0;
  position: fixed;
  top: 40px;

  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

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

`;