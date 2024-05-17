import { ReimburseStatusEnum, ReimburseTypeEnum } from '@prisma/client';
import { decamelizeKeys } from 'humps';
import { NextApiRequest, NextApiResponse } from 'next';
import { generateId, getFilterDate, parseValidationError } from 'utils/server';
import * as Yup from 'yup';

import prisma from '../../../../prisma';
import { ReimburseLiteResource } from '../../../../prisma/resources';

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
  status: Yup.mixed<ReimburseStatusEnum>()
    .oneOf(Object.values(ReimburseStatusEnum))
    .default(ReimburseStatusEnum.pending),
  details: Yup.array(reimburseDetailSchema).default([]),
});

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const body = request.body;
  const nip_pemohon = request.query.nip_pemohon as string | undefined;

  const tanggal_mulai = request.query.tanggal_mulai as string | undefined;
  const tanggal_selesai = request.query.tanggal_selesai as string | undefined;

  try {
    if (request.method === 'GET') {
      const pengembalian = await prisma.pengembalian.findMany({
        select: ReimburseLiteResource,
        where: {
          nipPemohon: nip_pemohon,
          tanggalDibuat: {
            lte: getFilterDate(tanggal_selesai),
            gte: getFilterDate(tanggal_mulai),
          },
        },
      });
      return response.status(200).json({
        data: decamelizeKeys(pengembalian),
      });
    }

    if (request.method === 'POST') {
      const pengembalian = await reimburseSchema.validate(body);
      const id = generateId();
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

      const newReimburse = await prisma.pengembalian.create({
        data: {
          id,
          status: 'pending',
          jenis: pengembalian.jenis,
          nipPemohon: pengembalian.nip_pemohon,
          deskripsi: pengembalian.deskripsi,
          perjalananId: pengembalian.perjalanan_id,
          nipPic: pengembalian.nip_pic,
          DetailPengembalian: {
            createMany: {
              data: details,
            },
          },
        },
        select: ReimburseLiteResource,
      });

      return response.status(200).json({
        data: decamelizeKeys({
          newReimburse,
        }),
        message: 'Pengembalian berhasil Ditambah',
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
