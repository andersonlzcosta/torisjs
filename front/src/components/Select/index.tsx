import React, { useRef, useEffect, SelectHTMLAttributes } from 'react';
import { Container, Error } from './styles';
import { FiAlertCircle } from 'react-icons/fi';

import { useField } from '@unform/core';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  containerStyle?: object;
  className?: string;
}

const Select: React.FC<SelectProps> = ({ name, containerStyle, className, ...rest }) => {
  const inputRef = useRef<HTMLSelectElement>(null);
  const { fieldName, registerField, error, defaultValue } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container style={containerStyle} className={className} isErrored={!!error}>
      <select
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      >
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
      </select>
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#fff" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Select;
