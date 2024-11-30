import { ref, onBeforeUnmount } from 'vue';
import { fetchEventSource } from '@microsoft/fetch-event-source'

// 定义 SSE 事件类型
export type SSEEventType = 'message' | 'open' | 'error';
// SSE 消息数据结构
export type SSEMessageData = {
    messageId: number;
    senderId: number;
    username: string;
    headPortrait: string | null;
    postId: number;
    postTitle: string;
    content: string | null;
    createdAt: string;
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

export default function useSSE() {
    const sseUrl = ref('http://49.232.183.67:8087/message/addClient');
    const isConnected = ref(false); // 连接状态
    let reconnectTimer: number | null = null; // 重连定时器
    const reconnectInterval = 5000; // 重连间隔（毫秒）

    // 观察者模式，存储事件订阅者
    const observers: Record<SSEEventType, Function[]> = {
        message: [],
        open: [],
        error: []
    };

    // 连接到 SSE 服务器
    const connect = () => {
        try {
            const token = getLocalToken();
            fetchEventSource(sseUrl.value, {
                headers: {
                    Authorization: token,
                },
                method: 'GET',
                onmessage: handleMessage,
                onopen: handleOpen,
                onerror: handleError,
            });

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
            const data: SSEMessageData = JSON.parse(event.data); // 解析消息数据

            // 根据消息数据，构造SSEMessageData
            const message: SSEMessageData = {
                messageId: data.messageId,
                senderId: data.senderId,
                username: data.username,
                headPortrait: data.headPortrait,
                postId: data.postId,
                postTitle: data.postTitle,
                content: data.content,
                createdAt: data.createdAt,
            };

            // 通知订阅者
            notify('message', message);
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
    const handleError = (error: Error) => {
        console.error('SSE 连接出错', error);
        isConnected.value = false;
        scheduleReconnect();
        notify('error');
    };

    // 通知所有订阅者
    const notify = (eventType: SSEEventType, data?: SSEMessageData | Event) => {
        const eventObservers = observers[eventType];
        if (eventObservers) {
            eventObservers.forEach((observer) => {
                if (eventType === 'message' && data && !(data instanceof Event)) {
                    observer(data); // 传递消息数据
                } else {
                    observer(data || new Event(eventType)); // 通知其他事件
                }
            });
        }
    };

    // 定时重连
    const scheduleReconnect = () => {
        if (!reconnectTimer) {
            reconnectTimer = window.setTimeout(() => {
                reconnectTimer = null;
                connect(); // 尝试重新连接
            }, reconnectInterval);
        }
    };

    // 断开连接
    const disconnect = () => {
        if (reconnectTimer) {
            clearTimeout(reconnectTimer);
            reconnectTimer = null;
        }
        isConnected.value = false;
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
