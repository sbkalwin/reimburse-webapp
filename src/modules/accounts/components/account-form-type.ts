import {
  ReimburseModel,
  reimburses,
} from 'modules/reimburse/components/reimburse-form-type';
import * as Yup from 'yup';

export enum AccountDetailTypeEnum {
  outcome = 'outcome',
  income = 'income',
}

export type AccountDetailModel = {
  id: string;
  kas_id: string;
  reimburse: ReimburseModel | null;
  deskripsi: string;
  jenis: AccountDetailTypeEnum;
  total: number;
  tanggal_dibuat: Date;
  tanggal_diubah: Date;
};

export type AccountModel = {
  id: string;
  nama: string;
  deskripsi: string;
  tanggal_dibuat: Date;
  tanggal_diubah: Date;
  details: AccountDetailModel[];
};

export const AccountDetailFormSchema = () =>
  Yup.object({
    kas_id: Yup.string().default(''),
    reimburse_id: Yup.string().default(''),
    deskripsi: Yup.string().default(''),
    jenis: Yup.mixed<AccountDetailTypeEnum>()
      .oneOf(Object.values(AccountDetailTypeEnum))
      .default(AccountDetailTypeEnum.income),
    total: Yup.number().default(0),
  });

export const AccountFormSchema = () =>
  Yup.object({
    nama: Yup.string().required(),
    deskripsi: Yup.string().default(''),
  });

export type AccountFormType = Yup.InferType<
  ReturnType<typeof AccountFormSchema>
> & {
  data?: AccountModel;
};

export type AccountDetailFormType = Yup.InferType<
  ReturnType<typeof AccountDetailFormSchema>
> & {
  data?: AccountDetailModel;
};

export const accountDetails: AccountDetailModel[] = [
  {
    id: '1',
    kas_id: '1',
    deskripsi:
      'Voluptate deserunt sunt aliquip ullamco nulla occaecat laboris ullamco occaecat qui.',
    reimburse: null,
    tanggal_dibuat: new Date(),
    tanggal_diubah: new Date(),
    total: 1200000,
    jenis: AccountDetailTypeEnum.income,
  },
  {
    id: '2',
    kas_id: '1',
    deskripsi:
      'Voluptate deserunt sunt aliquip ullamco nulla occaecat laboris ullamco occaecat qui.',
    reimburse: reimburses[0],
    tanggal_dibuat: new Date(),
    tanggal_diubah: new Date(),
    total: 1300000,
    jenis: AccountDetailTypeEnum.outcome,
  },
  {
    id: '3',
    kas_id: '1',
    deskripsi:
      'Voluptate deserunt sunt aliquip ullamco nulla occaecat laboris ullamco occaecat qui.',
    reimburse: null,
    tanggal_dibuat: new Date(),
    tanggal_diubah: new Date(),
    total: 1400000,
    jenis: AccountDetailTypeEnum.income,
  },
];

export const accounts: AccountModel[] = [
  {
    id: '1',
    nama: 'Kas Kecil',
    deskripsi:
      'Aliquip duis anim eu anim amet dolor exercitation qui aute irure duis nostrud est ex.',
    tanggal_dibuat: new Date(),
    tanggal_diubah: new Date(),
    details: accountDetails,
  },
  {
    id: '2',
    nama: 'Kas Besar',
    deskripsi:
      'Aliquip duis anim eu anim amet dolor exercitation qui aute irure duis nostrud est ex.',
    tanggal_dibuat: new Date(),
    tanggal_diubah: new Date(),
    details: accountDetails,
  },
  {
    id: '3',
    nama: 'Kas Biasa',
    deskripsi:
      'Aliquip duis anim eu anim amet dolor exercitation qui aute irure duis nostrud est ex.',
    tanggal_dibuat: new Date(),
    tanggal_diubah: new Date(),
    details: accountDetails,
  },
];
