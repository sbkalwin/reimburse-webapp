import * as Yup from 'yup';

export const ChangePasswordFormSchema = () =>
  Yup.object({
    password_lama: Yup.string().required(),
    password_baru: Yup.string().required(),
    konfirmasi_password_baru: Yup.string()
      .required()
      .oneOf([Yup.ref('password_baru')], 'Password tidak cocok'),
  });

export type ChangePasswordFormType = Yup.InferType<
  ReturnType<typeof ChangePasswordFormSchema>
>;
