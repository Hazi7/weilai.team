import { shallowRef, Ref } from "vue";
import apiClient from "../api/axios";

// 定义 HTTP 方法的类型
type HttpMethod = "get" | "post" | "put" | "delete";

interface RequestOptions {
    url: string;
    method?: HttpMethod;
    requestData?: Record<string, unknown>;
}

// 定义 useRequest 返回的类型
interface UseRequestResult<T> {
    data: Ref<T | null>;
    error: Ref<Error | null>;
    loading: Ref<boolean>;
    executeRequest: (options: RequestOptions) => Promise<void>;
}

export function useRequest<T = unknown>(): UseRequestResult<T> {
    const data = shallowRef<T | null>(null);
    const error = shallowRef<Error | null>(null);
    const loading = shallowRef<boolean>(false);

    const executeRequest = async ({
        url,
        method = "get",
        requestData,
    }: RequestOptions): Promise<void> => {
        loading.value = true;
        error.value = null;

        try {
            const response = await apiClient.request<T>({
                url,
                method,
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
