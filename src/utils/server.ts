import { EmployeeRoleEnum, EmployeeStatusEnum } from '@prisma/client';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
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

export function generateAccessToken(data: {
  nip: string;
  status: EmployeeStatusEnum;
  peran: EmployeeRoleEnum;
  kataSandi: string;
  nomorRekening: string;
  tanggalDibuat: Date;
  tanggalDiubah: Date;
  teamId: string;
}) {
  const token = sign(data, 'test', {
    expiresIn: '60 days',
  });

  return token;
}

export function verifyBearerToken(bearer: string) {
  try {
    const [, token] = bearer.split(' ');
    if (!token) return false;
    const decoded = verify(token, 'test') as JwtPayload;
    return decoded;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export function isTokenExpired(exp: number) {
  const currentDate = new Date().getTime();
  const expiredAt = new Date(exp * 1000).getTime();
  return currentDate > expiredAt;
}
