import { ref, onBeforeUnmount, watchEffect } from 'vue';
import { fetchEventSource, type EventSourceMessage } from '@microsoft/fetch-event-source';

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

// 获取本地存储的token
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
    // 观察者对象，用于存储不同事件类型的回调函数数组
    const observers: Record<SSEEventType, Function[]> = { message: [], open: [], error: [] };

    // 连接到SSE服务器
    const connect = async () => {
        if (!navigator.onLine) {
            console.error('当前设备未联网，请检查网络连接后重试');
            return;
        }
        try {
            const token = getLocalToken();
            await fetchEventSource(sseUrl.value, {
                headers: {
                    Authorization: token,
                },
                method: 'GET',
                onmessage: handleMessage,
                onopen: handleOpen,
                onerror: handleError,
                onclose: handleClose,
            });

            isConnected.value = true;
        } catch (error) {
            console.error('连接SSE失败', error);
            isConnected.value = false;
            console.error('连接失败详细信息：', error.message, error.stack);
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
    const handleMessage = (event: EventSourceMessage) => {
        console.log('收到SSE消息:', event.data);
        try {
            const data = JSON.parse(event.data);

            // 先进行数据格式的基本验证
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
                console.log(oldData);
            }
        } catch (error) {
            console.error('解析SSE消息数据失败', error);
        }
    };

    // 处理连接打开事件
    const handleOpen = async () => {
        console.log('SSE连接已打开');
        isConnected.value = true;
        notify('open');
    };

    // 处理连接错误事件
    const handleError = (error: any) => {
        console.error('SSE连接出错', error);
        isConnected.value = false;
        console.log('SSE连接已断开，正在尝试重新连接...');
        scheduleReconnect();
        notify('error');
    };

    // 处理连接关闭事件
    const handleClose = () => {
        console.log('SSE连接已关闭');
        isConnected.value = false;
        scheduleReconnect();
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

    onBeforeUnmount(() => {
        disconnect();
    });

    // 使用watchEffect监听连接状态变化
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
        isConnected
    };
}



// import { ref, onBeforeUnmount, watchEffect } from 'vue';

// // 定义SSE事件类型
// export type SSEEventType = 'message' | 'open' | 'error';

// // 定义消息数据类型
// export type SSEMessageData = {
//     messageId: number;
//     messageType: number;
//     senderId: number;
//     username: string;
//     headPortrait: string | null;
//     postId: number;
//     postTitle: string;
//     content: string | null;
//     createdAt: string;
// };

// // 定义通知数据类型
// export type SSENoticeData = {
//     noticeId: string;
//     title: string;
//     content: string;
//     createAt: string;
//     senderId: number;
//     username: string;
//     headPortrait: string;
//     status: number | null;
// };

// // 获取本地存储的token
// const getLocalToken = (): string => {
//     const tokenString = localStorage.getItem('token');
//     if (tokenString) {
//         try {
//             const tokenObject = JSON.parse(tokenString);
//             return tokenObject.value;
//         } catch (error) {
//             console.error('解析token字符串失败', error);
//         }
//     }
//     return '';
// };

// export default function useSSE() {
//     const sseUrl = ref('http://49.232.183.67:8087/message/addClient');
//     const isConnected = ref(false);
//     let reconnectTimer: number | null = null;
//     const reconnectInterval = 5000;
//     let eventSource: EventSource | null = null;

//     // 观察者对象，用于存储不同事件类型的回调函数数组
//     const observers: Record<SSEEventType, Function[]> = { message: [], open: [], error: [] };

//     // 连接到SSE服务器
//     const connect = () => {
//         if (!navigator.onLine) {
//             console.error('当前设备未联网，请检查网络连接后重试');
//             return;
//         }
//         try {
//             const token = getLocalToken();
//             const urlWithToken = `${sseUrl.value}?token=${token}`;
//             eventSource = new EventSource(urlWithToken);

//             // 监听事件
//             eventSource.onopen = handleOpen;
//             eventSource.onmessage = handleMessage;
//             eventSource.onerror = handleError;

//             isConnected.value = true;
//         } catch (error) {
//             console.error('连接SSE失败', error);
//             isConnected.value = false;
//             // 更详细的错误日志记录
//             console.error('连接失败详细信息：', error.message, error.stack);
//             scheduleReconnect();
//         }
//     };

//     // 订阅事件
//     const subscribe = (eventType: SSEEventType, callback: Function) => {
//         if (!observers[eventType]) observers[eventType] = [];
//         observers[eventType].push(callback);
//     };

//     // 取消订阅事件
//     const unsubscribe = (eventType: SSEEventType, callback: Function) => {
//         const eventObservers = observers[eventType];
//         if (eventObservers) {
//             const index = eventObservers.indexOf(callback);
//             if (index > -1) eventObservers.splice(index, 1);
//         }
//     };

//     // 处理接收到的消息
//     const handleMessage = (event: MessageEvent) => {
//         console.log('收到SSE消息:', event.data);
//         try {
//             const data = JSON.parse(event.data);

//             // 先进行数据格式的基本验证
//             if (!data.hasOwnProperty('messageId') && !data.hasOwnProperty('noticeId')) {
//                 console.error('接收到的SSE消息数据格式不正确，缺少必要字段');
//                 return;
//             }

//             if (data.hasOwnProperty('noticeId')) {
//                 // 公告
//                 const newData: SSENoticeData = data;
//                 notify('message', newData); // 通知所有订阅者
//             } else {
//                 // 消息
//                 const oldData: SSEMessageData = data;
//                 notify('message', oldData); // 通知所有订阅者
//                 console.log(oldData);
//             }
//         } catch (error) {
//             console.error('解析SSE消息数据失败', error);
//         }
//     };

//     // 处理连接打开事件
//     const handleOpen = () => {
//         console.log('SSE连接已打开');
//         isConnected.value = true;
//         notify('open');
//     };

//     // 处理连接错误事件
//     const handleError = (event: Event) => {
//         console.error('SSE连接出错', event);
//         isConnected.value = false;
//         console.log('SSE连接已断开，正在尝试重新连接...');
//         scheduleReconnect();
//         notify('error');
//     };

//     // 通知所有订阅者
//     const notify = (eventType: SSEEventType, data?: SSEMessageData | SSENoticeData | Event) => {
//         const eventObservers = observers[eventType];
//         if (eventObservers) {
//             eventObservers.forEach((observer) => {
//                 if (eventType === 'message' && data && !(data instanceof Event)) {
//                     observer(data); // 传递消息数据
//                 } else {
//                     observer(data || new Event(eventType)); // 通知其他事件
//                 }
//             });
//         }
//     };

//     // 安排重新连接
//     const scheduleReconnect = () => {
//         if (!reconnectTimer) {
//             reconnectTimer = window.setTimeout(() => {
//                 reconnectTimer = null;
//                 connect(); // 尝试重新连接
//             }, reconnectInterval);
//         }
//     };

//     // 断开连接
//     const disconnect = () => {
//         if (eventSource) {
//             eventSource.close();
//             eventSource = null;
//         }
//         if (reconnectTimer) {
//             clearTimeout(reconnectTimer);
//             reconnectTimer = null;
//         }
//         isConnected.value = false;
//     };

//     onBeforeUnmount(() => {
//         disconnect();
//     });

//     // 使用watchEffect监听连接状态变化
//     watchEffect(() => {
//         if (isConnected.value) {
//             console.log('已连接到SSE服务器');
//         } else {
//             console.log('未连接到SSE服务器');
//         }
//     });

//     return {
//         connect,
//         subscribe,
//         unsubscribe,
//         disconnect,
//         isConnected
//     };
// }
