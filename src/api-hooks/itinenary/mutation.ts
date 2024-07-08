import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ApiError, ApiResult } from 'api-hooks/common/model';
import { API_LIST, callApi } from 'common/helpers/client';

import {
  ItinenaryDeleteMutationInput,
  ItinenaryModel,
  ItinenaryMutationInput,
  ItinenaryUpdateMutationInput,
} from './model';

export function useCreateItinenary(
  options?: UseMutationOptions<
    ApiResult<ItinenaryModel>,
    ApiError,
    ItinenaryMutationInput
  >,
) {
  return useMutation<
    ApiResult<ItinenaryModel>,
    ApiError,
    ItinenaryMutationInput
  >({
    mutationFn(data) {
      return callApi(
        {
          url: API_LIST.Itineraries,
          data,
          method: 'POST',
        },
        ItinenaryModel,
      );
    },
    ...options,
  });
}

export function useUpdateItinenary(
  options?: UseMutationOptions<
    ApiResult<ItinenaryModel>,
    ApiError,
    ItinenaryUpdateMutationInput
  >,
) {
  return useMutation<
    ApiResult<ItinenaryModel>,
    ApiError,
    ItinenaryUpdateMutationInput
  >({
    mutationFn({ data, id }) {
      return callApi(
        {
          url: `${API_LIST.Itineraries}/${id}`,
          data,
          method: 'PUT',
        },
        ItinenaryModel,
      );
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
