import { CommonModel } from 'api-hooks/common/model';
import { Expose } from 'class-transformer';

export enum EmployeeStatusEnum {
  active = 'active',
  inactive = 'inactive',
}

export enum EmployeeRoleEnum {
  admin = 'admin',
  user = 'user',
}

export class EmployeeModel extends CommonModel {
  nip: string;
  nama: string;
  status: EmployeeStatusEnum;
  peran: EmployeeRoleEnum;

  @Expose({ name: 'kata_sandi' })
  kataSandi: string;

  @Expose({ name: 'nomor_rekening' })
  nomorRekening: string;

  @Expose({ name: 'team_id' })
  teamId: string;
}

export class TokenResultModel {
  token: string;
}

export type loginMutationInput = {
  nip: string;
  kata_sandi: string;
};
