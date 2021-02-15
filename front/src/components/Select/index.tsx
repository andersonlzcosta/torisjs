import React, { useRef, useEffect, SelectHTMLAttributes } from 'react';
import { useField } from '@unform/core';
import { Container } from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  options: {
    value: string;
    label: string;
  }[]
}

const Select: React.FC<SelectProps> = ({ name, options, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  return (
    <Container>
      <select
        ref={selectRef}
        {...rest}
      >
        {options.map(option => (
          <option
            key={option.value}
            value={option.value}
            selected={option.value === defaultValue}
          >
            {option.label}
          </option>
        ))}
      </select>
    </Container>
  );
};
export default Select;