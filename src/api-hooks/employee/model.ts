import { EmployeeRoleEnum, EmployeeStatusEnum } from 'api-hooks/auth/model';
import { TeamLiteModel } from 'api-hooks/team/model';
import { Expose, Type } from 'class-transformer';

export class EmployeeLiteModel {
  nip: string;
  status: EmployeeStatusEnum;
  peran: EmployeeRoleEnum;
  nama: string;

  @Expose({ name: 'nomor_rekening' })
  nomorRekening: string;

  @Expose({ name: 'tanggal_dibuat' })
  @Type(() => Date)
  tanggalDibuat: Date;

  @Expose({ name: 'tanggal_diubah' })
  @Type(() => Date)
  tanggalDiubah: Date;

  @Expose({ name: 'team_id' })
  teamId: string | null;

  @Type(() => TeamLiteModel)
  team: TeamLiteModel | null;
}

export class EmployeeModel extends EmployeeLiteModel {
  pengembalian: object[];

  @Expose({ name: 'pengembalian_pic' })
  pengembalianPic: object[];
}

export type getEmployeesInput = {
  status?: string;
  role?: string;
};

export type getEmployeeInput = {
  id: string;
};

export type EmployeeMutationInput = {
  nama: string;
  team_id: string;
  status: EmployeeStatusEnum;
  peran: EmployeeRoleEnum;
  kata_sandi: string;
  nomor_rekening: string;
};

export type EmployeeUpdateMutationInput = {
  nip: string;
  data: EmployeeMutationInput;
};

export type EmployeeDeleteMutationInput = {
  nip: string;
};
