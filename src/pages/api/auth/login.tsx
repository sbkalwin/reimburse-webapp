import { NextApiRequest, NextApiResponse } from 'next';
import { generateAccessToken, parseValidationError } from 'utils/server';
import * as Yup from 'yup';

import prisma from '../../../../prisma';

export const loginFormSchema = Yup.object({
  nip: Yup.string().required(),
  kata_sandi: Yup.string().required(),
});

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const body = request.body;

  try {
    if (request.method === 'POST') {
      const login = await loginFormSchema.validate(body);
      const nip = login.nip;
      const user = await prisma.pegawai.findUnique({ where: { nip } });
      if (!user) {
        return response
          .status(404)
          .json({ message: 'Gagal Login, NIP tidak terdaftar' });
      }

      if (user.kataSandi !== login.kata_sandi) {
        return response.status(401).json({
          message: 'NIP atau Password anda salah',
        });
      }

      if (user.status === 'inactive') {
        return response.status(400).json({
          message:
            'Akun anda telah di nonaktifkan, silahkan hubungi admin untuk mengaktifkan kembali',
        });
      }

      const token = generateAccessToken(user);

      return response.status(200).json({
        data: {
          token,
        },
        message: 'Berhasil Login',
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
