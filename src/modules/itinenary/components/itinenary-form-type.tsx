import { ItinenaryModel } from 'api-hooks/itinenary/model';
import * as Yup from 'yup';

export const ItinenaryFormSchema = () =>
  Yup.object({
    nama: Yup.string().required(),
    deskripsi: Yup.string().default(''),
    tanggal_mulai: Yup.date().default(new Date()),
    tanggal_selesai: Yup.date().default(new Date()),
  });

export type ItinenaryFormType = Yup.InferType<
  ReturnType<typeof ItinenaryFormSchema>
> & {
  data?: ItinenaryModel;
};
