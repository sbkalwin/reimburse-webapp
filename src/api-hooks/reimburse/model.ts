import { AccountDetailLiteModel } from 'api-hooks/account/model';
import { CommonModel } from 'api-hooks/common/model';
import { EmployeeLiteModel } from 'api-hooks/employee/model';
import { ItinenaryLiteModel } from 'api-hooks/itinenary/model';
import { StationeryLiteModel } from 'api-hooks/stationery/model';
import { Expose, Type } from 'class-transformer';

export enum ReimburseStatusEnum {
  pending = 'pending',
  finished = 'finished',
  rejected = 'rejected',
}
export enum ReimburseTypeEnum {
  itinerary = 'itinerary',
  stationery = 'stationery',
}

export class ReimburseDetailLiteModel extends CommonModel {
  deskripsi: string;
  fileUrl: string;
  jenis: ReimburseTypeEnum;
  nama: string;
  pengembalianId: string;
  peralatanKantorId: string;
  subtotal: number;
}

export class ReimburseLiteModel extends CommonModel {
  deskripsi: string;

  @Expose({ name: 'deskripsi_penolakan' })
  deskripsiPenolakan: string | null;

  jenis: ReimburseTypeEnum;

  @Expose({ name: 'nip_pemohon' })
  nipPemohon: string;

  @Expose({ name: 'nip_pic' })
  nipPic: string | null;

  @Expose({ name: 'kas_detail' })
  @Type(() => AccountDetailLiteModel)
  KasDetail: AccountDetailLiteModel;

  @Type(() => EmployeeLiteModel)
  pemohon: EmployeeLiteModel;

  @Expose({ name: 'perjalanan_id' })
  perjalananId: string | null;

  @Type(() => ItinenaryLiteModel)
  Perjalanan: ItinenaryLiteModel | null;

  @Type(() => EmployeeLiteModel)
  pic: EmployeeLiteModel | null;

  status: ReimburseStatusEnum;

  @Expose({ name: 'tanggal_pelunasan' })
  @Type(() => Date)
  tanggalPelunasan: Date | null;

  @Expose({ name: 'tanggal_penolakan' })
  @Type(() => Date)
  tanggalPenolakan: Date | null;

  @Expose({ name: 'total_pelunasan' })
  totalPelunasan: number | null;
}

export class ReimburseDetailModel extends CommonModel {
  deskripsi: string;

  @Expose({ name: 'file_url' })
  fileUrl: string;

  jenis: ReimburseTypeEnum;
  nama: string;

  @Expose({ name: 'pengembalian_id' })
  pengembalianId: string;

  @Expose({ name: 'peralatan_kantor_id' })
  peralatanKantorId: string | null;

  subtotal: number;

  @Expose({ name: 'peralatan_kantor' })
  @Type(() => StationeryLiteModel)
  peralatanKantor: StationeryLiteModel | null;

  @Type(() => ReimburseLiteModel)
  pengembalian: ReimburseLiteModel;
}

export class ReimburseModel extends ReimburseLiteModel {
  @Expose({ name: 'detail_pengembalian' })
  @Type(() => ReimburseDetailLiteModel)
  detailPengembalian: ReimburseDetailLiteModel[];
}

export type getReimbursesInput = {
  tanggal_mulai?: Date;
  tanggal_selesai?: Date;
  nip_pemohon?: string;
};
export type getReimburseDetailsInput = object;

export type getReimburseInput = {
  id: string;
};

export type getReimburseDetailInput = {
  id: string;
};

export type ReimburseDetailMutationInput = {
  nama: string;
  deskripsi: string;
  file_url: string;
  subtotal: number;
  peralatan_kantor_id: string | null;
};

export type ReimburseMutationInput = {
  deskripsi: string;
  nip_pemohon: string;
  perjalanan_id: string | null;
  nip_pic: string | null;
  jenis: ReimburseTypeEnum;
  details: ReimburseDetailMutationInput[];
};

export type ReimburseUpdateMutationInput = {
  id: string;
  data: ReimburseMutationInput;
};

export type ReimburseDeleteMutationInput = {
  id: string;
};

export type ReimburseRejectMutationInput = {
  id: string;
  data: {
    deskripsi_penolakan: string;
    tanggal_penolakan: Date;
    name: string;
  };
};

export type ReimburseFinishMutationInput = {
  id: string;
  data: {
    name: string;
    total: number;
    deskripsi: string;
    kas_id: string;
    tanggal_pelunasan: Date;
    pengembalian_id: string;
  };
};
