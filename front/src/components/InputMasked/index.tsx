import React, { InputHTMLAttributes, useRef, useEffect, useCallback, useState } from 'react';
import ReactInputMask, {Props} from 'react-input-mask';
import { Container, Error } from './styles';
import { FiAlertCircle } from 'react-icons/fi';

import { useField } from '@unform/core';

interface InputProps extends Props {
  name: string;
  inputName?: string;
  containerStyle?: object;
  className?: string;
}

const InputMasked: React.FC<InputProps> = ({ name, inputName, containerStyle, className, ...rest }) => {
  const inputRef = useRef(null);
  const { fieldName, registerField, error, defaultValue } = useField(name);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container style={containerStyle} className={className} isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      <ReactInputMask
        ref={inputRef}
        onFocus={handleInputFocus}
        defaultValue={defaultValue}
        name={inputName}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#fff" size={16} />
        </Error>
      )}
    </Container>
  );
};

export default InputMasked;
