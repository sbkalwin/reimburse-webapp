import { decamelizeKeys } from 'humps';
import { NextApiRequest, NextApiResponse } from 'next';
import { middleware, parseValidationError } from 'utils/server';
import * as Yup from 'yup';

import prisma from '../../../../../prisma';
import { KasResource } from '../../../../../prisma/resources';

const kasSchema = Yup.object({
  nama: Yup.string().required(),
  deskripsi: Yup.string().default(''),
});

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const id = request.query.id as string;
  const body = request.body;
  middleware(request, response, true);

  try {
    const currentKas = await prisma.kas.findUnique({
      where: {
        id,
      },
      select: KasResource,
    });

    if (!currentKas) {
      return response
        .status(404)
        .json({ message: 'Kas tidak dapat ditemukan' });
    }

    if (request.method === 'PUT') {
      await kasSchema.validate(body, {
        abortEarly: false,
      });

      const kas = kasSchema.cast(body);

      const updateKas = await prisma.kas.update({
        data: {
          nama: kas.nama,
          deskripsi: kas.deskripsi,
        },
        where: {
          id,
        },
        select: KasResource,
      });

      return response.status(200).json({
        data: decamelizeKeys(updateKas),
        message: 'Kas berhasil diubah',
      });
    }

    if (request.method === 'GET') {
      return response.status(200).json({ data: decamelizeKeys(currentKas) });
    }

    if (request.method === 'DELETE') {
      await prisma.kas.delete({ where: { id } });
      await prisma.kasDetail.delete({ where: { id } });
      return response.status(200).json({
        message: 'Kas berhasil dihapus',
      });
    }
  } catch (e) {
    const validationError = JSON.stringify(e);
    const errors = parseValidationError(validationError);
    return response.status(errors ? 400 : 500).json({
      message: e.message,
      errors,
    });
  }
}
