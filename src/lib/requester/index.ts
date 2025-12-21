import { ErrorData, Request, Requester } from '@/types/requester';
import { API_BASE_URL } from '@constants/index';
import getQueryClient from '@lib/getQueryClient';
import RequesterError from '@lib/requester/RequesterError';
import { HEALTH_QUERY_KEYS } from '@modules/health/health.hooks';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

const client: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10_000, // 10 seconds
});

client.interceptors.request.use((request: InternalAxiosRequestConfig) => {
  console.debug(
    `Request made with ${request.method?.toUpperCase()} method to ${request.baseURL}${request.url}`,
  );

  return request;
});

client.interceptors.response.use(
  async (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const queryClient = getQueryClient();

    if (error.response) {
      throw new RequesterError({
        statusCode:
          (error.response?.data as ErrorData)?.statusCode ??
          error.response?.status,
        error:
          (error.response?.data as ErrorData)?.error ??
          error.response?.statusText,
        message:
          (error.response?.data as ErrorData)?.message ??
          error.response?.statusText,
      });
    } else if (error.code) {
      let axiosError: RequesterError;

      switch (error.code) {
        case 'ECONNABORTED':
          axiosError = new RequesterError({
            statusCode: 408,
            error: 'Request Time-out',
            message: 'Request timeout – please check your internet connection',
          });
          break;
        case 'ERR_NETWORK':
        case 'NETWORK_ERROR':
          axiosError = new RequesterError({
            statusCode: 503,
            error: 'Network Error',
            message: 'Network error – please check your internet connection',
          });
          queryClient.invalidateQueries({
            queryKey: HEALTH_QUERY_KEYS.health(),
          });
          break;
        default:
          axiosError = new RequesterError({
            statusCode: 500,
            error: 'Unknown Error',
            message: 'An unknown error occurred',
          });
      }

      console.error(axiosError);
      throw axiosError;
    }
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
