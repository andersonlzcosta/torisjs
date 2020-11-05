import React, { InputHTMLAttributes, useRef, useEffect, useCallback, useState } from 'react';
import { Container, Error } from './styles';
import { FiAlertCircle } from 'react-icons/fi';

import { useField } from '@unform/core';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  inputName?: string;
  containerStyle?: object;
  className?: string;
}

const Input: React.FC<InputProps> = ({ name, inputName, containerStyle, className, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, registerField, error, defaultValue } = useField(name);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    if (inputRef.current) {
      setIsFilled(!!inputRef.current.value);
    }
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
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        name={inputName}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#fff" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
