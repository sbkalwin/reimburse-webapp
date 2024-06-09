import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ApiError, ApiResult } from 'api-hooks/common/model';
import { callApi } from 'common/helpers/client';

import { DeleteableType, DeleteMutationType } from './model';

export function useDelete(
  type: DeleteableType,
  options?: UseMutationOptions<ApiResult<any>, ApiError, DeleteMutationType>,
) {
  return useMutation<ApiResult<any>, ApiError, DeleteMutationType>({
    mutationFn({ id }) {
      return callApi({
        url: `${type}/${id}`,
        method: 'DELETE',
      });
    },
    ...options,
  });
}
