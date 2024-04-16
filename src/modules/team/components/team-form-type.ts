import { employees } from 'modules/user/components/user-form-type';
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

//dummies
export const teams: TeamModel[] = [
  {
    id: '1',
    nama: 'Pajak',
    nip_leader: employees[0].nip,
    nama_leader: [employees[0].nip, employees[0].nama].join(' - '),
    tanggal_dibuat: new Date(),
    tanggal_diubah: new Date(),
  },
  {
    id: '2',
    nama: 'Pajak A',
    nip_leader: employees[1].nip,
    nama_leader: [employees[1].nip, employees[1].nama].join(' - '),
    tanggal_dibuat: new Date(),
    tanggal_diubah: new Date(),
  },
  {
    id: '3',
    nama: 'Pajak B',
    nip_leader: employees[2].nip,
    nama_leader: [employees[2].nip, employees[2].nama].join(' - '),
    tanggal_dibuat: new Date(),
    tanggal_diubah: new Date(),
  },
  {
    id: '4',
    nama: 'Pajak C',
    nip_leader: employees[3].nip,
    nama_leader: [employees[3].nip, employees[3].nama].join(' - '),
    tanggal_dibuat: new Date(),
    tanggal_diubah: new Date(),
  },
];
