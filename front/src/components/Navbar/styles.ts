import styled from 'styled-components';
import { DefaultContainer } from '../../styles/defaultContainer';
import { AlternativeShadow } from '../../styles/alternativeShadow';

export const Container = styled.div`
  border-radius: 53px;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;

  ${DefaultContainer}
  ${AlternativeShadow}
  padding: 10px 30px;
  width: auto;

  position: fixed;
  bottom: 40px;


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
`;