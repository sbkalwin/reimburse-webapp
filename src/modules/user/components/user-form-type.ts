import { EmployeeRoleEnum, EmployeeStatusEnum } from 'api-hooks/auth/model';
import { EmployeeLiteModel, EmployeeModel } from 'api-hooks/employee/model';
import * as Yup from 'yup';

export const EmployeeFormSchema = () =>
  Yup.object({
    nip: Yup.string().default(''),
    nama: Yup.string().required(),
    team_id: Yup.string().default(''),
    status: Yup.mixed<EmployeeStatusEnum>()
      .oneOf(Object.values(EmployeeStatusEnum))
      .default(EmployeeStatusEnum.active),
    peran: Yup.mixed<EmployeeRoleEnum>()
      .oneOf(Object.values(EmployeeRoleEnum))
      .default(EmployeeRoleEnum.user),
    kata_sandi: Yup.string().default(''),
    nomor_rekening: Yup.string().default(''),
  });

export type EmployeeFormType = Yup.InferType<
  ReturnType<typeof EmployeeFormSchema>
> & {
  data?: EmployeeModel | EmployeeLiteModel;
};
