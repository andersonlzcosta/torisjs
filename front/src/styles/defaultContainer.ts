import { css, keyframes } from 'styled-components';

const appearFromBottom = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export const DefaultContainer = css`
  animation: ${appearFromBottom} .7s;
  width: 90%;
  border-radius: 53px;
  padding: 40px 30px;

  background-color: #fff;
  box-shadow: 0px 15px 38px 0px #426fa340;
`;