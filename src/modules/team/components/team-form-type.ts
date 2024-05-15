import * as Yup from 'yup';

export type TeamModel = {
  id: string;
  nama: string;
  nip_leader: string;
  nama_leader: string;
  tanggal_dibuat: Date;
  tanggal_diubah: Date;
};

export const TeamSchema = () =>
  Yup.object({
    nama: Yup.string().required(),
    nip_leader: Yup.string().nullable().default(''),
  });

export type TeamFormType = Yup.InferType<ReturnType<typeof TeamSchema>> & {
  data?: TeamModel;
};
