import * as Yup from 'yup';

export const LoginFormSchema = () =>
  Yup.object({
    nip: Yup.string().required(),
    kata_sandi: Yup.string().required(),
  });

export type LoginFormType = Yup.InferType<ReturnType<typeof LoginFormSchema>>;
