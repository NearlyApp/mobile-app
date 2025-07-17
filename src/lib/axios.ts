import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { API_BASE_URL } from "@constants/index";
import { DetailError, ForbiddenError, FormError, NotFoundError, UnexpectedError } from './queries/error';
import { isObject } from './utils';

const apiAxios = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
});


apiAxios.interceptors.request.use(
    async (request: InternalAxiosRequestConfig) => {
        const token = await AsyncStorage.getItem("token");
        if (
            token
            && !request.url?.includes("auth/sign-up")
            && !request.url?.includes("auth/sign-in")
        ) {
            request.headers['Authorization'] = `Token ${token}`;
        }
        // request.headers['Accept-Language'] = 'fr';
        return request;
    },
    (error) => Promise.reject(error)
);

apiAxios.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
        console.log("API Error:", error.message);
        if (error.response?.data !== undefined) {
            const data = error.response.data;
            if (isObject(data, true) && 'detail' in data) {
                throw new DetailError(data.detail);
            }
        }
        if (!!error.response) {
            if (error.response.status === 403) {
                throw new ForbiddenError(error);
            }
            if (error.response.status === 400) {
                throw new FormError(error);
            }
            if (error.response.status === 404) {
                throw new NotFoundError();
            }
        }
        throw new UnexpectedError();

    }
)

export default apiAxios;
