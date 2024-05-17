import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ApiError, ApiResult } from 'api-hooks/common/model';
import { API_LIST, callApi } from 'common/helpers/client';

import {
  AccountDetailLiteModel,
  AccountDetailModel,
  AccountLiteModel,
  AccountModel,
  getAccountDetailInput,
  getAccountDetailsInput,
  getAccountInput,
  getAccountsInput,
} from './model';

export const accountKeys = {
  accounts: 'get-accounts',
  account: 'get-account',
  accountsKey(input?: getAccountsInput) {
    return [accountKeys.accounts, input];
  },
  accountKey(input: getAccountInput) {
    return [accountKeys.account, input.id];
  },
} as const;

export const accountDetailKeys = {
  accountDetails: 'get-account-details',
  accountDetail: 'get-account-detail',
  accountDetailsKey(input?: getAccountDetailsInput) {
    return [accountDetailKeys.accountDetails, input];
  },
  accountDetailKey(input: getAccountDetailInput) {
    return [accountDetailKeys.accountDetail, input.id];
  },
} as const;

export function useGetAccounts(props?: {
  params?: getAccountsInput;
  options?: UseQueryOptions<ApiResult<AccountLiteModel[]>, ApiError>;
}) {
  return useQuery({
    queryKey: accountKeys.accountsKey(props?.params),
    async queryFn() {
      return await callApi(
        {
          url: API_LIST.Accounts,
          params: props?.params,
          method: 'GET',
        },
        AccountLiteModel,
      );
    },
    ...props?.options,
  });
}

export function useGetAccount(props: {
  input: getAccountInput;
  options?: UseQueryOptions<ApiResult<AccountModel>, ApiError>;
}) {
  return useQuery({
    queryKey: accountKeys.accountKey(props.input),
    async queryFn() {
      return await callApi(
        {
          url: `${API_LIST.Accounts}/${props.input.id}`,
          method: 'GET',
        },
        AccountModel,
      );
    },
    ...props?.options,
  });
}

export function useGetAccountDetails(props?: {
  params?: getAccountDetailsInput;
  options?: UseQueryOptions<ApiResult<AccountDetailLiteModel[]>, ApiError>;
}) {
  return useQuery({
    queryKey: accountDetailKeys.accountDetailsKey(props?.params),
    async queryFn() {
      return await callApi(
        {
          url: API_LIST.AccountDetails,
          params: props?.params,
          method: 'GET',
        },
        AccountDetailLiteModel,
      );
    },
    ...props?.options,
  });
}

export function useGetAccountDetail(props: {
  input: getAccountDetailInput;
  options?: UseQueryOptions<ApiResult<AccountDetailModel>, ApiError>;
}) {
  return useQuery({
    queryKey: accountDetailKeys.accountDetailKey(props.input),
    async queryFn() {
      return await callApi(
        {
          url: `${API_LIST.AccountDetails}/${props.input.id}`,
          method: 'GET',
        },
        AccountDetailModel,
      );
    },
    enabled: !!props.input.id,
    ...props?.options,
  });
}
