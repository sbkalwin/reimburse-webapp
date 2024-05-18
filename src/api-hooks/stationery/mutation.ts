import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ApiError, ApiResult } from 'api-hooks/common/model';
import { API_LIST, callApi } from 'common/helpers/client';

import {
  StationeryDeleteMutationInput,
  StationeryMutationInput,
  StationeryUpdateMutationInput,
} from './model';

export function useCreateStationery(
  options?: UseMutationOptions<
    ApiResult<any>,
    ApiError,
    StationeryMutationInput
  >,
) {
  return useMutation<ApiResult<any>, ApiError, StationeryMutationInput>({
    mutationFn(data) {
      return callApi({
        url: API_LIST.Stationeries,
        data,
        method: 'POST',
      });
    },
    ...options,
  });
}

export function useUpdateStationery(
  options?: UseMutationOptions<
    ApiResult<any>,
    ApiError,
    StationeryUpdateMutationInput
  >,
) {
  return useMutation<ApiResult<any>, ApiError, StationeryUpdateMutationInput>({
    mutationFn({ data, id }) {
      return callApi({
        url: `${API_LIST.Stationeries}/${id}`,
        data,
        method: 'PUT',
      });
    },
    ...options,
  });
}

export function useDeleteStationery(
  options?: UseMutationOptions<
    ApiResult<any>,
    ApiError,
    StationeryDeleteMutationInput
  >,
) {
  return useMutation<ApiResult<any>, ApiError, StationeryDeleteMutationInput>({
    mutationFn({ id }) {
      return callApi({
        url: `${API_LIST.Stationeries}/${id}`,
        method: 'DELETE',
      });
    },
    ...options,
  });
}
