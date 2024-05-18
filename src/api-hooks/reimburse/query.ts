import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ApiError, ApiResult } from 'api-hooks/common/model';
import { API_LIST, callApi } from 'common/helpers/client';

import {
  getReimburseInput,
  getReimbursesInput,
  ReimburseLiteModel,
  ReimburseModel,
} from './model';

export const reimburseKeys = {
  reimburses: 'get-reimburses',
  reimburse: 'get-reimburse',
  reimbursesKey(input?: getReimbursesInput) {
    return [reimburseKeys.reimburses, input];
  },
  reimburseKey(input: getReimburseInput) {
    return [reimburseKeys.reimburse, input.id];
  },
} as const;

export function useGetReimburses(props?: {
  params?: getReimbursesInput;
  options?: UseQueryOptions<ApiResult<ReimburseLiteModel[]>, ApiError>;
}) {
  return useQuery({
    queryKey: reimburseKeys.reimbursesKey(props?.params),
    async queryFn() {
      return await callApi(
        {
          url: API_LIST.Reimburses,
          params: props?.params,
          method: 'GET',
        },
        ReimburseLiteModel,
      );
    },
    ...props?.options,
  });
}

export function useGetReimburse(props: {
  input: getReimburseInput;
  options?: UseQueryOptions<ApiResult<ReimburseModel>, ApiError>;
}) {
  return useQuery({
    queryKey: reimburseKeys.reimburseKey(props.input),
    async queryFn() {
      return await callApi(
        {
          url: `${API_LIST.Reimburses}/${props.input.id}`,
          method: 'GET',
        },
        ReimburseModel,
      );
    },
    ...props?.options,
  });
}
