import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ApiError, ApiResult } from 'api-hooks/common/model';
import { API_LIST, callApi } from 'common/helpers/client';

import {
  TeamDeleteMutationInput,
  TeamMutationInput,
  TeamUpdateMutationInput,
} from './model';

export function useCreateTeam(
  options?: UseMutationOptions<ApiResult<any>, ApiError, TeamMutationInput>,
) {
  return useMutation<ApiResult<any>, ApiError, TeamMutationInput>({
    mutationFn(data) {
      return callApi({
        url: API_LIST.Teams,
        data,
        method: 'POST',
      });
    },
    ...options,
  });
}

export function useUpdateTeam(
  options?: UseMutationOptions<
    ApiResult<any>,
    ApiError,
    TeamUpdateMutationInput
  >,
) {
  return useMutation<ApiResult<any>, ApiError, TeamUpdateMutationInput>({
    mutationFn({ data, id }) {
      return callApi({
        url: `${API_LIST.Teams}/${id}`,
        data,
        method: 'PUT',
      });
    },
    ...options,
  });
}

export function useDeleteTeam(
  options?: UseMutationOptions<
    ApiResult<any>,
    ApiError,
    TeamDeleteMutationInput
  >,
) {
  return useMutation<ApiResult<any>, ApiError, TeamDeleteMutationInput>({
    mutationFn({ id }) {
      return callApi({
        url: `${API_LIST.Teams}/${id}}`,
        method: 'DELETE',
      });
    },
    ...options,
  });
}
