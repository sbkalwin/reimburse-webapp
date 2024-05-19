import { StationeryModel } from 'api-hooks/stationery/model';
import * as Yup from 'yup';

export const StationeryFormSchema = () =>
  Yup.object({
    nama: Yup.string().required(),
    deskripsi: Yup.string().default(''),
    harga: Yup.number().required(),
    file_url: Yup.string().default(''),
  });

export type StationeryFormType = Yup.InferType<
  ReturnType<typeof StationeryFormSchema>
> & {
  data?: StationeryModel;
};
