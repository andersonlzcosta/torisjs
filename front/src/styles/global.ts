import { createGlobalStyle, keyframes } from 'styled-components';
import { lighten } from 'polished';
import { Fonts } from '../fonts';


const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;


export default createGlobalStyle`
  ${Fonts}

  * {
    font-family: 'Proxima Nova', sans-serif;
    color: #002F67;
    box-sizing: border-box;
  }

  div{
    animation: ${fadeIn} .8s;
  }

  section, div, form, #root{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 100%;
  }

  html, body, #root{
    width: 100%;
    min-height: 100vh;
    margin: 0;
  }

  body{
    background: #f0f7ff;
    background: linear-gradient(141deg, #f0f7ff 0%, #EBEEFF 100%);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  input, button{
    width: 100%;
    border-radius: 30px;
    border: none;
    color: #fff;
    letter-spacing: 4px;
    font-size: 21px;
    padding: 13px 35px;
    &:focus{
      outline: none;
    }
  }

  input{
    background: #0B4385;
    &::placeholder { 
      color: #fff;
    }
  }

  input + input{
    margin-top: 15px;
  }

  button{
    text-align: center;
    background: #5D3077;
    box-shadow: 0px 10px 28px 0px #AD9DCD;
    transition: background .4s;
    cursor: pointer;

    &:hover{
      background: ${lighten(0.2, '#5D3077')};
    }
  }

  
  h1, h2{
    text-align: left;
    width: 100%;
    font-size: 30px;
    max-width: 400px;
    align-self: flex-start;
    padding-left: 40px;
    position: relative;

    &::before{
      content: '';
      width: 80px;
      height: 80px;
      background: #fad552;
      border-radius: 50%;
      position: absolute;
      top: -40px;
      left: 0px;
      z-index: -1;
    }
  }

  @media(max-width: 600px){
    input{
      padding: 9px 22px;
      font-size: 16px;
    }

    button{
      font-size: 16px;
      letter-spacing: 2px;
      padding: 8px 15px;
    }
  }
`;