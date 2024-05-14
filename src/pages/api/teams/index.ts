import { decamelizeKeys } from 'humps';
import { NextApiRequest, NextApiResponse } from 'next';
import { generateId, parseValidationError } from 'utils/server';
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
  const body = request.body;

  try {
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
        message: 'Team Berhasil Dibuat',
      });
    }

    if (request.method === 'GET') {
      const teams = await prisma.team.findMany({});

      return response.status(200).json({ data: decamelizeKeys(teams) });
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