import styled, { css } from 'styled-components';
import { DefaultBackground } from '../../styles/DefaultBackground';
import { DefaultContainer } from '../../styles/DefaultContainer';

interface ISingleNotification {
  type: string;
}

export const Container = styled.div`
  ${DefaultContainer}
`;

export const CreateNotification = styled.div`
  width: 90%;
  max-width: 500px;

  form{
    ${DefaultBackground}
    align-items: flex-start;

    > div{
      border-radius: 9px;
    }

  }

  label{
    font-weight: 700;
    margin-bottom: 5px;
  }
  
  div + div{
    margin-top: 10px;
  }
`;

export const InputContainer = styled.div`
  flex-direction: row;

  > div{
    border: none;
    margin: 0px;
  }

  input{
    width: 20px;
    height: 20px;
    margin: 0px;
  }

  label{
    margin-bottom: 0px;
    margin-left: 10px;
    font-weight: 400;
    font-size: 18px;
  }
`;

export const ViewNotifications = styled.div`
  width: 90%;
  max-width: 500px;

  div + div{
    margin-top: 20px;
  }
`;

export const SingleNotification = styled.div<ISingleNotification>`
  ${DefaultBackground}
  padding: 0 20px;
  justify-content: flex-start;
  flex-direction: row;

  ${props => props.type === "warning" && css`
    background: #DC7835;

    p{
      color: #fff;
    }
  `}
`;