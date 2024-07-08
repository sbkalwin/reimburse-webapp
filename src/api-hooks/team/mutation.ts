import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ApiError, ApiResult } from 'api-hooks/common/model';
import { API_LIST, callApi } from 'common/helpers/client';

import {
  TeamDeleteMutationInput,
  TeamModel,
  TeamMutationInput,
  TeamUpdateMutationInput,
} from './model';

export function useCreateTeam(
  options?: UseMutationOptions<
    ApiResult<TeamModel>,
    ApiError,
    TeamMutationInput
  >,
) {
  return useMutation<ApiResult<TeamModel>, ApiError, TeamMutationInput>({
    mutationFn(data) {
      return callApi(
        {
          url: API_LIST.Teams,
          data,
          method: 'POST',
        },
        TeamModel,
      );
    },
    ...options,
  });
}

export function useUpdateTeam(
  options?: UseMutationOptions<
    ApiResult<TeamModel>,
    ApiError,
    TeamUpdateMutationInput
  >,
) {
  return useMutation<ApiResult<TeamModel>, ApiError, TeamUpdateMutationInput>({
    mutationFn({ data, id }) {
      return callApi(
        {
          url: `${API_LIST.Teams}/${id}`,
          data,
          method: 'PUT',
        },
        TeamModel,
      );
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
        url: `${API_LIST.Teams}/${id}`,
        method: 'DELETE',
      });
    },
    ...options,
  });
}
