import { EmployeeRoleEnum, EmployeeStatusEnum } from '@prisma/client';
import { decamelizeKeys } from 'humps';
import { NextApiRequest, NextApiResponse } from 'next';
import { generateId, parseValidationError } from 'utils/server';
import * as Yup from 'yup';

import prisma from '../../../../prisma';

const pegawaiSchema = Yup.object({
  // nip: Yup.string().default(''),
  nama: Yup.string().required(),
  team_id: Yup.string().default(''),
  status: Yup.mixed<EmployeeStatusEnum>()
    .oneOf(Object.values(EmployeeStatusEnum))
    .default(EmployeeStatusEnum.active),
  peran: Yup.mixed<EmployeeRoleEnum>()
    .oneOf(Object.values(EmployeeRoleEnum))
    .default(EmployeeRoleEnum.user),
  kata_sandi: Yup.string().default(''),
  nomor_rekening: Yup.string().default(''),
});

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const body = request.body;
  const role = request.query.role as EmployeeRoleEnum | undefined;
  const status = request.query.status as EmployeeStatusEnum | undefined;
  try {
    if (request.method === 'POST') {
      const nip = generateId(5);
      const user = await pegawaiSchema.validate(body);

      const newPegawai = await prisma.pegawai.create({
        data: {
          kataSandi: user.kata_sandi,
          nip,
          nomorRekening: user.nomor_rekening,
          peran: user.peran,
          status: user.status,
          teamId: user.team_id,
          nama: user.nama,
        },
      });
      const { kataSandi, ...rest } = newPegawai;
      return response.status(200).json({
        data: decamelizeKeys(rest),
        message: 'Pegawai Berhasil Ditambah',
      });
    }

    if (request.method === 'GET') {
      const users = (
        await prisma.pegawai.findMany({
          where: {
            peran: role,
            status,
          },
          include: {
            Team: {
              select: {
                id: true,
                nama: true,
                tanggalDibuat: true,
                tanggalDiubah: true,
              },
            },
          },
        })
      ).map(({ kataSandi, ...rest }) => {
        return rest;
      });

      return response.status(200).json({ data: decamelizeKeys(users) });
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
