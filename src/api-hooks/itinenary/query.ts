import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ApiError, ApiResult } from 'api-hooks/common/model';
import { API_LIST, callApi } from 'common/helpers/client';

import {
  ItinenaryLiteModel,
  ItinenaryModel,
  getItinenaryInput,
  getItinenariesInput,
} from './model';

export const itinenaryKeys = {
  itinenaries: 'get-itinenaries',
  itinenary: 'get-itinenary',
  itinenariesKey(input?: getItinenariesInput) {
    return [itinenaryKeys.itinenaries, input];
  },
  itinenaryKey(input: getItinenaryInput) {
    return [itinenaryKeys.itinenary, input.id];
  },
} as const;

export function useGetItinenaries(props?: {
  params?: getItinenariesInput;
  options?: UseQueryOptions<ApiResult<ItinenaryModel[]>, ApiError>;
}) {
  return useQuery({
    queryKey: itinenaryKeys.itinenariesKey(props?.params),
    async queryFn() {
      return await callApi(
        {
          url: API_LIST.Itineraries,
          params: props?.params,
          method: 'GET',
        },
        ItinenaryLiteModel,
      );
    },
    ...props?.options,
  });
}

export function useGetItinenary(props: {
  input: getItinenaryInput;
  options?: UseQueryOptions<ApiResult<ItinenaryModel>, ApiError>;
}) {
  return useQuery({
    queryKey: itinenaryKeys.itinenaryKey(props.input),
    async queryFn() {
      return await callApi(
        {
          url: `${API_LIST.Itineraries}/${props.input.id}`,
          method: 'GET',
        },
        ItinenaryModel,
      );
    },
    ...props?.options,
  });
}
