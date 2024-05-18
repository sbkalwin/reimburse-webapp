import { EmployeeRoleEnum, EmployeeStatusEnum } from 'api-hooks/auth/model';
import { CommonModel } from 'api-hooks/common/model';
import { Expose, Type } from 'class-transformer';

export class TeamLiteModel extends CommonModel {
  nama: string;

  @Expose({ name: 'nip_leader' })
  nipLeader: string | null;
}

export class TeamEmployeeModel {
  nip: string;
  nama: string;
  status: EmployeeStatusEnum;
  peran: EmployeeRoleEnum;

  @Expose({ name: 'nomor_rekening' })
  nomorRekening: string | null;

  @Expose({ name: 'tanggal_dibuat' })
  @Type(() => Date)
  tanggalDibuat: Date;

  @Expose({ name: 'tanggal_diubah' })
  @Type(() => Date)
  tanggalDiubah: Date;
}
export class TeamModel extends TeamLiteModel {
  @Type(() => TeamEmployeeModel)
  pegawai: TeamEmployeeModel[];
}

export type getTeamsInput = object;

export type getTeamInput = {
  id: string;
};

export type TeamMutationInput = {
  nama: string;
  nip_leader: string | null;
};

export type TeamUpdateMutationInput = {
  id: string;
  data: TeamMutationInput;
};

export type TeamDeleteMutationInput = {
  id: string;
};
