import axios, {AxiosInstance, AxiosResponse, AxiosRequestConfig} from "axios"

class ApiClient {
    private instance: AxiosInstance | null = null;

    private get http(): AxiosInstance {
        return this.instance != null ? this.instance : this.initHttp();
    }

    initHttp(){
        const url = import.meta.env.VITE_API_URL;
        const http = axios.create({
            baseURL: url
        });

        this.instance = http;
        return http;
    }

    request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R>{
        return this.http.request(config);
    }

    get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>{
        return this.http.get<T, R>(url, config);
    }

    post<T = any, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R>{
        return this.http.post<T, R>(url, data, config);
    }

    patch<T = any, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R>{
        return this.http.patch<T, R>(url, data, config);
    }

    put<T = any, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R>{
        return this.http.put<T, R>(url, data, config);
    }

    delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>{
        return this.http.delete<T, R>(url, config);
    }
}

export const api = new ApiClient();