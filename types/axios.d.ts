import type { ApiResponseData } from "@/types/api-response";
import "axios";

declare module "axios" {
  export interface AxiosInstance {
    <T = any>(config: AxiosRequestConfig): Promise<ApiResponseData<T>>;
    request<T = any>(config: AxiosRequestConfig): Promise<ApiResponseData<T>>;
    get<T = any>(
      url: string,
      config?: AxiosRequestConfig,
    ): Promise<ApiResponseData<T>>;
    delete<T = any>(
      url: string,
      config?: AxiosRequestConfig,
    ): Promise<ApiResponseData<T>>;
    head<T = any>(
      url: string,
      config?: AxiosRequestConfig,
    ): Promise<ApiResponseData<T>>;
    post<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<ApiResponseData<T>>;
    put<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<ApiResponseData<T>>;
    patch<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<ApiResponseData<T>>;
  }
}
