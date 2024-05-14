import { decamelizeKeys } from 'humps';
import { NextApiRequest, NextApiResponse } from 'next';
import { parseValidationError } from 'utils/server';
import * as Yup from 'yup';

import prisma from '../../../../prisma';

const teamSchema = Yup.object({
  nama: Yup.string().required(),
  nip_leader: Yup.string().nullable().default(''),
});

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const id = request.query.id as string;
  const body = request.body;

  try {
    const currentTeam = await prisma.team.findUnique({
      where: {
        id,
      },
      include: {
        Pegawai: true,
      },
    });

    if (!currentTeam) {
      return response
        .status(404)
        .json({ message: 'Team tidak dapat ditemukan' });
    }

    if (request.method === 'PUT') {
      await teamSchema.validate(body, {
        abortEarly: false,
      });

      const team = teamSchema.cast(body);

      const updateTeam = await prisma.team.update({
        data: {
          ...team,
        },
        where: {
          id,
        },
      });

      return response.status(200).json({
        data: decamelizeKeys(updateTeam),
        message: 'Team berhasil diubah',
      });
    }

    if (request.method === 'GET') {
      return response.status(200).json({ data: decamelizeKeys(currentTeam) });
    }

    if (request.method === 'DELETE') {
      await prisma.team.delete({ where: { id } });
      return response.status(200).json({
        message: 'Team berhasil dihapus',
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
