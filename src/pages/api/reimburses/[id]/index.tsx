import { ReimburseTypeEnum } from '@prisma/client';
import { decamelizeKeys } from 'humps';
import { NextApiRequest, NextApiResponse } from 'next';
import { generateId, parseValidationError } from 'utils/server';
import * as Yup from 'yup';

import prisma from '../../../../../prisma';
import { ReimburseResource } from '../../../../../prisma/resources';

const reimburseDetailSchema = Yup.object({
  nama: Yup.string().default('').required(),
  deskripsi: Yup.string().default(''),
  file_url: Yup.string().default(''),
  subtotal: Yup.number().default(0).required(),
  peralatan_kantor_id: Yup.string().nullable().default(''),
});

const reimburseSchema = Yup.object({
  deskripsi: Yup.string().default(''),
  nip_pemohon: Yup.string().default('').required(),
  perjalanan_id: Yup.string().nullable().default(''),
  nip_pic: Yup.string().nullable().default(''),
  jenis: Yup.mixed<ReimburseTypeEnum>()
    .oneOf(Object.values(ReimburseTypeEnum))
    .default(ReimburseTypeEnum.itinerary),
  details: Yup.array(reimburseDetailSchema).default([]),
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

    if (request.method === 'GET') {
      return response
        .status(200)
        .json({ data: decamelizeKeys(currentPengembalian) });
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
      //
      await reimburseSchema.validate(body, {
        abortEarly: false,
      });

      const pengembalian = reimburseSchema.cast(body);

      await prisma.detailPengembalian.deleteMany({
        where: { pengembalianId: id },
      });

      const details = pengembalian.details.map((detail) => {
        const detailId = generateId();
        return {
          deskripsi: detail.deskripsi,
          fileUrl: detail.file_url,
          pengembalianId: id,
          nama: detail.nama,
          subtotal: detail.subtotal,
          id: detailId,
          peralatanKantorId: detail.peralatan_kantor_id,
          jenis: pengembalian.jenis,
        };
      });

      const updatePengembalian = await prisma.pengembalian.update({
        data: {
          deskripsi: pengembalian.deskripsi,
          jenis: pengembalian.jenis,
          nipPemohon: pengembalian.nip_pemohon,
          nipPic: pengembalian.nip_pic,
          perjalananId: pengembalian.perjalanan_id,
        },
        where: {
          id,
        },
        select: ReimburseResource,
      });

      await prisma.detailPengembalian.createMany({
        data: details,
      });

      return response.status(200).json({
        data: decamelizeKeys(updatePengembalian),
        message: 'Pengembalian berhasil diubah',
      });
    }

    if (request.method === 'DELETE') {
      if (notAllowed) {
        return response
          .status(400)
          .json({ message: 'Pengembalian tidak dapat dihapus' });
      }

      await prisma.pengembalian.delete({ where: { id } });
      await prisma.detailPengembalian.deleteMany({
        where: { pengembalianId: id },
      });
      return response.status(200).json({
        message: 'Pengembalian berhasil dihapus',
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
