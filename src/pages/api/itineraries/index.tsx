import { decamelizeKeys } from 'humps';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  generateId,
  getDate,
  getFilterDate,
  middleware,
  parseValidationError,
} from 'utils/server';
import * as Yup from 'yup';

import prisma from '../../../../prisma';
import { PerjalananLiteResource } from '../../../../prisma/resources';

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
  const body = request.body;
  const tanggal_mulai = request.query.tanggal_mulai as string | undefined;
  const tanggal_selesai = request.query.tanggal_selesai as string | undefined;
  const nama = request.query.nama as string | undefined;

  try {
    const tanggalMulai = getFilterDate(tanggal_mulai);
    const tanggalSelesai = getFilterDate(tanggal_selesai);

    const filterRange =
      tanggalMulai && tanggalSelesai
        ? {
            tanggalMulai: {
              gte: getFilterDate(tanggal_mulai),
            },
            tanggalSelesai: {
              lte: getFilterDate(tanggal_selesai),
            },
          }
        : undefined;

    const filterTanggalMulai = tanggalSelesai
      ? undefined
      : {
          equals: getFilterDate(tanggal_mulai),
        };

    const filterTanggalSelesai = tanggalMulai
      ? undefined
      : {
          equals: getFilterDate(tanggal_selesai),
        };

    if (request.method === 'GET') {
      const perjalanan = await prisma.perjalanan.findMany({
        where: {
          AND: filterRange,
          tanggalMulai: filterTanggalMulai,
          tanggalSelesai: filterTanggalSelesai,
          nama: {
            contains: nama,
            mode: 'insensitive',
          },
        },
        select: PerjalananLiteResource,
      });

      return response.status(200).json({ data: decamelizeKeys(perjalanan) });
    }
    middleware(request, response, true);
    if (request.method === 'POST') {
      const id = generateId();
      const perjalanan = await perjalananSchema.validate(body);

      const newPerjalanan = await prisma.perjalanan.create({
        data: {
          id,
          deskripsi: perjalanan.deskripsi,
          nama: perjalanan.nama,
          tanggalMulai: getDate(perjalanan.tanggal_mulai),
          tanggalSelesai: getDate(perjalanan.tanggal_selesai),
        },
        select: PerjalananLiteResource,
      });
      return response.status(200).json({
        data: decamelizeKeys(newPerjalanan),
        message: 'Perjalanan Berhasil Ditambah',
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
