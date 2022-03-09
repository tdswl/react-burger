import {getCookie} from "../utils/cookie-helper";
import axios, {AxiosInstance, AxiosRequestConfig} from "axios";

// Интерсепторы для запросов с аутентификацией
export const axiosWithAuth = (updateToken: (x: string) => void): AxiosInstance => {
    let axiosInstance = axios.create();

    axiosInstance.interceptors.request.use(function (config: AxiosRequestConfig) {
        const token = getCookie('token');
        // Тут просто задаем токен, чтобы не усложнять - все ошибки потом придут в ответе
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    axiosInstance.interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {
            const originalConfig = err.config;
            if (err.response) {
                // _retry - чтобы не войти в бесконечный цикл. Повторяем только 1 раз
                if ((err.response.status === 401 || err.response.status === 403) && !originalConfig._retry) {
                    originalConfig._retry = true;

                    const refreshToken = localStorage.getItem("Authorization_RefreshToken");

                    // Если токена нет, то кидаем ошибку как обычно
                    if (!refreshToken) {
                        return Promise.reject(err);
                    }

                    // Если токен есть - обновляем его и повторяем запрос
                    try {
                        await updateToken(refreshToken);
                        return axiosInstance(originalConfig);
                    } catch (_error) {
                        return Promise.reject(_error);
                    }
                }
            }
            return Promise.reject(err);
        }
    );

    return axiosInstance;
}