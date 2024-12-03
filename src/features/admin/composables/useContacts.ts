import { useAlert } from "@/composables/alert";
import { useRequest } from "@/composables/useRequest";
import type { ContactData } from "@/types/Contacts";
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
  console.log(res);

  return res.data;
}
export async function getMembersByGroupAndGrade(
  grade: string,
  group: string,
  pageNumber = 1,
  pageSize = 10,
) {
  console.log(group, grade);

  await executeRequest({
    url: `/userManager/teamInfo/getUserListByGroup?grade=${grade}&group=${group}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    method: "get",
  });
  const res = data.value as ContactData;
  return res.data;
}

export { loading };
