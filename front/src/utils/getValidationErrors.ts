import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validation: Errors = {};

  err.inner.forEach((error) => {
    validation[error.path] = error.message;
  });

  return validation;
}
