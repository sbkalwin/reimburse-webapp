import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ApiError, ApiResult } from 'api-hooks/common/model';
import { API_LIST, callApi } from 'common/helpers/client';

import {
  ReimburseDeleteMutationInput,
  ReimburseFinishMutationInput,
  ReimburseModel,
  ReimburseMutationInput,
  ReimburseRejectMutationInput,
  ReimburseUpdateMutationInput,
} from './model';

export function useCreateReimburse(
  options?: UseMutationOptions<
    ApiResult<ReimburseModel>,
    ApiError,
    ReimburseMutationInput
  >,
) {
  return useMutation<
    ApiResult<ReimburseModel>,
    ApiError,
    ReimburseMutationInput
  >({
    mutationFn(data) {
      return callApi(
        {
          url: API_LIST.Reimburses,
          data,
          method: 'POST',
        },
        ReimburseModel,
      );
    },
    ...options,
  });
}

export function useUpdateReimburse(
  options?: UseMutationOptions<
    ApiResult<ReimburseModel>,
    ApiError,
    ReimburseUpdateMutationInput
  >,
) {
  return useMutation<
    ApiResult<ReimburseModel>,
    ApiError,
    ReimburseUpdateMutationInput
  >({
    mutationFn({ data, id }) {
      return callApi(
        {
          url: `${API_LIST.Reimburses}/${id}`,
          data,
          method: 'PUT',
        },
        ReimburseModel,
      );
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

export function useRejectReimburse(
  options?: UseMutationOptions<
    ApiResult<any>,
    ApiError,
    ReimburseRejectMutationInput
  >,
) {
  return useMutation<ApiResult<any>, ApiError, ReimburseRejectMutationInput>({
    mutationFn({ id, data }) {
      return callApi({
        url: `${API_LIST.Reimburses}/${id}/reject`,
        method: 'PUT',
        data,
      });
    },
    ...options,
  });
}

export function useFinishReimburse(
  options?: UseMutationOptions<
    ApiResult<any>,
    ApiError,
    ReimburseFinishMutationInput
  >,
) {
  return useMutation<ApiResult<any>, ApiError, ReimburseFinishMutationInput>({
    mutationFn({ id, data }) {
      return callApi({
        url: `${API_LIST.Reimburses}/${id}/finish`,
        method: 'PUT',
        data,
      });
    },
    ...options,
  });
}
