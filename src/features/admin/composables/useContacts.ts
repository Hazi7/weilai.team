import { useAlert } from "@/composables/alert";
import { useRequest } from "@/composables/useRequest";
import type { ContactData, MemeberData } from "@/types/Contacts";
import { ref } from "vue";
const { showAlert } = useAlert();
const { executeRequest, error, loading, data } = useRequest();
const contactsData = ref<ContactData>();
export async function getMembers(pageNumber = 1, pageSize = 10) {
  await executeRequest({
    url: `/userManager/teamInfo/getTeamUserList/${pageNumber}/${pageSize}`,
    method: "get",
  });
  const res = data.value as ContactData;
  console.log(data.value);

  return res.data;
}
export async function getMembersByGroupAndGrade(
  grade: string,
  group: string,
  pageNumber = 1,
  pageSize = 10,
) {
  await executeRequest({
    url: `/userManager/teamInfo/getUserListByGroup?grade=${grade}&group=${group}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    method: "get",
  });
  const res = data.value as ContactData;
  return res.data;
}
export async function searchMember(content = "") {
  await executeRequest({
    url: `/userManager/teamInfo/searchTeamUser?content=${content}`,
    method: "get",
  });
  const res = data.value as ContactData;
}
export async function getMemberInfo(userId: number) {
  await executeRequest({
    url: `/userManager/teamInfo/getTeamUser/?userId=${userId}`,
    method: "get",
  });
  const res = data.value as MemeberData;
  return res.data;
}
export async function setLeader(leaderInfo: {}) {
  await executeRequest({
    url: "/userManager/teamInfo/setGroupLabel",
    method: "post",
    requestData: leaderInfo,
  });
  console.log(data.value);
  return data.value;
}
export async function updateInfo(updateTeamUserInfoDTO: {}) {
  await executeRequest({
    url: "/userManager/teamInfo/modifyTeamUserInfo",
    method: "put",
    requestData: updateTeamUserInfoDTO,
  });
  return data.value;
}
export { loading };
