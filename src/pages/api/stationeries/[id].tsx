import { decamelizeKeys } from 'humps';
import { NextApiRequest, NextApiResponse } from 'next';
import { parseValidationError } from 'utils/server';
import * as Yup from 'yup';

import prisma from '../../../../prisma';

const peralatanKantorSchema = Yup.object({
  nama: Yup.string().required(),
  deskripsi: Yup.string().default(''),
  tanggal_diperbarui: Yup.date().default(new Date()),
  harga: Yup.number().required(),
  file_url: Yup.string().default(''),
});

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const id = request.query.id as string;
  const body = request.body;

  try {
    const currentKas = await prisma.peralatanKantor.findUnique({
      where: {
        id,
      },
      include: {
        DetailPengembalian: true,
      },
    });

    if (!currentKas) {
      return response
        .status(404)
        .json({ message: 'Peralatan Kantor tidak dapat ditemukan' });
    }

    if (request.method === 'PUT') {
      await peralatanKantorSchema.validate(body, {
        abortEarly: false,
      });

      const peralatanKantor = peralatanKantorSchema.cast(body);

      const updatePeralatanKantor = await prisma.peralatanKantor.update({
        data: {
          fileUrl: peralatanKantor.file_url,
          harga: peralatanKantor.harga,
          nama: peralatanKantor.nama,
        },
        where: {
          id,
        },
      });

      return response.status(200).json({
        data: decamelizeKeys(updatePeralatanKantor),
        message: 'Peralatan Kantor berhasil diubah',
      });
    }

    if (request.method === 'GET') {
      return response.status(200).json({ data: decamelizeKeys(currentKas) });
    }

    if (request.method === 'DELETE') {
      await prisma.peralatanKantor.delete({ where: { id } });
      return response.status(200).json({
        message: 'Peralatan Kantor berhasil dihapus',
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
