import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ApiError, ApiResult } from 'api-hooks/common/model';
import { API_LIST, callApi } from 'common/helpers/client';

import {
  StationeryLiteModel,
  StationeryModel,
  getStationeryInput,
  getStationeriesInput,
} from './model';

export const stationeryKeys = {
  stationeries: 'get-stationeries',
  stationery: 'get-stationery',
  stationeriesKey(input?: getStationeriesInput) {
    return [stationeryKeys.stationeries, input];
  },
  stationeryKey(input: getStationeryInput) {
    return [stationeryKeys.stationery, input.id];
  },
} as const;

export function useGetStationeries(props?: {
  params?: getStationeriesInput;
  options?: UseQueryOptions<ApiResult<StationeryModel[]>, ApiError>;
}) {
  return useQuery({
    queryKey: stationeryKeys.stationeriesKey(props?.params),
    async queryFn() {
      return await callApi(
        {
          url: API_LIST.Stationeries,
          params: props?.params,
          method: 'GET',
        },
        StationeryLiteModel,
      );
    },
    ...props?.options,
  });
}

export function useGetStationery(props: {
  input: getStationeryInput;
  options?: UseQueryOptions<ApiResult<StationeryModel>, ApiError>;
}) {
  return useQuery({
    queryKey: stationeryKeys.stationeryKey(props.input),
    async queryFn() {
      return await callApi(
        {
          url: `${API_LIST.Stationeries}/${props.input.id}`,
          method: 'GET',
        },
        StationeryModel,
      );
    },
    ...props?.options,
  });
}
