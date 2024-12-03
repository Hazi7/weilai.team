export interface PageInfo {
  countId: null;
  current: number;
  maxLimit: null;
  optimizeCountSql: true;
  orders: [];
  pages: number;
  records: [];
  searchCount: true;
  size: number;
  total: number;
}

export interface TeamInfo {
  grade: string;
  group: [];
  name: string;
  postCount: number;
  userDestination: string;
  userId: number;
  viewCount: number;
}
export interface TeamUserList {
  clazz: string;
  grade: string;
  group: string;
  id: number;
  name: string;
  studyId: string;
}

export interface ContactData {
  data: {
    teamUserList: TeamUserList[];
    teamAble: TeamInfo[];
    pageInfo: PageInfo;
    userCount: number;
  };
}
