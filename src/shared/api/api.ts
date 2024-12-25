import axios, {AxiosInstance, AxiosError} from "axios";
import {z} from "zod";

class Api {
    private instance: AxiosInstance;
    private token: string | null;

    constructor(url: string) {
        this.instance = axios.create({
            baseURL: url,
            timeout: 10000,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        this.token = null;

        this.instance.interceptors.request.use(
            (config) => {
                if (this.token) {
                    config.headers.Authorization = `Bearer ${this.token.trim()}`;
                }
                return config;
            },
            (error) => {
                console.error("Request Error:", error);
                return Promise.reject(error);
            }
        );

        this.instance.interceptors.response.use(
            (response) => response, // Вернуть данные при успешном запросе
            (error: AxiosError<{error: string}>) => {
                console.error("API Error:", error.response?.data ?? error.message);
                console.log(error);

                if (error.response) {
                    const {status, data} = error.response;
                    if (!z.object({error: z.string()}).parse(data)) {
                        return Promise.reject(new Error(`Error ${status}: Something went wrong`));
                    }
                    return Promise.reject(new Error(`Error ${status}: ${data.error}`));
                } else if (error.request) {
                    return Promise.reject(new Error("No response from the server"));
                } else {
                    return Promise.reject(new Error("Request setup error: " + error.message));
                }
            }
        );
    }

    /** Универсальный метод запросов */
    request = async <Res, Data, Params>(method: "get" | "post" | "patch" | "delete" | "put", url: string, data?: Data, params?: Params): Promise<Res> => {
        const response = await this.instance.request<Res>({
            method,
            url,
            data,
            params,
        });
        return response.data;
    };

    /** GET запрос */ /* eslint-disable @typescript-eslint/no-explicit-any */
    get = <Res>(url: string, params?: Record<string, any>): Promise<Res> =>
        this.request<Res, null, typeof params>("get", url, null, params);

    /** POST запрос */
    post = <Req, Res>(url: string, body: Req) =>
        this.request<Res, Req, never>("post", url, body);

    /** DELETE запрос */
    delete = <Res>(url: string) =>
        this.request<Res, null, never>("delete", url);

    /** PATCH запрос */
    patch = <Req, Res>(url: string, body: Req) =>
        this.request<Res, Req, never>("patch", url, body);

    /** PUT запрос */
    put = <Req, Res>(url: string, body: Req) =>
        this.request<Res, Req, never>("put", url, body);
}

export const api = new Api(z.string().parse(import.meta.env.VITE_BACKEND_URL));
export const mapApi = new Api(z.string().parse(import.meta.env.VITE_GEOCODE_URL));