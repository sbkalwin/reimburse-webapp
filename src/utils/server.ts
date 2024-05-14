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

export function getFilterDate(date: string | undefined): Date | undefined {
  if (!date) return;

  const result = new Date(date.substring(0, 10)).toISOString();
  return new Date(result);
}

export function getDate(date: Date) {
  const str = date.toISOString().substring(0, 10);
  return new Date(str);
}
