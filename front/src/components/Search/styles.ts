import styled from 'styled-components';
import { DefaultBackground } from '../../styles/DefaultBackground';

export const Container = styled.div`
  width: 90%;
  max-width: 500px;
`;

export const SearchBox = styled.div`
  ${DefaultBackground}
  width: 100%;
  margin-bottom: 20px;

  form{
    width: 100%;
    position: relative;
    button[type="submit"]{
      background: none;
      box-shadow: none;
      position: absolute;
      right: 0;
      top: 0;
      width: auto;
      padding-top: 15px;
    }

    button[type="reset"]{
      width: 100%;
      max-width: 250px;
      text-align: center;
      font-weight: 200;
      font-size: 14px;
      background: #D6E9FA;
      color: #002F67;
      border-radius: 30px;
      padding: 8px 15px;
      margin: 15px 0 -5px;
      text-decoration: none;
      transition: background .4s;
      box-shadow: none;


      &:hover{
        background: #bcdfff;
      }
    }
  }

  p{
    margin-bottom: 0px;
  }
`;