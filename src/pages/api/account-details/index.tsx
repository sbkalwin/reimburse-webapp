import { AccountDetailTypeEnum } from '@prisma/client';
import { decamelizeKeys } from 'humps';
import { NextApiRequest, NextApiResponse } from 'next';
import { generateId, parseValidationError } from 'utils/server';
import * as Yup from 'yup';

import prisma from '../../../../prisma';
import { KasDetailLiteResource } from '../../../../prisma/resources';

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
  const body = request.body;
  try {
    if (request.method === 'GET') {
      const kasDetail = await prisma.kasDetail.findMany({
        select: KasDetailLiteResource,
      });
      return response.status(200).json({
        data: decamelizeKeys(kasDetail),
      });
    }

    if (request.method === 'POST') {
      const kasDetail = await kasDetailSchema.validate(body);
      const id = generateId();
      const newAccount = await prisma.kasDetail.create({
        data: {
          deskripsi: kasDetail.deskripsi,
          jenis: kasDetail.jenis,
          total: kasDetail.total,
          kasId: kasDetail.kas_id,
          pengembalianId: kasDetail.kas_id,
          id,
        },
        select: KasDetailLiteResource,
      });
      return response.status(200).json({
        data: decamelizeKeys(newAccount),
        message: 'Kas Detail berhasil Ditambah',
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
