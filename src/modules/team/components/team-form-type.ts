import { TeamModel } from 'api-hooks/team/model';
import * as Yup from 'yup';

export const TeamSchema = () =>
  Yup.object({
    nama: Yup.string().required(),
    nip_leader: Yup.string().nullable().default(''),
  });

export type TeamFormType = Yup.InferType<ReturnType<typeof TeamSchema>> & {
  data?: TeamModel;
};
