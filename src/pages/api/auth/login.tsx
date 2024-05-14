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
    return response.status(500).json({
      message: e.message,
      errors,
    });
  }
}
