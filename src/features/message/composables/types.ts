export interface SSEMessageData {
    messageId: number;
    messageType:number;
    senderId: number;
    username: string;
    headPortrait: string | null;
    postId: number;
    postTitle: string;
    content: string | null;
    createdAt: string;
};

export interface SSENoticeData  {
    noticeId: string;
    title: string;
    content: string;
    createAt: string;
    senderId: number;
    username: string;
    headPortrait: string | null;
    status: number | null;
};
