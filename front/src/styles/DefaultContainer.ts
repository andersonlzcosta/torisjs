import { css } from 'styled-components';

export const DefaultContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 100%;
  min-height: 100%;
  padding: 40px 0 40px 350px;

  @media(max-width: 950px){
    padding: 180px 0;
  }
`;