import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ApiError, ApiResult } from 'api-hooks/common/model';
import { API_LIST, callApi } from 'common/helpers/client';

import {
  EmployeeDeleteMutationInput,
  EmployeeMutationInput,
  EmployeeUpdateMutationInput,
} from './model';

export function useCreateEmployee(
  options?: UseMutationOptions<ApiResult<any>, ApiError, EmployeeMutationInput>,
) {
  return useMutation<ApiResult<any>, ApiError, EmployeeMutationInput>({
    mutationFn(data) {
      return callApi({
        url: API_LIST.Users,
        data,
        method: 'POST',
      });
    },
    ...options,
  });
}

export function useUpdateEmployee(
  options?: UseMutationOptions<
    ApiResult<any>,
    ApiError,
    EmployeeUpdateMutationInput
  >,
) {
  return useMutation<ApiResult<any>, ApiError, EmployeeUpdateMutationInput>({
    mutationFn({ data, nip }) {
      return callApi({
        url: `${API_LIST.Users}/${nip}`,
        data,
        method: 'PUT',
      });
    },
    ...options,
  });
}

export function useDeleteEmployee(
  options?: UseMutationOptions<
    ApiResult<any>,
    ApiError,
    EmployeeDeleteMutationInput
  >,
) {
  return useMutation<ApiResult<any>, ApiError, EmployeeDeleteMutationInput>({
    mutationFn(nip) {
      return callApi({
        url: `${API_LIST.Users}/${nip}`,
        method: 'DELETE',
      });
    },
    ...options,
  });
}
