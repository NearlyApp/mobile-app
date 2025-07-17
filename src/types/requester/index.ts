import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type Requester = () => {
  get: Request;
  post: Request;
  put: Request;
  delete: Request;
  patch: Request;
};

export type Request = <T = any, D = ErrorData>(
  url: string,
  data?: any,
  options?: AxiosRequestConfig,
) => Promise<AxiosResponse<T, D>>;

export type Response<T = any, D = ErrorData> = AxiosResponse<T, D>;

export type ErrorData = {
  statusCode: number;
  message: string | string[];
  error: string;
};
