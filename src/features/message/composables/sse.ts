import { ref, onBeforeUnmount } from 'vue';
import { fetchEventSource } from '@microsoft/fetch-event-source'

// 定义 SSE 事件类型
export type SSEEventType = 'message' | 'open' | 'error';

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

export type SSENoticeData = {
    noticeId: number;
    title: string;
    content: string;
    createAt: string;
    noticeUrls: string[];
    senderId: number;
    username: string;
    headPortrait: string;
    status: number | null;
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
    const isConnected = ref(false);
    let reconnectTimer: number | null = null;
    const reconnectInterval = 5000;
    const observers: Record<SSEEventType, Function[]> = { message: [], open: [], error: [] };

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

    const subscribe = (eventType: SSEEventType, callback: Function) => {
        if (!observers[eventType]) observers[eventType] = [];
        observers[eventType].push(callback);
    };

    const unsubscribe = (eventType: SSEEventType, callback: Function) => {
        const eventObservers = observers[eventType];
        if (eventObservers) {
            const index = eventObservers.indexOf(callback);
            if (index > -1) eventObservers.splice(index, 1);
        }
    };

    // 修改 handleMessage 函数，判断数据格式
    const handleMessage = (event: MessageEvent) => {
        try {
            const data = JSON.parse(event.data);

            if (data.hasOwnProperty('noticeId')) {
                // 新数据格式（公告）
                const newData: SSENoticeData = data;
                notify('message', newData);  // 通知所有订阅者
            } else {
                // 旧数据格式
                const oldData: SSEMessageData = data;
                notify('message', oldData);  // 通知所有订阅者
            }
        } catch (error) {
            console.error('解析 SSE 消息数据失败', error);
        }
    };

    const handleOpen = () => {
        console.log('SSE 连接已打开');
        isConnected.value = true;
        notify('open');
    };

    const handleError = (error: Error) => {
        console.error('SSE 连接出错', error);
        isConnected.value = false;
        scheduleReconnect();
        notify('error');
    };

    const notify = (eventType: SSEEventType, data?: SSEMessageData | SSENoticeData | Event) => {
        const eventObservers = observers[eventType];
        if (eventObservers) {
            eventObservers.forEach((observer) => {
                if (eventType === 'message' && data && !(data instanceof Event)) {
                    observer(data);  // 传递消息数据
                } else {
                    observer(data || new Event(eventType));  // 通知其他事件
                }
            });
        }
    };

    const scheduleReconnect = () => {
        if (!reconnectTimer) {
            reconnectTimer = window.setTimeout(() => {
                reconnectTimer = null;
                connect();  // 尝试重新连接
            }, reconnectInterval);
        }
    };

    const disconnect = () => {
        if (reconnectTimer) {
            clearTimeout(reconnectTimer);
            reconnectTimer = null;
        }
        isConnected.value = false;
    };

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
