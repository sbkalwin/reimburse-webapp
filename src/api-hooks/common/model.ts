import { Expose, Type } from 'class-transformer';

export class CommonModel {
  id: string;

  @Expose({ name: 'tanggal_dibuat' })
  @Type(() => Date)
  tanggalDibuat: Date;

  @Expose({ name: 'tanggal_diubah' })
  @Type(() => Date)
  tanggalDiubah: Date;
}

export class ApiResult<T> {
  data: T;
  message: string;
}

export class ApiError {
  message: string;
  errors?: object[];
}
