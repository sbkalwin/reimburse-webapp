import * as Yup from 'yup';

export enum ReimburseStatusEnum {
  pending = 'pending',
  finished = 'finished',
  rejected = 'rejected',
}
export enum ReimburseTypeEnum {
  itinerary = 'itinerary',
  stationery = 'stationery',
}

export type ReimburseDetailModel = {
  id: string;
  peralatan_kantor_id: string | null;
  nama: string;
  deskripsi: string;
  file_url: string;
  subtotal: number;
};

export type ReimburseModel = {
  id: string;
  perjalanan_id: string | null;
  deskripsi: string;
  status: ReimburseStatusEnum;
  jenis: ReimburseTypeEnum;
  nip_pemohon: string; // yang minta reimburse
  nip_pic: string | null; //penanggung jawab (yg acc reimburse)
  tanggal_dibuat: Date;
  tanggal_diubah: Date;
  tanggal_pelunasan: Date | null;
  total_pelunasan: number | null;
  tanggal_penolakan: Date | null;
  deskripsi_penolakan: string | null;

  details: ReimburseDetailModel[];
};

export const ReimburseDetailFormSchema = () =>
  Yup.object({
    id: Yup.string(),
    nama: Yup.string().default('').required(),
    deskripsi: Yup.string().default(''),
    file_url: Yup.string().default(''),
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
