import styled from 'styled-components';
import { DefaultBackground } from '../../styles/DefaultBackground';

export const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 350px;
  background: #67A4DD;

  @media(max-width: 950px){
    display: none;
  }
`;

export const Menu = styled.div`
  width: 90%;
  align-items: flex-end;
  padding-right: 5%;


  label{
    text-align: right;
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    padding-right: 10px;
  }

  a{
    ${DefaultBackground}
    text-align: right;
    padding: 2px 20px;
    text-decoration: none;
    color: #446A97;
    width: auto;
  }

  a + a, label + a{
    margin-top: 5px;
  }

  a + label{
    margin-top: 20px;
  }


`;