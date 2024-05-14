import { EmployeeRoleEnum, EmployeeStatusEnum } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

import * as Yup from 'yup';
import prisma from '../../../../prisma';
import { parseValidationError } from 'utils/server';
import { decamelizeKeys } from 'humps';

const employeeSchema = Yup.object({
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
    const currentUser = await prisma.pegawai.findUnique({
      where: {
        nip,
      },
      include: {
        Pengembalian: true,
        PengembalianPic: true,
        Team: true,
      },
    });

    if (!currentUser) {
      return response
        .status(404)
        .json({ message: 'Pegawai tidak dapat ditemukan' });
    }

    if (request.method === 'PUT') {
      await employeeSchema.validate(body, {
        abortEarly: false,
      });

      const user = employeeSchema.cast(body);

      const updateUser = await prisma.pegawai.update({
        data: {
          ...user,
        },
        where: {
          nip,
        },
      });

      const { kataSandi, ...rest } = updateUser;
      return response.status(200).json({
        data: decamelizeKeys(rest),
        message: 'Pegawai berhasil diubah',
      });
    }

    if (request.method === 'GET') {
      const { kataSandi, ...rest } = currentUser;
      return response.status(200).json({ data: decamelizeKeys(rest) });
    }

    if (request.method === 'DELETE') {
      await prisma.pegawai.delete({ where: { nip } });
      return response.status(200).json({
        message: 'Pegawai berhasil dihapus',
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
