import { AxiosRequestConfig, AxiosError, Method as HTTPMethod } from 'axios';
import { BaseQueryFn } from '@reduxjs/toolkit/query';

import requestManager from '@/lib/requestManager/requestManager';

interface AxiosRequestConfigMethod extends AxiosRequestConfig {
  method: HTTPMethod;
  url: string;
}

const assignAxiosConfig = (method: HTTPMethod, params: any): AxiosRequestConfig => {
  switch (method) {
    case 'GET':
      return { params };

    case 'POST':
      return { data: params };

    default:
      return {};
  }
};

export const axiosBaseQuery =
  (): BaseQueryFn<AxiosRequestConfigMethod, unknown, AxiosError> =>
  async ({ url, params, method }) => {
    try {
      const requestOptions = assignAxiosConfig(method, params);
      const { data } = await requestManager(method, url, requestOptions);

      return data;
    } catch (err) {
      const axiosError = err as AxiosError;

      return {
        error: {
          status: axiosError.response?.status,
          data: axiosError.response?.data || err.message,
        },
      };
    }
  };
