import { decamelizeKeys } from 'humps';
import { NextApiRequest, NextApiResponse } from 'next';
import { generateId, parseValidationError } from 'utils/server';
import * as Yup from 'yup';

import prisma from '../../../../prisma';

const kasFormSchema = Yup.object({
  nama: Yup.string().required(),
  deskripsi: Yup.string().default(''),
});

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const body = request.body;
  try {
    if (request.method === 'GET') {
      const kass = await prisma.kas.findMany({
        include: {
          KasDetail: true,
        },
      });
      return response.status(200).json({
        data: decamelizeKeys(kass),
      });
    }

    if (request.method === 'POST') {
      const kas = await kasFormSchema.validate(body);
      const id = generateId();
      const newAccount = await prisma.kas.create({
        data: {
          deskripsi: kas.deskripsi,
          nama: kas.nama,
          id,
        },
      });
      return response.status(200).json({
        data: decamelizeKeys(newAccount),
        message: 'Kas berhasil dibuat',
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
