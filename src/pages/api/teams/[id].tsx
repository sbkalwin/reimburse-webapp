import { decamelizeKeys } from 'humps';
import { NextApiRequest, NextApiResponse } from 'next';
import { middleware, parseValidationError } from 'utils/server';
import * as Yup from 'yup';

import prisma from '../../../../prisma';
import { PegawaiLiteResource } from '../../../../prisma/resources';

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
        Pegawai: {
          select: PegawaiLiteResource,
        },
      },
    });

    if (!currentTeam) {
      return response
        .status(404)
        .json({ message: 'Team tidak dapat ditemukan' });
    }

    if (request.method === 'GET') {
      return response.status(200).json({ data: decamelizeKeys(currentTeam) });
    }

    middleware(request, response, true);

    if (request.method === 'PUT') {
      await teamSchema.validate(body, {
        abortEarly: false,
      });

      const team = teamSchema.cast(body);

      const updateTeam = await prisma.team.update({
        data: {
          nama: team.nama,
          nipLeader: team.nip_leader,
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

    if (request.method === 'DELETE') {
      await prisma.team.delete({ where: { id } });
      await prisma.pegawai.updateMany({
        where: { teamId: id },
        data: {
          teamId: '',
        },
      });
      return response.status(200).json({
        message: 'Team berhasil dihapus',
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
