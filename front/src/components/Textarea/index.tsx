import React, { TextareaHTMLAttributes, useRef, useEffect } from 'react';
import { Container, Error } from './styles';
import { FiAlertCircle } from 'react-icons/fi';

import { useField } from '@unform/core';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  containerStyle?: object;
}

const Input: React.FC<TextareaProps> = ({ name, containerStyle, children, ...rest }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { fieldName, registerField, error, defaultValue } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container style={containerStyle} isErrored={!!error}>
      <textarea
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      >{children}</textarea>
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#fff" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
