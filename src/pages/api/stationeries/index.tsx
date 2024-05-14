import { decamelizeKeys } from 'humps';
import { NextApiRequest, NextApiResponse } from 'next';
import { generateId, parseValidationError } from 'utils/server';
import * as Yup from 'yup';

import prisma from '../../../../prisma';

const peralatanKantorFormSchema = Yup.object({
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
  const body = request.body;
  try {
    if (request.method === 'GET') {
      const peralatanKantor = await prisma.peralatanKantor.findMany({
        include: {
          DetailPengembalian: true,
        },
      });
      return response.status(200).json({
        data: decamelizeKeys(peralatanKantor),
      });
    }

    if (request.method === 'POST') {
      const peralatanKantor = await peralatanKantorFormSchema.validate(body);
      const id = generateId();
      const newAccount = await prisma.peralatanKantor.create({
        data: {
          fileUrl: peralatanKantor.file_url,
          harga: peralatanKantor.harga,
          nama: peralatanKantor.nama,
          id,
        },
      });
      return response.status(200).json({
        data: decamelizeKeys(newAccount),
        message: 'Peralatan Kantor berhasil Ditambah',
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
