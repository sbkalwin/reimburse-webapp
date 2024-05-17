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
    const currentPeralatanKantor = await prisma.peralatanKantor.findUnique({
      where: {
        id,
      },
      include: {
        DetailPengembalian: true,
      },
    });

    if (!currentPeralatanKantor) {
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
          deskripsi: peralatanKantor.deskripsi,
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
      const { DetailPengembalian, ...rest } = currentPeralatanKantor;
      return response.status(200).json({ data: decamelizeKeys(rest) });
    }

    if (request.method === 'DELETE') {
      const peralatanKantorLength =
        currentPeralatanKantor.DetailPengembalian.length;

      if (peralatanKantorLength) {
        return response.status(400).json({
          message: `Peralatan Kantor ini memiliki ${peralatanKantorLength} pengembalian, peralatan kantor ini tidak dapat dihapus`,
        });
      }
      await prisma.peralatanKantor.delete({ where: { id } });
      return response.status(200).json({
        message: 'Peralatan Kantor berhasil dihapus',
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
