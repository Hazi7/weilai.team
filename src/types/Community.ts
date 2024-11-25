export interface Data {
  data: ArticleInfo;
}
export interface ArticleInfo {
  countId: number;
  current: number;
  maxLimit: number;
  optimizeCountSql: boolean;
  orders: [];
  pages: number;
  records: ArticleList[];
  searchCount: boolean;
  size: number;
  total: number;
}

export interface ArticleList {
  id: number;
  collectCount?: number;
  commentCount?: number;
  isCollect?: false;
  isLike?: false;
  likeCount?: 1;
  postAbstract: string;
  postTags: string[];
  postTxt: string;
  title: string;
  userId?: 12;
  viewCount?: 24;
}
