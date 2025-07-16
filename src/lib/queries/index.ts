import apiAxios from "@lib/axios";
import { stringifySearch } from "@lib/utils";
import { AxiosRequestConfig, AxiosResponseHeaders } from "axios";

export const get = async <T>(url: string, search: Record<string, any> = {}, config?: AxiosRequestConfig<any>): Promise<T> => {
    return apiAxios
        .get<T>(`${apiAxios.defaults.baseURL}${url}${stringifySearch(search)}`, config)
        .then(res => res.data)
}

export const getWithHeaders = async<T>(url: string, search: Record<string, any> = {}, config?: AxiosRequestConfig<any>): Promise<{ data: T, headers: AxiosResponseHeaders | Partial<AxiosResponseHeaders> }> => {
    return apiAxios
        .get<T>(`${apiAxios.defaults.baseURL}${url}${stringifySearch(search)}`, config)
        .then(res => ({ data: res.data, headers: res.headers }))
}


export const postWithHeaders = async <T>(url: string, data: Record<string, any> = {}, config?: AxiosRequestConfig<any>): Promise<{ data: T; headers: AxiosResponseHeaders | Partial<AxiosResponseHeaders> }> => {
    return apiAxios
        .post<T>(`${apiAxios.defaults.baseURL}${url}`, data, config)
        .then(res => ({
            data: res.data,
            headers: res.headers,
        }))
}

export const del = async <T>(url: string, search: Record<string, any> = {}): Promise<T> => {
    return apiAxios
        .delete<T>(`${apiAxios.defaults.baseURL}${url}${stringifySearch(search)}`)
        .then(res => res.data)
}

export const patch = async <T>(url: string, data: Record<string, any> = {}, search: Record<string, any> = {}): Promise<T> => {
    let asFormData = false;
    const formData = new FormData();

    Object.keys(data).forEach(key => {
        const value = data[key];
        if (value instanceof Blob) {
            asFormData = true;
        }
        if (Array.isArray(value)) {
            value.forEach((item) => formData.append(key, item));
        } else {
            formData.set(key, value);
        }
    });

    return apiAxios
        .patch<T>(`${apiAxios.defaults.baseURL}${url}${stringifySearch(search)}`, asFormData ? formData : data, {
            headers: asFormData ? {
                'Content-Type': 'multipart/form-data'
            } : undefined
        })
        .then(res => res.data)
}

export const put = async <T>(url: string, data: Record<string, any> = {}, search: Record<string, any> = {}, config: Record<string, any> = {}): Promise<T> => {
    let asFormData = false;
    const formData = new FormData();

    Object.keys(data).forEach(key => {
        const value = data[key];
        if (value instanceof Blob) {
            asFormData = true;
        }
        if (Array.isArray(value)) {
            value.forEach((item) => formData.append(key, item));
        } else {
            formData.set(key, value);
        }
    });

    return apiAxios
        .put<T>(`${apiAxios.defaults.baseURL}${url}${stringifySearch(search)}`, asFormData ? formData : data, {
            headers: asFormData ? {
                'Content-Type': 'multipart/form-data'
            } : undefined,
            ...config
        })
        .then(res => res.data)
}

export const post = async <T>(url: string, data: Record<string, any> = {}, search: Record<string, any> = {}, config: Record<string, any> = {}): Promise<T> => {
    let asFormData = false;
    const formData = new FormData();

    Object.keys(data).forEach(key => {
        const value = data[key];
        if (value instanceof Blob || (Array.isArray(value) && value.some((file) => file instanceof Blob))) {
            asFormData = true;
        }
        if (Array.isArray(value)) {
            Array.from(value).forEach((item) => formData.append(key, item));
        } else {
            formData.set(key, value);
        }
    });

    return apiAxios
        .post<T>(`${apiAxios.defaults.baseURL}${url}${stringifySearch(search)}`, asFormData ? formData : data, {
            headers: asFormData ? {
                'Content-Type': 'multipart/form-data'
            } : undefined,
            ...config
        })
        .then(res => res.data)
}