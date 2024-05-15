import { ReimburseModel } from 'modules/reimburse/components/reimburse-form-type';
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
    pengembalian_id: Yup.string().default(''),
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
