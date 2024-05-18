import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ApiError, ApiResult } from 'api-hooks/common/model';
import { API_LIST, callApi } from 'common/helpers/client';

import {
  ItinenaryDeleteMutationInput,
  ItinenaryMutationInput,
  ItinenaryUpdateMutationInput,
} from './model';

export function useCreateItinenary(
  options?: UseMutationOptions<
    ApiResult<any>,
    ApiError,
    ItinenaryMutationInput
  >,
) {
  return useMutation<ApiResult<any>, ApiError, ItinenaryMutationInput>({
    mutationFn(data) {
      return callApi({
        url: API_LIST.Itineraries,
        data,
        method: 'POST',
      });
    },
    ...options,
  });
}

export function useUpdateItinenary(
  options?: UseMutationOptions<
    ApiResult<any>,
    ApiError,
    ItinenaryUpdateMutationInput
  >,
) {
  return useMutation<ApiResult<any>, ApiError, ItinenaryUpdateMutationInput>({
    mutationFn({ data, id }) {
      return callApi({
        url: `${API_LIST.Itineraries}/${id}`,
        data,
        method: 'PUT',
      });
    },
    ...options,
  });
}

export function useDeleteItinenary(
  options?: UseMutationOptions<
    ApiResult<any>,
    ApiError,
    ItinenaryDeleteMutationInput
  >,
) {
  return useMutation<ApiResult<any>, ApiError, ItinenaryDeleteMutationInput>({
    mutationFn({ id }) {
      return callApi({
        url: `${API_LIST.Itineraries}/${id}`,
        method: 'DELETE',
      });
    },
    ...options,
  });
}
