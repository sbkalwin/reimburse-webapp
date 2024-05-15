import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ClassConstructor } from 'class-transformer';
import { decamelizeKeys } from 'humps';

import QueryTransformer from './query-transfomer';
import { getToken } from './token';

export const BASE_URL = 'http://localhost:3000/api' as const;

export const API_LIST = {
  Auth: '/auth',
  Users: '/users',
  Teams: '/teams',
  Stationeries: '/stationeries',
  Reimburses: '/reimburses',
  Itineraries: '/itineraries',
  Accounts: '/accounts',
  AccountDetails: '/account-details',
} as const;

const client = axios.create({
  baseURL: BASE_URL,
});

// https://axios-http.com/docs/interceptors
client.interceptors.request.use((value) => {
  // authorization
  const token = getToken();
  value.headers.Authorization = token ? `Bearer ${token}` : undefined;

  // data
  if (value.data) {
    value.data = decamelizeKeys(value.data);
  }

  //params
  if (value.params) {
    value.params = decamelizeKeys(value.params);
  }

  return value;
});

export async function callApi<T = any>(
  args: AxiosRequestConfig,
  dataType?: ClassConstructor<T>,
) {
  const { method = 'GET', headers, ...rest } = args;
  const token = getToken();
  //https://medium.com/@amavictor/how-to-use-react-query-axios-and-a-custom-request-processor-to-transform-your-data-2a9f0c9f5bf0
  return client({
    method,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      ...headers,
    },
    ...rest,
  })
    .then((value: AxiosResponse<T>) => {
      return QueryTransformer(value.data, dataType);
    })
    .catch((error) => Promise.reject(error.response.data));
}

export default client;
