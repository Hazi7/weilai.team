import { shallowRef, Ref } from 'vue';
import apiClient from '../api/axios';
import { AxiosResponse } from 'axios';

// 定义 HTTP 方法的类型
type HttpMethod = 'get' | 'post' | 'put' | 'delete';

// 定义请求函数的参数类型
interface RequestOptions {
  url: string;
  method?: HttpMethod;
  requestData?: Record<string, any>; 
}

// 定义 useRequest 返回的类型
interface UseRequestResult<T> {
  data: Ref<T | null>;
  error: Ref<Error | null>;
  loading: Ref<boolean>;
  executeRequest: (options: RequestOptions) => Promise<void>;
}

export function useRequest<T = any>(): UseRequestResult<T> {
  const data = shallowRef<T | null>(null);     
  const error = shallowRef<Error | null>(null); 
  const loading = shallowRef<boolean>(false);   

  const executeRequest = async ({ url, method = 'get', requestData }: RequestOptions): Promise<void> => {
    loading.value = true;
    error.value = null;

    try {
      let response: AxiosResponse<T>;

      // 根据 method 发起请求并获取响应
      if (method === 'get') {
        response = await apiClient.get<T>(url);
      } else if (method === 'post') {
        response = await apiClient.post<T>(url, requestData);
      } else if (method === 'put') {
        response = await apiClient.put<T>(url, requestData);
      } else if (method === 'delete') {
        response = await apiClient.delete<T>(url);
      } else {
        throw new Error(`Unsupported request method: ${method}`);
      }

      // 将响应内容中的 data 赋给 ref 的 data 值
      data.value = response.data;
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err));  // 捕获错误并赋给 error 变量
    } finally {
      loading.value = false;  // 请求结束，将 loading 状态设置为 false
    }
  };

  return {
    data,
    error,
    loading,
    executeRequest,
  };
}
