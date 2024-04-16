import * as Yup from 'yup';
export type StationeryModel = {
  id: string;
  nama: string;
  deskripsi: string;
  file_url: string;
  harga: number;
  tanggal_diperbarui: Date;
};

export const StationeryFormSchema = () =>
  Yup.object({
    nama: Yup.string().required(),
    deskripsi: Yup.string().default(''),
    tanggal_diperbarui: Yup.date().default(new Date()),
    harga: Yup.number().required(),
    file_url: Yup.string().default(''),
  });

export type StationeryFormType = Yup.InferType<
  ReturnType<typeof StationeryFormSchema>
> & {
  data?: StationeryModel;
};

export const stationeries: StationeryModel[] = [
  {
    id: '1',
    nama: 'Stapler',
    deskripsi:
      'Aliquip duis anim eu anim amet dolor exercitation qui aute irure duis nostrud est ex.',
    tanggal_diperbarui: new Date(),
    harga: 18000,
    file_url: '',
  },
  {
    id: '2',
    nama: 'Buku',
    deskripsi:
      'Aliquip duis anim eu anim amet dolor exercitation qui aute irure duis nostrud est ex.',
    tanggal_diperbarui: new Date(),
    harga: 5000,
    file_url: '',
  },
  {
    id: '3',
    nama: 'Pen',
    deskripsi:
      'Aliquip duis anim eu anim amet dolor exercitation qui aute irure duis nostrud est ex.',
    tanggal_diperbarui: new Date(),
    harga: 3000,
    file_url: '',
  },
];
