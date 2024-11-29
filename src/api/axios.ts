import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';
import { useLocalStorageWithExpire } from "../composables/useLocalStorage";
const {setLocalStorageWithExpire,getLocalStorageWithExpire}=useLocalStorageWithExpire()
const apiClient: AxiosInstance = axios.create({
  baseURL:"http://49.232.183.67:8087",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 添加请求拦截器
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 添加 token
    const token = getLocalStorageWithExpire('token');
    // const token = localStorage.getItem('token');
    if (token && config.headers) {
      setLocalStorageWithExpire('token',token,1000*60*60)
      // localStorage.setItem('token',token)
      config.headers.token = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;