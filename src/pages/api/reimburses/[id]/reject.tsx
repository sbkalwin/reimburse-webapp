import { decamelizeKeys } from 'humps';
import { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { middleware, parseValidationError } from 'utils/server';
import * as Yup from 'yup';

import prisma from '../../../../../prisma';
import { ReimburseResource } from '../../../../../prisma/resources';

export const reimburseRejectFormSchema = Yup.object({
  deskripsi_penolakan: Yup.string().default('').required(),
  tanggal_penolakan: Yup.date().default(new Date()).required(),
});

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const id = request.query.id as string;
  const body = request.body;
  const user = (await middleware(request, response, true)) as JwtPayload;

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

      await reimburseRejectFormSchema.validate(body, {
        abortEarly: false,
      });

      const pengembalian = reimburseRejectFormSchema.cast(body);

      const updatePengembalian = await prisma.pengembalian.update({
        where: {
          id,
        },
        data: {
          status: 'rejected',
          deskripsiPenolakan: pengembalian.deskripsi_penolakan,
          tanggalPenolakan: pengembalian.tanggal_penolakan,
          nipPic: user.nip,
        },
        select: ReimburseResource,
      });

      return response.status(200).json({
        data: decamelizeKeys(updatePengembalian),
        message: 'Pengembalian berhasil ditolak',
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
