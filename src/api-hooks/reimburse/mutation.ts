import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ApiError, ApiResult } from 'api-hooks/common/model';
import { API_LIST, callApi } from 'common/helpers/client';

import {
  ReimburseDeleteMutationInput,
  ReimburseMutationInput,
  ReimburseUpdateMutationInput,
} from './model';

export function useCreateReimburse(
  options?: UseMutationOptions<
    ApiResult<any>,
    ApiError,
    ReimburseMutationInput
  >,
) {
  return useMutation<ApiResult<any>, ApiError, ReimburseMutationInput>({
    mutationFn(data) {
      return callApi({
        url: API_LIST.Reimburses,
        data,
        method: 'POST',
      });
    },
    ...options,
  });
}

export function useUpdateReimburse(
  options?: UseMutationOptions<
    ApiResult<any>,
    ApiError,
    ReimburseUpdateMutationInput
  >,
) {
  return useMutation<ApiResult<any>, ApiError, ReimburseUpdateMutationInput>({
    mutationFn({ data, id }) {
      return callApi({
        url: `${API_LIST.Reimburses}/${id}`,
        data,
        method: 'PUT',
      });
    },
    ...options,
  });
}

export function useDeleteReimburse(
  options?: UseMutationOptions<
    ApiResult<any>,
    ApiError,
    ReimburseDeleteMutationInput
  >,
) {
  return useMutation<ApiResult<any>, ApiError, ReimburseDeleteMutationInput>({
    mutationFn({ id }) {
      return callApi({
        url: `${API_LIST.Reimburses}/${id}`,
        method: 'DELETE',
      });
    },
    ...options,
  });
}
