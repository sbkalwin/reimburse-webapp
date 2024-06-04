import { NextApiRequest, NextApiResponse } from 'next';
import {
  isTokenExpired,
  parseValidationError,
  verifyBearerToken,
} from 'utils/server';
import * as Yup from 'yup';

import prisma from '../../../../prisma';

export const changePasswordFormSchema = Yup.object({
  password_lama: Yup.string().required(),
  password_baru: Yup.string().required(),
  konfirmasi_password_baru: Yup.string()
    .required()
    .oneOf([Yup.ref('password_baru')], 'Password tidak cocok'),
});

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    const token = request.headers.authorization;
    const user = verifyBearerToken(token);
    const body = request.body;

    if (user) {
      const tokenExpired = isTokenExpired(user.exp);
      if (tokenExpired) {
        return response.status(401).json({
          message: 'Sesi anda telah selesai, mohon untuk login kembali',
        });
      }
    } else {
      return response.status(401).json({
        message: 'Unauthorized',
      });
    }

    const nip = user.nip;
    if (request.method === 'PUT') {
      const user = await prisma.pegawai.findUnique({
        where: { nip },
        select: {
          kataSandi: true,
        },
      });

      if (!user) {
        return response.status(404).json({ message: 'NIP tidak terdaftar' });
      }

      const changePassword = await changePasswordFormSchema.validate(body, {
        abortEarly: false,
      });

      if (user.kataSandi === changePassword.password_lama) {
        return response.status(400).json({
          message: 'Password anda salah',
        });
      }

      await prisma.pegawai.update({
        where: { nip },
        data: {
          kataSandi: changePassword.password_baru,
        },
      });

      return response.status(200).json({
        message: 'Password Berhasil Diubah',
      });
    }
  } catch (e) {
    const validationError = JSON.stringify(e);
    const errors = parseValidationError(validationError);
    console.error(e);
    return response.status(errors ? 400 : 500).json({
      message: e.message,
      errors,
    });
  }
}
