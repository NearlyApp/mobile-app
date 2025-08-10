import { AxiosRequestConfig } from 'axios';

export type Requester = () => {
  get: Request;
  post: RequestWithData;
  put: RequestWithData;
  delete: Request;
  patch: RequestWithData;
};

export type Request = <T extends any = any>(
  url: string,
  options?: AxiosRequestConfig,
) => Promise<T>;
export type RequestWithData = <T extends any = any>(
  url: string,
  data?: any,
  options?: AxiosRequestConfig,
) => Promise<T>;

export type ErrorData = {
  statusCode: number;
  message: string;
  error: string;
  errors?: Record<string, string[]>;
};
