import { ref, type Ref } from "vue";
import apiClient from "@/api/axios";

// 定义 HTTP 方法的类型
type HttpMethod = "get" | "post" | "put" | "delete";

interface RequestOptions {
  url: string;
  method?: HttpMethod;
  requestData?: Record<string, unknown> | FormData;
  headers?: Record<string, string>; // 新增 headers 参数
}

// 定义 useRequest 返回的类型
interface UseRequestResult<T> {
  data: Ref<T | any>;
  error: Ref<Error | null>;
  loading: Ref<boolean>;
  executeRequest: (options: RequestOptions) => Promise<void>;
}

export function useRequest<T = any>(): UseRequestResult<T> {
  const data = ref<T | null>(null);
  const error = ref<Error | null>(null);
  const loading = ref<boolean>(false);

  const executeRequest = async ({
    url,
    method = "get",
    requestData,
    headers, // 接收 headers 参数
  }: RequestOptions): Promise<void> => {
    loading.value = true;
    console.log(loading);
    error.value = null;

    try {
      const response = await apiClient.request<T>({
        url,
        method,
        headers, // 添加 headers 到请求配置
        ...(method !== "get" ? { data: requestData } : {}),
      });

      data.value = response;
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err));
    } finally {
      loading.value = false;
    }
  };

  return {
    data,
    error,
    loading,
    executeRequest,
  };
}
