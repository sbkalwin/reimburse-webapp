import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10);

export function parseValidationError(validationError: string) {
  const errors = JSON.parse(validationError)?.inner?.map((err) => {
    return {
      name: err.path,
      message: err.message,
    };
  });
  return errors;
}

export function generateId(size = 10) {
  return nanoid(size);
}
