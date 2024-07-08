import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ApiError, ApiResult } from 'api-hooks/common/model';
import { API_LIST, callApi } from 'common/helpers/client';

import {
  AccountDeleteMutationInput,
  AccountDetailDeleteMutationInput,
  AccountDetailMutationInput,
  AccountDetailUpdateMutationInput,
  AccountModel,
  AccountMutationInput,
  AccountUpdateMutationInput,
} from './model';

export function useCreateAccount(
  options?: UseMutationOptions<
    ApiResult<AccountModel>,
    ApiError,
    AccountMutationInput
  >,
) {
  return useMutation<ApiResult<AccountModel>, ApiError, AccountMutationInput>({
    mutationFn(data) {
      return callApi(
        {
          url: API_LIST.Accounts,
          data,
          method: 'POST',
        },
        AccountModel,
      );
    },
    ...options,
  });
}

export function useUpdateAccount(
  options?: UseMutationOptions<
    ApiResult<AccountModel>,
    ApiError,
    AccountUpdateMutationInput
  >,
) {
  return useMutation<
    ApiResult<AccountModel>,
    ApiError,
    AccountUpdateMutationInput
  >({
    mutationFn({ data, id }) {
      return callApi(
        {
          url: `${API_LIST.Accounts}/${id}`,
          data,
          method: 'PUT',
        },
        AccountModel,
      );
    },
    ...options,
  });
}

export function useDeleteAccount(
  options?: UseMutationOptions<
    ApiResult<any>,
    ApiError,
    AccountDeleteMutationInput
  >,
) {
  return useMutation<ApiResult<any>, ApiError, AccountDeleteMutationInput>({
    mutationFn({ id }) {
      return callApi({
        url: `${API_LIST.Accounts}/${id}`,
        method: 'DELETE',
      });
    },
    ...options,
  });
}

export function useCreateAccountDetail(
  options?: UseMutationOptions<
    ApiResult<any>,
    ApiError,
    AccountDetailMutationInput
  >,
) {
  return useMutation<ApiResult<any>, ApiError, AccountDetailMutationInput>({
    mutationFn(data) {
      return callApi({
        url: API_LIST.AccountDetails,
        data,
        method: 'POST',
      });
    },
    ...options,
  });
}

export function useUpdateAccountDetail(
  options?: UseMutationOptions<
    ApiResult<any>,
    ApiError,
    AccountDetailUpdateMutationInput
  >,
) {
  return useMutation<
    ApiResult<any>,
    ApiError,
    AccountDetailUpdateMutationInput
  >({
    mutationFn({ data, id }) {
      return callApi({
        url: `${API_LIST.AccountDetails}/${id}`,
        data,
        method: 'PUT',
      });
    },
    ...options,
  });
}

export function useDeleteAccountDetailDetail(
  options?: UseMutationOptions<
    ApiResult<any>,
    ApiError,
    AccountDetailDeleteMutationInput
  >,
) {
  return useMutation<
    ApiResult<any>,
    ApiError,
    AccountDetailDeleteMutationInput
  >({
    mutationFn({ id }) {
      return callApi({
        url: `${API_LIST.AccountDetails}/${id}`,
        method: 'DELETE',
      });
    },
    ...options,
  });
}
