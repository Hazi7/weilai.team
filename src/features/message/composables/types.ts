export interface SSEMessageData {
    messageId: number;
    senderId: number;
    username: string;
    headPortrait: string | null;
    postId: number;
    postTitle: string;
    content: string | null;
    createdAt: string;
};

export interface SSENoticeData  {
    noticeId: number;
    title: string;
    content: string;
    createAt: string;
    noticeUrls: string[];
    senderId: number;
    username: string;
    headPortrait: string | null;
    status: number | null;
};
