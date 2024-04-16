import * as Yup from 'yup';
export type ItinenaryModel = {
  id: string;
  nama: string;
  deskripsi: string;
  tanggal_mulai: Date;
  tanggal_selesai: Date;
};

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

export const itinenaries: ItinenaryModel[] = [
  {
    id: '1',
    nama: 'BKK Business Trip',
    deskripsi:
      'Aliquip duis anim eu anim amet dolor exercitation qui aute irure duis nostrud est ex.',
    tanggal_mulai: new Date(),
    tanggal_selesai: new Date(new Date().getTime() + 259200000), // 3 days
  },
  {
    id: '2',
    nama: 'Phuket Business Trip',
    deskripsi:
      'Aliquip duis anim eu anim amet dolor exercitation qui aute irure duis nostrud est ex.',
    tanggal_mulai: new Date(),
    tanggal_selesai: new Date(new Date().getTime() + 259200000), // 3 days
  },
  {
    id: '3',
    nama: 'Germany Business Trip',
    deskripsi:
      'Aliquip duis anim eu anim amet dolor exercitation qui aute irure duis nostrud est ex.',
    tanggal_mulai: new Date(),
    tanggal_selesai: new Date(new Date().getTime() + 259200000), // 3 days
  },
];
