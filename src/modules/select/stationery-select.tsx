import { ComboboxItem } from '@mantine/core';
import {
  getStationeriesInput,
  StationeryLiteModel,
} from 'api-hooks/stationery/model';
import { useGetStationeries } from 'api-hooks/stationery/query';
import { string2money } from 'common/helpers/string';
import Input from 'components/input';
import { SelectFieldProps } from 'components/input/select-input-field';

export type StationeryOption = ComboboxItem & {
  item: StationeryLiteModel;
};

export interface StationerySelectProps
  extends Omit<SelectFieldProps, 'type' | 'data' | 'onAfterChange'> {
  filterQuery?: getStationeriesInput;
  onAfterChange?: (value: string | null, option: StationeryOption) => void;
}

export function stationeryTransformer(
  stationery: StationeryLiteModel,
): StationeryOption {
  return {
    item: stationery,
    value: stationery.id,
    label: [stationery.nama, string2money(stationery.harga)].join(' - '),
  };
}

export default function StationerySelect(props: StationerySelectProps) {
  const { filterQuery, onAfterChange, ...rest } = props;
  const queryGetStationerys = useGetStationeries({ params: filterQuery });
  const options = (queryGetStationerys.data?.data || []).map((stationery) => {
    return stationeryTransformer(stationery);
  });

  return (
    <Input
      {...rest}
      type="select"
      data={options}
      disabled={queryGetStationerys.isLoading || undefined}
      onAfterChange={onAfterChange as any}
    />
  );
}
