import React, { useRef, useState, useEffect } from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { useField } from '@unform/core';
import { Container } from './styles';
import 'react-datepicker/dist/react-datepicker.css';

interface Props extends Omit<ReactDatePickerProps, 'onChange'> {
  name: string;
}
const DatePicker: React.FC<Props> = ({ name, ...rest }) => {
  const datepickerRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [date, setDate] = useState(defaultValue || null);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: datepickerRef.current,
      path: 'props.selected',
      clearValue: (ref: any) => {
        ref.clear();
      },
    });
    setDate(defaultValue);
  }, [fieldName, registerField, defaultValue]);
  return (
    <Container>
      <ReactDatePicker
        ref={datepickerRef}
        selected={date}
        onChange={setDate}
        dateFormat="dd/MM/yyyy"
        showYearDropdown={true}
        scrollableYearDropdown={true}
        {...rest}
      />
    </Container>
  );
};
export default DatePicker;