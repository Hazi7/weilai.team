import   {useRequest}  from '@/composables/useRequest';
const { data, error,loading,executeRequest}=useRequest();



import type  {  IGetAllApplyUserDTO ,IGetAllGradeDTO } from '@/types/recruitmentType';
// 招新模块


//获取所有提交报名的人员
export const getAllApplyUser = async ({ pageNo, pageSize, status, sex, clazz, condition, dateString, grade }: IGetAllApplyUserDTO) => {
  // console.log(pageNo, pageSize, status, sex, clazz, condition, dateString, grade);

  const queryParams: { [key: string ]: string } = {};

  if (pageNo !== undefined && pageNo !== null) queryParams['pageDTO.pageNo'] = String(pageNo);
  if (pageSize !== undefined && pageSize !== null) queryParams['pageDTO.pageSize']= String(pageSize);
  if (status!== undefined && status!== null) queryParams.status= String(status);
  if (sex !== undefined && sex !== null) queryParams.sex = String(sex);
  if (clazz !== undefined && clazz !== null) queryParams.clazz = String(clazz);
  if (condition !== undefined && condition !== null) queryParams.condition = String(condition);
  if (dateString !== undefined && dateString !== null) queryParams.dateString = String(dateString);
  if (grade !== undefined && grade !== null) queryParams.grade = String(grade);

  const queryString = Object.keys(queryParams)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
    .join('&');

  const url = `/recruit/manage/listAllRecruitUser${queryString ? `?${queryString}` : ''}`;
  await executeRequest({
    url: url,
    method: 'get',
  });

  return { data, error, loading };
};


//获取所有年级
export const getAllGrade = async ({pageNo, pageSize}:IGetAllGradeDTO) => {

  const queryParams: { [key: string ]: string } = {};

  if (pageNo !== undefined && pageNo !== null) queryParams.pageNo = String(pageNo);
  if (pageSize !== undefined && pageSize !== null) queryParams.pageSize= String(pageSize);

  const queryString = Object.keys(queryParams)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
  .join('&');

  const url = `/recruit/manage/listAllGrade${queryString? `?${queryString}` : ''}`;
  await executeRequest({
    url: url,
    method: 'get',
  });
  return { data, error, loading };
};


//根据id获取某人的简历
export const getResumeById = async ({id}:{id:string}) => {

  const url = `/recruit/manage/getResume/${id}`;

  await executeRequest({
    url: url,
    method: 'get',
  });
  return { data, error, loading };
};

//根据id 删除候选人
export const deleteApplyUserById = async ({id}:{id:string}) => {

  const url = `/recruit/manage/deleteRecruitUser?id=${id}`;

  await executeRequest({
    url: url,
    method: 'delete',
  });
  return { data, error, loading };
};