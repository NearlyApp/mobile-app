import { API_BASE_URL } from '@constants/index';
import { ErrorData, Request, Requester } from '@custom-types/requester';
import RequesterError from '@lib/requester/RequesterError';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

const client: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

client.interceptors.response.use(
  async (response: AxiosResponse) => response,
  (error: AxiosError) => {
    switch (error.response?.status) {
      case 401:
        // Add some logic for unauthorized access if needed
        break;
    }

    throw new RequesterError({
      error:
        (error.response?.data as ErrorData)?.error ??
        error.response?.statusText ??
        'Unknown error',
      message:
        (error.response?.data as ErrorData)?.message ??
        error.response?.statusText ??
        'An error occurred',
      statusCode:
        (error.response?.data as ErrorData)?.statusCode ??
        error.response?.status ??
        NaN,
    });
  },
);

const requester: Requester = () => {
  const get: Request = async <T>(url: string, options?: AxiosRequestConfig) =>
    (await client.get<T>(url, options)).data;

  const post: Request = async <T>(
    url: string,
    data: any,
    options?: AxiosRequestConfig,
  ) => (await client.post<T>(url, data, options)).data;

  const put: Request = async <T>(
    url: string,
    data: any,
    options?: AxiosRequestConfig,
  ) => (await client.put<T>(url, data, options)).data;

  const del: Request = async <T>(url: string, options?: AxiosRequestConfig) =>
    (await client.delete<T>(url, options)).data;

  const patch: Request = async <T>(
    url: string,
    data: any,
    options?: AxiosRequestConfig,
  ) => (await client.patch<T>(url, data, options)).data;

  return { get, post, put, delete: del, patch };
};

export default requester;
