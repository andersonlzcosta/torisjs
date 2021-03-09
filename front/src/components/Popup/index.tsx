import React from 'react';
import { Container, Content } from './styles';

interface IPopupProps {
  isVisible: boolean;
  onCancel: () => void;
  onFulfill: () => void;
}

const Popup: React.FC<IPopupProps> = ({ isVisible, onCancel, onFulfill, children }) => {

  return (
    <Container isVisible={!!isVisible}>
      <Content>
        <p>
          {children}
        </p>
        <div>
          <button onClick={onCancel} className="popup-button">cancelar</button>
          <button onClick={onFulfill} className="popup-button">continuar</button>
        </div>
      </Content>
    </Container>
  );
}

export default Popup;