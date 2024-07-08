import { decamelizeKeys } from 'humps';
import { NextApiRequest, NextApiResponse } from 'next';
import { getDate, middleware, parseValidationError } from 'utils/server';
import * as Yup from 'yup';

import prisma from '../../../../prisma';
import { PerjalananResource } from '../../../../prisma/resources';

const perjalananSchema = Yup.object({
  nama: Yup.string().required(),
  deskripsi: Yup.string().default(''),
  tanggal_mulai: Yup.date().default(new Date()),
  tanggal_selesai: Yup.date().default(new Date()),
});

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const id = request.query.id as string;
  const body = request.body;

  try {
    const currentPerjalanan = await prisma.perjalanan.findUnique({
      where: {
        id,
      },
      select: PerjalananResource,
    });

    if (!currentPerjalanan) {
      return response
        .status(404)
        .json({ message: 'Perjalanan tidak dapat ditemukan' });
    }

    if (request.method === 'GET') {
      return response
        .status(200)
        .json({ data: decamelizeKeys(currentPerjalanan) });
    }

    await middleware(request, response, true);

    if (request.method === 'PUT') {
      await perjalananSchema.validate(body, {
        abortEarly: false,
      });

      const perjalanan = perjalananSchema.cast(body);

      const updatePerjalanan = await prisma.perjalanan.update({
        data: {
          nama: perjalanan.nama,
          deskripsi: perjalanan.deskripsi,
          tanggalMulai: getDate(perjalanan.tanggal_mulai),
          tanggalSelesai: getDate(perjalanan.tanggal_selesai),
        },
        where: {
          id,
        },
        select: PerjalananResource,
      });

      return response.status(200).json({
        data: decamelizeKeys(updatePerjalanan),
        message: 'Perjalanan berhasil diubah',
      });
    }

    if (request.method === 'DELETE') {
      const pengembalianLength = currentPerjalanan.Pengembalian.length;
      if (pengembalianLength) {
        return response.status(400).json({
          message: `Perjalanan ini memiliki ${pengembalianLength} pengembalian, perjalanan ini tidak dapat dihapus`,
        });
      }

      await prisma.perjalanan.delete({ where: { id } });
      return response.status(200).json({
        message: 'Perjalanan berhasil dihapus',
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
