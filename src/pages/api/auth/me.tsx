import { NextApiRequest, NextApiResponse } from 'next';
import {
  isTokenExpired,
  parseValidationError,
  verifyBearerToken,
} from 'utils/server';
import * as Yup from 'yup';

import prisma from '../../../../prisma';
import { PegawaiLiteResource } from '../../../../prisma/resources';

export const loginFormSchema = Yup.object({
  nip: Yup.string().required(),
  kata_sandi: Yup.string().required(),
});

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    const token = request.headers.authorization;
    const user = verifyBearerToken(token);

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
    if (request.method === 'GET') {
      const user = await prisma.pegawai.findUnique({
        where: { nip },
        select: PegawaiLiteResource,
      });

      if (!user) {
        return response.status(404).json({ message: 'NIP tidak terdaftar' });
      }

      return response.status(200).json({
        data: user,
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
