import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { useLocalStorageWithExpire } from "../composables/useLocalStorage";
import router from "@/router";
const { setLocalStorageWithExpire, getLocalStorageWithExpire } =
  useLocalStorageWithExpire();
const apiClient: AxiosInstance = axios.create({
  baseURL: "http://49.232.183.67:8087",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 添加请求拦截器
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getLocalStorageWithExpire("token");
    if (token && config.headers) {
      setLocalStorageWithExpire("token", token, 1000 * 60 * 60);
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 添加响应拦截器
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data.code === 401) {
      console.log("token过期或未登录");
      router.push("/login");
    }
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default apiClient;
