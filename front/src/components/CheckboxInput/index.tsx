import React, { useEffect, useRef, InputHTMLAttributes } from 'react';
import { useField } from '@unform/core';

import { Container, BoxInput } from './styles';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  options: {
    id: string;
    value: string;
    label: string;
  };
}

const CheckboxInput: React.FC<Props> = ({ name, options, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, registerField, defaultValue } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'checked'
    });
  }, [defaultValue, fieldName, registerField]);

  return (
    <Container>
      <label htmlFor={options.id} key={options.id}>
        <BoxInput
          id={options.id}
          defaultChecked={defaultValue}
          ref={inputRef}
          value={options.value}
          type="checkbox"
          {...rest}
        />
        {options.label}
      </label>
    </Container>
  );
};

export default CheckboxInput;