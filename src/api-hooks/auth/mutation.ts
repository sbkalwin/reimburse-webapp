import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';
import { ApiError, ApiResult } from 'api-hooks/common/model';
import { API_LIST, callApi } from 'common/helpers/client';

import { loginMutationInput, TokenResultModel } from './model';

export function useLogin(
  options?: UseMutationOptions<
    ApiResult<TokenResultModel>,
    ApiError,
    loginMutationInput
  >,
): UseMutationResult<
  ApiResult<TokenResultModel>,
  ApiError,
  loginMutationInput
> {
  return useMutation<ApiResult<TokenResultModel>, ApiError, loginMutationInput>(
    {
      mutationFn(data) {
        return callApi(
          {
            url: `${API_LIST.Auth}/login`,
            data,
            method: 'POST',
          },
          TokenResultModel,
        );
      },
      ...options,
    },
  );
}
