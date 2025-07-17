import { API_BASE_URL } from '@constants/index';
import { Request, Requester } from '@custom-types/requester';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

const client: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

client.interceptors.request.use(async (request: InternalAxiosRequestConfig) => {
  const sessionId = await AsyncStorage.getItem('SESSION_ID');

  if (sessionId) request.headers['X-Session-Id'] = sessionId;

  return request;
}, console.error);

client.interceptors.response.use(
  async (response: AxiosResponse) => response,
  (error: AxiosError) => {
    switch (error.response?.status) {
      case 401:
        break;
      default:
        throw error;
    }
  },
);

const requester: Requester = () => {
  const get: Request = async <T>(url: string, options?: AxiosRequestConfig) =>
    client.get<T>(url, options);

  const post: Request = async <T>(
    url: string,
    data?: any,
    options?: AxiosRequestConfig,
  ) => client.post<T>(url, data, options);

  const put: Request = async <T>(
    url: string,
    data?: any,
    options?: AxiosRequestConfig,
  ) => client.put<T>(url, data, options);

  const del: Request = async <T>(url: string, options?: AxiosRequestConfig) =>
    client.delete<T>(url, options);

  const patch: Request = async <T>(
    url: string,
    data?: any,
    options?: AxiosRequestConfig,
  ) => client.patch<T>(url, data, options);

  return { get, post, put, delete: del, patch };
};

export default requester;
