import React from 'react';
import { Container } from './styles';

interface IPopupProps {
  isVisible: boolean;
  onCancel: () => void;
  onFulfill: () => void;
}

const Popup: React.FC<IPopupProps> = ({ isVisible, onCancel, onFulfill, children }) => {

  return (
    <Container isVisible={!!isVisible}>
      {children}
      <button onClick={onCancel}>cancelar</button>
      <button onClick={onFulfill}>continuar</button>
    </Container>
  );
}

export default Popup;