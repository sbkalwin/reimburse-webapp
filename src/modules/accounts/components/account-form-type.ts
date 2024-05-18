import {
  AccountDetailModel,
  AccountDetailTypeEnum,
  AccountModel,
} from 'api-hooks/account/model';
import * as Yup from 'yup';

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
