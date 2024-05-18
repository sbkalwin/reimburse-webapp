import { CommonModel } from 'api-hooks/common/model';
import { ReimburseLiteModel } from 'api-hooks/reimburse/model';
import { Expose, Type } from 'class-transformer';

export class ItinenaryLiteModel extends CommonModel {
  nama: string;
  deskripsi: string;

  @Expose({ name: 'tanggal_mulai' })
  @Type(() => Date)
  tanggalMulai: Date;

  @Expose({ name: 'tanggal_selesai' })
  @Type(() => Date)
  tanggalSelesai: Date;
}

export class ItinenaryModel extends ItinenaryLiteModel {
  @Type(() => ReimburseLiteModel)
  pengembalian: ReimburseLiteModel[];
}

export type getItinenariesInput = {
  tanggal_mulai?: Date;
  tanggal_selesai?: Date;
};

export type getItinenaryInput = {
  id: string;
};

export type ItinenaryMutationInput = {
  nama: string;
  deskripsi: string;
  tanggal_mulai: Date;
  tanggal_selesai: Date;
};

export type ItinenaryUpdateMutationInput = {
  id: string;
  data: ItinenaryMutationInput;
};

export type ItinenaryDeleteMutationInput = {
  id: string;
};
