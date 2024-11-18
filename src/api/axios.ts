import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';

const apiClient: AxiosInstance = axios.create({
    baseURL: 'http://49.232.183.67:8087',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 添加请求拦截器
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 添加 token
        const token = localStorage.getItem('token');
        if (token && config.headers) {
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
        // 全局错误处理
        if (error.response && error.response.status === 401) {
            // 跳转登录页的逻辑，例如使用 router:
            // router.push('/login');
        }
        return Promise.reject(error);
    }
);

export default apiClient;