export interface CommentProps {
    id: number;
    nickname: string;
    time: string;
    comment: string;
    likeCount: number;
    commentCount: number;
    isReply?: boolean;
    replyToId?: number; 
    replyToNickname?: string;
  }
  
