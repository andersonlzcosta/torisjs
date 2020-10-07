import styled from 'styled-components';
import { DefaultContent } from '../../styles/DefaultContent';
import { DefaultBackground } from '../../styles/DefaultBackground';

export const Container = styled.div`
  ${DefaultContent}
`;

export const Content = styled.div`
  ${DefaultBackground}

  label{
    font-weight: 900;
    font-size: 13px;
    width: 100%;
    margin-bottom: 5px;
  }

  form{
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0;

    input{
      background: none;
      padding: 0px;
      /* border: none;
      border-bottom: 1px solid #0B4385; */
      color: #0B4385;
      border-radius: 0;
      letter-spacing: 0px;
      width: 100%;
      font-weight: 300;
      font-size: 17px;
      margin: 4px 0 0;
    }

    > div{
      align-items: flex-start;
      margin: 10px 0;
    }

    > div.full-width{
      width: 100%;
    }

    > div.half-width{
      width: 49%;
    }

    label{
      margin: 0;
    }

    .bigger{
      font-weight: 300;
      font-size: 27px;
    }
  }

  aside + aside{
    margin-top: 10px;
  }
`;

export const AbrigoUser = styled.aside`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 15px;
  }

  h3{
    margin: 0;
  }

`;