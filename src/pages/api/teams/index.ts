import { decamelizeKeys } from 'humps';
import { NextApiRequest, NextApiResponse } from 'next';
import { generateId, middleware, parseValidationError } from 'utils/server';
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
  const body = request.body;

  try {
    if (request.method === 'GET') {
      const teams = await prisma.team.findMany({
        include: {
          Pegawai: {
            select: PegawaiLiteResource,
          },
        },
      });
      return response.status(200).json({ data: decamelizeKeys(teams) });
    }

    await middleware(request, response, true);

    if (request.method === 'POST') {
      const id = generateId();
      const team = await teamSchema.validate(body);

      const newTeam = await prisma.team.create({
        data: {
          id,
          nipLeader: team.nip_leader,
          nama: team.nama,
        },
      });
      return response.status(200).json({
        data: decamelizeKeys(newTeam),
        message: 'Team Berhasil Ditambah',
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
