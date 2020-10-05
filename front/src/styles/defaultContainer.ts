import { css } from 'styled-components';

export const DefaultContainer = css`
  width: 100%;
  min-height: 100%;
  padding: 180px 0 180px 350px;
  justify-content: flex-start;

  @media(max-width: 950px){
    padding: 100px 0;
  }
`;