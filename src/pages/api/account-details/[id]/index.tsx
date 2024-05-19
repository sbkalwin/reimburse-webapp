import { AccountDetailTypeEnum } from '@prisma/client';
import { decamelizeKeys } from 'humps';
import { NextApiRequest, NextApiResponse } from 'next';
import { middleware, parseValidationError } from 'utils/server';
import * as Yup from 'yup';

import prisma from '../../../../../prisma';
import { KasDetailResource } from '../../../../../prisma/resources';

const kasDetailSchema = Yup.object({
  kas_id: Yup.string().default(''),
  pengembalian_id: Yup.string().default(''),
  deskripsi: Yup.string().default(''),
  jenis: Yup.mixed<AccountDetailTypeEnum>()
    .oneOf(Object.values(AccountDetailTypeEnum))
    .default(AccountDetailTypeEnum.income),
  total: Yup.number().default(0),
});

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  await middleware(request, response, true);
  const id = request.query.id as string;
  const body = request.body;

  try {
    const currentKasDetail = await prisma.kasDetail.findUnique({
      where: {
        id,
      },
      select: KasDetailResource,
    });

    if (!currentKasDetail) {
      return response
        .status(404)
        .json({ message: 'Kas Detail tidak dapat ditemukan' });
    }

    if (request.method === 'GET') {
      return response
        .status(200)
        .json({ data: decamelizeKeys(currentKasDetail) });
    }

    if (request.method === 'PUT') {
      await kasDetailSchema.validate(body, {
        abortEarly: false,
      });

      const kasDetail = kasDetailSchema.cast(body);

      const updateKasDetail = await prisma.kasDetail.update({
        data: {
          kasId: kasDetail.kas_id,
          deskripsi: kasDetail.deskripsi,
          jenis: kasDetail.jenis,
          pengembalianId: kasDetail.pengembalian_id,
          total: kasDetail.total,
        },
        where: {
          id,
        },
        select: KasDetailResource,
      });

      return response.status(200).json({
        data: decamelizeKeys(updateKasDetail),
        message: 'Kas Detail berhasil diubah',
      });
    }

    if (request.method === 'DELETE') {
      await prisma.kasDetail.delete({ where: { id } });
      return response.status(200).json({
        message: 'Kas Detail berhasil dihapus',
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
