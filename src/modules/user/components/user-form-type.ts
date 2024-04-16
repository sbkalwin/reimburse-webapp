import { TeamModel } from 'modules/team/components/team-form-type';
import * as Yup from 'yup';
export type EmployeeModel = {
  nip: string;
  nama: string;
  team_id: string;
  team_name: string;
  status: EmployeeStatusEnum;
  peran: EmployeeRoleEnum;
  kata_sandi: string;
  nomor_rekening: string;
  tanggal_dibuat: Date;
  tanggal_diubah: Date;
};

export enum EmployeeStatusEnum {
  active = 'active',
  inactive = 'inactive',
}

export enum EmployeeRoleEnum {
  admin = 'admin',
  user = 'user',
}

export const EmployeeFormSchema = () =>
  Yup.object({
    nip: Yup.string().default(''),
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

export type EmployeeFormType = Yup.InferType<
  ReturnType<typeof EmployeeFormSchema>
> & {
  data?: EmployeeModel;
};

//dummies
export const _teams: Omit<TeamModel, 'nip_leader' | 'nama_leader'>[] = [
  {
    id: '1',
    nama: 'Pajak',
    tanggal_dibuat: new Date(),
    tanggal_diubah: new Date(),
  },
  {
    id: '2',
    nama: 'Pajak A',
    tanggal_dibuat: new Date(),
    tanggal_diubah: new Date(),
  },
  {
    id: '3',
    nama: 'Pajak B',
    tanggal_dibuat: new Date(),
    tanggal_diubah: new Date(),
  },
  {
    id: '4',
    nama: 'Pajak C',
    tanggal_dibuat: new Date(),
    tanggal_diubah: new Date(),
  },
];

export const employees: EmployeeModel[] = [
  {
    team_id: _teams[0].id,
    team_name: _teams[0].nama,
    kata_sandi: '',
    nama: 'Alexander',
    nip: '2211',
    nomor_rekening: '1212121213',
    peran: EmployeeRoleEnum.user,
    status: EmployeeStatusEnum.active,
    tanggal_dibuat: new Date(),
    tanggal_diubah: new Date(),
  },
  {
    team_id: _teams[1].id,
    team_name: _teams[1].nama,
    kata_sandi: '',
    nama: 'Christine',
    nip: '2331',
    nomor_rekening: '1212121213',
    peran: EmployeeRoleEnum.admin,
    status: EmployeeStatusEnum.inactive,
    tanggal_dibuat: new Date(),
    tanggal_diubah: new Date(),
  },
  {
    team_id: _teams[3].id,
    team_name: _teams[3].nama,
    kata_sandi: '',
    nama: 'Alwin',
    nip: '3222',
    nomor_rekening: '1212121213',
    peran: EmployeeRoleEnum.admin,
    status: EmployeeStatusEnum.active,
    tanggal_dibuat: new Date(),
    tanggal_diubah: new Date(),
  },
  {
    team_id: _teams[2].id,
    team_name: _teams[2].nama,
    kata_sandi: '',
    nama: 'Ferdy',
    nip: '4111',
    nomor_rekening: '1212121213',
    peran: EmployeeRoleEnum.user,
    status: EmployeeStatusEnum.inactive,
    tanggal_dibuat: new Date(),
    tanggal_diubah: new Date(),
  },
];
