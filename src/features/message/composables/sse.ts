import { ref, onBeforeUnmount } from 'vue';
import { EventSourcePolyfill } from "event-source-polyfill";

// 定义 SSE 事件类型
export type SSEEventType = 'message' | 'open' | 'error';
// SSE 消息数据结构
export type SSEMessageData = {
    type: string;
    content: string;
    timestamp: number;
    // 根据实际需求扩展字段
};
const getLocalToken = (): string => {
    const tokenString = localStorage.getItem('token');
    if (tokenString) {
        try {
            const tokenObject = JSON.parse(tokenString);
            return tokenObject.value;
        } catch (error) {
            console.error('解析token字符串失败', error);
        }
    }
    return '';
};

// 钩子函数
export default function useSSE() {
    const sseUrl = ref('/message/addClient');
    const sse = ref<EventSource | null>(null); // 使用 ref 包裹 EventSource
    const isConnected = ref(false); // 连接状态
    let reconnectTimer: number | null = null; // 重连定时器
    const reconnectInterval = 5000; // 重连间隔（毫秒）

    // 观察者模式，存储事件订阅者
    const observers = {
        message: [] as Function[],
        open: [] as Function[],
        error: [] as Function[]
    };

    // 连接到 SSE 服务器
    const connect = () => {
        if (sse.value) {
            sse.value.close(); // 在重新连接前关闭当前连接
        }
        try {
            const token = getLocalToken();            
            sse.value = new EventSourcePolyfill(sseUrl.value, {
                heartbeatTimeout: 3 * 60 * 1000,
                headers: {
                    Authorization: 'Bearer ' + token,
                    Accept: 'text/event-stream',
                },
                withCredentials: true,
            });
            sse.value.onmessage = handleMessage;
            sse.value.onopen = handleOpen;
            sse.value.onerror = handleError;
            isConnected.value = true;
        } catch (error) {
            console.error('连接 SSE 失败', error);
            isConnected.value = false;
            scheduleReconnect();
        }
    };

    // 订阅事件
    const subscribe = (eventType: SSEEventType, callback: Function) => {
        if (!observers[eventType]) {
            observers[eventType] = [];
        }
        observers[eventType].push(callback);
    };

    // 取消订阅事件
    const unsubscribe = (eventType: SSEEventType, callback: Function) => {
        const eventObservers = observers[eventType];
        if (eventObservers) {
            const index = eventObservers.indexOf(callback);
            if (index > -1) {
                eventObservers.splice(index, 1);
            }
        }
    };

    // 处理消息事件
    const handleMessage = (event: MessageEvent) => {
        try {
            const data: SSEMessageData = JSON.parse(event.data);
            notify('message', data);
        } catch (error) {
            console.error('解析 SSE 消息数据失败', error);
        }
    };

    // 处理连接打开事件
    const handleOpen = () => {
        console.log('SSE 连接已打开');
        isConnected.value = true;
        notify('open');
    };

    // 处理连接错误事件
    const handleError = () => {
        console.error('SSE 连接出错');
        isConnected.value = false;
        scheduleReconnect();
        notify('error');
    };

    // 通知所有订阅者
    const notify = (eventType: SSEEventType, data?: SSEMessageData | Event) => {
        const eventObservers = observers[eventType];
        if (eventObservers) {
            eventObservers.forEach((observer) => {
                if (eventType === 'message' && typeof data === 'object' &&!(data instanceof Event)) {
                    observer(data);
                } else {
                    observer(data || new Event(eventType));
                }
            });
        }
    };

    // 定时重连
    const scheduleReconnect = () => {
        if (!reconnectTimer) {
            reconnectTimer = window.setTimeout(() => {
                reconnectTimer = null;
                connect();
            }, reconnectInterval);
        }
    };

    // 断开连接
    const disconnect = () => {
        if (sse.value) {
            sse.value.close();
            isConnected.value = false;
            if (reconnectTimer) {
                clearTimeout(reconnectTimer);
                reconnectTimer = null;
            }
        }
    };

    // 在组件卸载前清理
    onBeforeUnmount(() => {
        disconnect();
    });

    return {
        connect,
        subscribe,
        unsubscribe,
        disconnect,
        isConnected
    };
}

