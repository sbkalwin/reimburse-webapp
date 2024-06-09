import { ComboboxItem } from '@mantine/core';
import {
  getItinenariesInput,
  ItinenaryLiteModel,
} from 'api-hooks/itinenary/model';
import { useGetItinenaries } from 'api-hooks/itinenary/query';
import { formatDate } from 'common/helpers/string';
import Input from 'components/input';
import { SelectFieldProps } from 'components/input/select-input-field';

export type ItinenaryOption = ComboboxItem & {
  item: ItinenaryLiteModel;
};

export interface ItinenarySelectProps
  extends Omit<SelectFieldProps, 'type' | 'data' | 'onAfterChange'> {
  filterQuery?: getItinenariesInput;
  onAfterChange?: (value: string | null, option: ItinenaryOption) => void;
}

export function itinenaryTransformer(
  itinenary: ItinenaryLiteModel,
): ItinenaryOption {
  return {
    item: itinenary,
    value: itinenary.id,
    label: [
      itinenary.id,
      itinenary.nama,
      `(${[formatDate(itinenary.tanggalMulai), formatDate(itinenary.tanggalSelesai)].join(' - ')})`,
    ].join(' - '),
  };
}

export default function ItinenarySelect(props: ItinenarySelectProps) {
  const { filterQuery, onAfterChange, ...rest } = props;
  const queryGetItinenarys = useGetItinenaries({ params: filterQuery });
  const options = (queryGetItinenarys.data?.data || []).map((itinenary) => {
    return itinenaryTransformer(itinenary);
  });

  return (
    <Input
      {...rest}
      type="select"
      data={options}
      disabled={queryGetItinenarys.isLoading || undefined}
      onAfterChange={onAfterChange as any}
    />
  );
}
