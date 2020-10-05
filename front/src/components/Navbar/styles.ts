import styled from 'styled-components';
import { DefaultBackground } from '../../styles/DefaultBackground';
import { AlternativeShadow } from '../../styles/AlternativeShadow';

export const Container = styled.div`
  border-radius: 53px;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;

  ${DefaultBackground}
  ${AlternativeShadow}
  padding: 10px 30px;
  width: 96%;
  max-width: 520px;

  position: fixed;
  z-index: 11;
  bottom: 40px;

  display: none;


  > img{
    width: 59px;
    margin-right: 10px;
  }

  a{
    width: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    font-weight: 400;
    font-size: 12px;
    img{
      margin-bottom: 5px;
    }
  }

  a + a{
    margin-left: 20px;
  }

  @media(max-width: 950px){
    display: flex;
  }

  @media(max-width: 600px){
    padding: 8px 10px 7px;
    bottom: 10px;

    > img{
      display: none;
    }

    a{
      width: 44px;
      font-size: 9px;
      
      img{
      }
    }
  }
`;