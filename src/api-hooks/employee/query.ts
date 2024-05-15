import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ApiError, ApiResult } from 'api-hooks/common/model';
import { API_LIST, callApi } from 'common/helpers/client';

import {
  EmployeeLiteModel,
  EmployeeModel,
  getEmployeeInput,
  getEmployeesInput,
} from './model';

export const employeeKeys = {
  employees: 'get-employees',
  employee: 'get-employee',
  employeesKey(input?: getEmployeesInput) {
    return [employeeKeys.employees, input];
  },
  employeeKey(input: getEmployeeInput) {
    return [employeeKeys.employee, input.id];
  },
} as const;

export function useGetEmployees(props?: {
  params?: getEmployeesInput;
  options?: UseQueryOptions<ApiResult<EmployeeLiteModel[]>, ApiError>;
}) {
  return useQuery({
    queryKey: employeeKeys.employeesKey(props?.params),
    async queryFn() {
      return await callApi(
        {
          url: API_LIST.Users,
          params: props?.params,
          method: 'GET',
        },
        EmployeeLiteModel,
      );
    },
    ...props?.options,
  });
}

export function useGetEmployee(props: {
  input: getEmployeeInput;
  options?: UseQueryOptions<ApiResult<EmployeeModel>, ApiError>;
}) {
  return useQuery({
    queryKey: employeeKeys.employeeKey(props.input),
    async queryFn() {
      return await callApi(
        {
          url: `${API_LIST.Users}/${props.input.id}`,
          method: 'GET',
        },
        EmployeeModel,
      );
    },
    ...props?.options,
  });
}
