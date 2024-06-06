import { CommonModel } from 'api-hooks/common/model';
import { ReimburseLiteModel } from 'api-hooks/reimburse/model';
import { Expose, Type } from 'class-transformer';

export enum AccountDetailTypeEnum {
  outcome = 'outcome',
  income = 'income',
}

export class AccountLiteModel extends CommonModel {
  nama: string;
  deskripsi: string;
}

export class AccountDetailLiteModel extends CommonModel {
  deskripsi: string;
  jenis: AccountDetailTypeEnum;

  @Expose({ name: 'kas_id' })
  kasId: string;

  @Expose({ name: 'pengembalian_id' })
  pengembalianId: string;

  total: number;
}

export class AccountDetailModel extends CommonModel {
  deskripsi: string;
  jenis: AccountDetailTypeEnum;

  @Expose({ name: 'kas_id' })
  kasId: string;

  @Expose({ name: 'pengembalian_id' })
  pengembalianId: string;

  total: number;

  @Type(() => AccountLiteModel)
  kas: AccountLiteModel;

  @Type(() => ReimburseLiteModel)
  pengembalian: ReimburseLiteModel;
}

export class AccountModel extends AccountLiteModel {
  @Type(() => AccountDetailLiteModel)
  @Expose({ name: 'detail_pengembalian' })
  detailPengembalian: AccountDetailLiteModel[];
}

export type getAccountsInput = object;
export type getAccountDetailsInput = {
  kas_id?: string;
  tanggal_mulai?: Date;
  tanggal_selesai?: Date;
};

export type getAccountInput = {
  id: string;
};

export type getAccountDetailInput = {
  id?: string;
};

export type AccountDetailMutationInput = {
  kas_id: string;
  pengembalian_id: string;
  total: number;
  deskripsi: string;
  jenis: AccountDetailTypeEnum;
};

export type AccountMutationInput = {
  deskripsi: string;
  nama: string;
};

export type AccountUpdateMutationInput = {
  id: string;
  data: AccountMutationInput;
};

export type AccountDetailUpdateMutationInput = {
  id: string;
  data: AccountDetailMutationInput;
};

export type AccountDeleteMutationInput = {
  id: string;
};

export type AccountDetailDeleteMutationInput = {
  id: string;
};
