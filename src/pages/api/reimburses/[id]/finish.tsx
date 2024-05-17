import { decamelizeKeys } from 'humps';
import { NextApiRequest, NextApiResponse } from 'next';
import { generateId, parseValidationError } from 'utils/server';
import * as Yup from 'yup';

import prisma from '../../../../../prisma';
import {
  KasLiteResource,
  ReimburseResource,
} from '../../../../../prisma/resources';

export const reimburseFinishFormSchema = Yup.object({
  total: Yup.number().default(0).required(),
  deskripsi: Yup.string().default(''),
  kas_id: Yup.string().required().default(''),
  tanggal_pelunasan: Yup.date().default(new Date()).required(),
  pengembalian_id: Yup.string().default(''),
});

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const id = request.query.id as string;
  const body = request.body;

  try {
    const currentPengembalian = await prisma.pengembalian.findUnique({
      where: {
        id,
      },
      select: ReimburseResource,
    });

    if (!currentPengembalian) {
      return response
        .status(404)
        .json({ message: 'Pengembalian tidak dapat ditemukan' });
    }

    const notAllowed =
      currentPengembalian.status === 'finished' ||
      currentPengembalian.status === 'rejected';

    if (request.method === 'PUT') {
      if (notAllowed) {
        return response
          .status(400)
          .json({ message: 'Pengembalian tidak dapat diubah' });
      }

      await reimburseFinishFormSchema.validate(body, {
        abortEarly: false,
      });

      const pengembalian = reimburseFinishFormSchema.cast(body);

      const updatePengembalian = await prisma.pengembalian.update({
        where: {
          id,
        },
        data: {
          status: 'finished',
          tanggalPelunasan: pengembalian.tanggal_pelunasan,
          totalPelunasan: pengembalian.total,
        },
        select: ReimburseResource,
      });

      const idKas = generateId();

      const createKasDetail = await prisma.kasDetail.create({
        data: {
          deskripsi: pengembalian.deskripsi,
          kasId: pengembalian.kas_id,
          jenis: 'outcome',
          pengembalianId: pengembalian.pengembalian_id,
          total: pengembalian.total,
          id: idKas,
        },
        select: KasLiteResource,
      });

      return response.status(200).json({
        data: decamelizeKeys({
          pengembalian: updatePengembalian,
          kasDetail: createKasDetail,
        }),
        message: 'Pengembalian telah selesai',
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
