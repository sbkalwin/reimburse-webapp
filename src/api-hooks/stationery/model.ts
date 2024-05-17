import { CommonModel } from 'api-hooks/common/model';
import { ReimburseDetailLiteModel } from 'api-hooks/reimburse/model';
import { Expose } from 'class-transformer';

export class StationeryLiteModel extends CommonModel {
  nama: string;
  harga: number;
  deskripsi: string;

  @Expose({ name: 'file_url' })
  fileUrl: string;
}

export class StationeryModel extends StationeryLiteModel {
  DetailPengembalian: ReimburseDetailLiteModel[];
}

export type getStationeriesInput = object;

export type getStationeryInput = {
  id: string;
};

export type StationeryMutationInput = {
  nama: string;
  deskripsi: string;
  file_url: string;
  harga: number;
};

export type StationeryUpdateMutationInput = {
  id: string;
  data: StationeryMutationInput;
};

export type StationeryDeleteMutationInput = {
  id: string;
};
