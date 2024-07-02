import {
  ReimburseModel,
  ReimburseStatusEnum,
  ReimburseTypeEnum,
} from 'api-hooks/reimburse/model';
import * as Yup from 'yup';

export const ReimburseDetailFormSchema = () =>
  Yup.object({
    id: Yup.string(),
    nama: Yup.string().default('').required(),
    deskripsi: Yup.string().default(''),
    file_url: Yup.mixed(),
    subtotal: Yup.number().default(0).required(),
    peralatan_kantor_id: Yup.string().nullable().default(''),
  });

export const ReimburseFormSchema = () =>
  Yup.object({
    deskripsi: Yup.string().default(''),
    nip_pemohon: Yup.string().default('').required(),
    perjalanan_id: Yup.string().nullable().default(''),
    nip_pic: Yup.string().nullable().default(''),
    jenis: Yup.mixed<ReimburseTypeEnum>()
      .oneOf(Object.values(ReimburseTypeEnum))
      .default(ReimburseTypeEnum.itinerary),
    status: Yup.mixed<ReimburseStatusEnum>()
      .oneOf(Object.values(ReimburseStatusEnum))
      .default(ReimburseStatusEnum.pending),
    details: Yup.array(ReimburseDetailFormSchema()).default([]),
  });

export type ReimburseFormType = Yup.InferType<
  ReturnType<typeof ReimburseFormSchema>
> & {
  data?: ReimburseModel;
};

export const ReimburseFinishFormSchema = () =>
  Yup.object({
    total: Yup.number().default(0).required(),
    deskripsi: Yup.string().default(''),
    kas_id: Yup.string().required().default(''),
    tanggal_pelunasan: Yup.date().default(new Date()).required(),
    pengembalian_id: Yup.string().default(''),
  });

export type ReimburseFinishFormType = Yup.InferType<
  ReturnType<typeof ReimburseFinishFormSchema>
>;

export const ReimburseRejectFormSchema = () =>
  Yup.object({
    deskripsi_penolakan: Yup.string().default('').required(),
    tanggal_penolakan: Yup.date().default(new Date()).required(),
  });

export type ReimburseRejectFormType = Yup.InferType<
  ReturnType<typeof ReimburseRejectFormSchema>
>;
