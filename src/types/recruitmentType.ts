type OnClickFunction = (id:string) => void;


 const enum interviewStatus{  //面试状态
    待安排=0,
    待面试=1,
    已录取=2,
    已淘汰=3,
}
//状态映射对象
export const interviewStatusMap ={
    [interviewStatus.待安排]: '待安排',
    [interviewStatus.待面试]: '待面试',
    [interviewStatus.已录取]: '已录取',
    [interviewStatus.已淘汰]: '已淘汰',
}


//返回值类型
export interface IResponseDataApplyUser {
        code: number;
        message: string;
        data:{
            total: number;
            pageNum: number;
            pageSize: number;
            data: IAllApplyUserDTO[]
        }
  }


//根据条件获取报名人员    数据传输对象
export interface IGetAllApplyUserDTO {
    clazz?: string;
    condition?: string;  //姓名 qq 邮箱 学号
    dateString?: string;  //筛选日期 格式为 2023-08-20 2023-08-21
    grade?: string;//年级
    sex?: string;
    status?: interviewStatus;
    pageNo?: number ;
    pageSize?: number;//每页数量
}
// 报名人员信息 数据传输对象
export interface IAllApplyUserDTO{
    clazz: string;
    email: string;
    fileUrl: string;
    grade: string;
    id: number;
    status:interviewStatus;
    name: string;
    qqNumber: string;
    sex: string;
    studentId: string;
}

// 报名人员信息 视图渲染对象
export interface IAllApplyUserVO{
    id: string;
    name: string;
    session: string;
    clazz: string;
    studentId: string;
    gender: string;
    QQ: string;
    email: string;
    state: string;
}


//获取所有年级  数据传输对象
export interface IGetAllGradeDTO{
    pageNo?: number |1;
    pageSize?: number | 10;
}


// 表格头部信息
export type tableHeadersVO= {
    title: string;
    key: string;
}
// 表格操作按钮
export type tableActionsVO= {
    title: string;
    icon: string;
    onclick:OnClickFunction;
}