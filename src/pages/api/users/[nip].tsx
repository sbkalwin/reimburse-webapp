import { EmployeeRoleEnum, EmployeeStatusEnum } from '@prisma/client';
import { decamelizeKeys } from 'humps';
import { NextApiRequest, NextApiResponse } from 'next';
import { parseValidationError } from 'utils/server';
import * as Yup from 'yup';

import prisma from '../../../../prisma';

const karyawanSchema = Yup.object({
  // nip: Yup.string().default(''),
  nama: Yup.string().required(),
  team_id: Yup.string().default(''),
  status: Yup.mixed<EmployeeStatusEnum>()
    .oneOf(Object.values(EmployeeStatusEnum))
    .default(EmployeeStatusEnum.active),
  peran: Yup.mixed<EmployeeRoleEnum>()
    .oneOf(Object.values(EmployeeRoleEnum))
    .default(EmployeeRoleEnum.user),
  nomor_rekening: Yup.string().default(''),
});

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const nip = request.query.nip as string;
  const body = request.body;

  try {
    const currentKaryawan = await prisma.pegawai.findUnique({
      where: {
        nip,
      },
      include: {
        Pengembalian: true,
        PengembalianPic: true,
        Team: true,
      },
    });

    if (!currentKaryawan) {
      return response
        .status(404)
        .json({ message: 'Pegawai tidak dapat ditemukan' });
    }

    if (request.method === 'PUT') {
      await karyawanSchema.validate(body, {
        abortEarly: false,
      });

      const user = karyawanSchema.cast(body);

      const updateKaryawan = await prisma.pegawai.update({
        data: {
          ...user,
        },
        where: {
          nip,
        },
      });

      const { kataSandi, ...rest } = updateKaryawan;
      return response.status(200).json({
        data: decamelizeKeys(rest),
        message: 'Pegawai berhasil diubah',
      });
    }

    if (request.method === 'GET') {
      const { kataSandi, ...rest } = currentKaryawan;
      return response.status(200).json({ data: decamelizeKeys(rest) });
    }

    if (request.method === 'DELETE') {
      const pengembalianPicLength = currentKaryawan.PengembalianPic.length;
      const pengembalianLength = currentKaryawan.Pengembalian.length;

      if (pengembalianLength || pengembalianPicLength) {
        return response.status(400).json({
          message: `Pegawai ini memiliki ${pengembalianLength} Pengembalian dan ${pengembalianPicLength} Pengembalian sebagai pic, Karayawan ini tidak dapat dihapus`,
        });
      }

      await prisma.pegawai.delete({ where: { nip } });
      return response.status(200).json({
        message: 'Pegawai berhasil dihapus',
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
