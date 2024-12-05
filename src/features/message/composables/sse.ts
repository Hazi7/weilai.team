import { ref, onBeforeUnmount, watchEffect } from 'vue';

// 定义SSE事件类型
export type SSEEventType = 'message' | 'open' | 'error';

// 定义消息数据类型
export type SSEMessageData = {
    messageId: number;
    messageType: number;
    senderId: number;
    username: string;
    headPortrait: string | null;
    postId: number;
    postTitle: string;
    content: string | null;
    createdAt: string;
};

// 定义通知数据类型
export type SSENoticeData = {
    noticeId: string;
    title: string;
    content: string;
    createAt: string;
    senderId: number;
    username: string;
    headPortrait: string;
    status: number | null;
};

const getUserId = (): number => {
    const userIdValue = localStorage.getItem('userId');
    if (userIdValue) {
        try {
            const tokenObject = JSON.parse(userIdValue);
            return tokenObject.value;
        } catch (error) {
            console.error('解析token字符串失败', error);
        }
    }
    return 0;
};

const userId = getUserId();

export default function useSSE() {
    const sseUrl = ref(`http://49.232.183.67:8087/message/sse/addClient/${userId}`);
    const isConnected = ref(false);
    const reconnectInterval = 5000; // 5秒
    const maxReconnectAttempts = 10; // 最大重试次数
    let reconnectAttempts = 0; // 当前重试次数
    let reconnectTimer: number | null = null;
    let eventSource: EventSource | null = null;

    // 观察者对象，用于存储不同事件类型的回调函数数组
    const observers: Record<SSEEventType, Function[]> = { message: [], open: [], error: [] };
    const connect = () => {
        if (!navigator.onLine) {
            console.error('当前设备未联网，请检查网络连接后重试');
            return;
        }
        if (eventSource && eventSource.readyState === EventSource.OPEN) {
            console.log('SSE已经连接，避免重复连接');
            return;
        }
        try {
            reconnectAttempts = 0;
            eventSource = new EventSource(sseUrl.value);
            // 监听连接成功
            eventSource.onopen = () => {
                console.log("SSE连接已打开");
                isConnected.value = true;
                notify('open');
            };
            eventSource.onmessage = handleMessage;
            eventSource.onerror = (event) => {
                console.error('SSE连接出错', event);
                isConnected.value = false;
                scheduleReconnect();
                notify('error', event);
            };
            console.log("EventSource readyState:", eventSource.readyState);
        } catch (error) {
            console.error('连接SSE失败', error);
            isConnected.value = false;
            scheduleReconnect();
        }
    };
    
    // 订阅事件
    const subscribe = (eventType: SSEEventType, callback: Function) => {
        if (!observers[eventType]) observers[eventType] = [];
        observers[eventType].push(callback);
    };
    // 取消订阅事件
    const unsubscribe = (eventType: SSEEventType, callback: Function) => {
        const eventObservers = observers[eventType];
        if (eventObservers) {
            const index = eventObservers.indexOf(callback);
            if (index > -1) eventObservers.splice(index, 1);
        }
    };
    // 处理接收到的消息
    const handleMessage = (event: MessageEvent) => {
        console.log('收到SSE消息:', event.data);
        try {
            const data = JSON.parse(event.data);
            // 数据格式验证
            if (!data.hasOwnProperty('messageId') && !data.hasOwnProperty('noticeId')) {
                console.error('接收到的SSE消息数据格式不正确，缺少必要字段');
                return;
            }
            if (data.hasOwnProperty('noticeId')) {
                // 公告
                const newData: SSENoticeData = data;
                notify('message', newData); // 通知所有订阅者
            } else {
                // 消息
                const oldData: SSEMessageData = data;
                notify('message', oldData); // 通知所有订阅者
            }
        } catch (error) {
            console.error('解析SSE消息数据失败', error);
        }
    };
    // 通知所有订阅者
    const notify = (eventType: SSEEventType, data?: SSEMessageData | SSENoticeData | Event) => {
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

    // 安排重新连接
    const scheduleReconnect = () => {
        if (reconnectAttempts >= maxReconnectAttempts) {
            console.error('最大重试次数已达，停止重试');
            return;
        }
        
        reconnectAttempts++;
        const interval = Math.min(reconnectInterval * Math.pow(2, reconnectAttempts), 60000); 
        // 指数回退，最大重试间隔为60秒

        if (reconnectTimer === null) {
            reconnectTimer = window.setTimeout(() => {
                reconnectTimer = null;
                connect(); // 尝试重新连接
            }, interval);
        }
    };

    // 断开连接
    const disconnect = () => {
        if (eventSource) {
            eventSource.close();
            eventSource = null;
        }
        if (reconnectTimer) {
            clearTimeout(reconnectTimer);
            reconnectTimer = null;
        }
        isConnected.value = false;
    };

    // 清理资源
    onBeforeUnmount(() => {
        disconnect();
    });

    // 监听连接状态
    watchEffect(() => {
        if (isConnected.value) {
            console.log('已连接到SSE服务器');
        } else {
            console.log('未连接到SSE服务器');
        }
    });

    return {
        connect,
        subscribe,
        unsubscribe,
        disconnect,
        isConnected,
    };
}
