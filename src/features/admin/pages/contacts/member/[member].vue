<template>
  <main class="flex-1 items-start gap-4 md:gap-8 main">
    <Tabs default-value="all">
      <div
        class="flex items-center"
        style="margin: 5px 0px; height: 5vh; width: 100%"
      >
        <TabsList>
          <div class="top-title">
            <span>{{ grade }}未来软件工作室</span>
          </div>
        </TabsList>
        <div class="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="outline" size="sm" class="h-7 gap-1 header-btn">
                <Icon icon="proicons:person-2" />
                <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  设置组长
                </span>
              </Button>
            </DropdownMenuTrigger>
          </DropdownMenu>
          <SelectLeader :grade="grade" :group="group" />
          <Button size="sm" variant="outline" class="h-7 gap-1 header-btn">
            <Icon icon="proicons:person-2" />
            <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
              编辑组织
            </span>
          </Button>
        </div>
      </div>
      <hr />
      <TabsContent value="all" class="tc">
        <Card class="border-none shadow-none card">
          <CardHeader class="card-header">
            <div class="header-link">
              <button>
                <RouterLink
                  to="/admin/recruitment/detail"
                  class="addMember head"
                >
                  <Icon icon="icon-park-outline:people-plus-one" />
                  &nbsp;
                  <span>添加成员</span>
                </RouterLink>
              </button>
              <button>
                <RouterLink
                  to="/admin/recruitment/detail"
                  class="addMember head"
                >
                  <span>批量管理</span>
                </RouterLink>
              </button>
            </div>
          </CardHeader>
          <CardContent class="p-0">
            <Table id="tb" ref="tableRef">
              <TableHeader>
                <TableRow>
                  <TableHead class="hidden w-[100px] md:table-cell text-left">
                    <input type="checkbox" name="" id="" />
                  </TableHead>
                  <TableHead class="hidden md:table-cell" id="th"
                    >姓名</TableHead
                  >
                  <TableHead class="hidden md:table-cell">组织</TableHead>
                  <TableHead class="hidden md:table-cell"> 年级 </TableHead>
                  <TableHead class="hidden md:table-cell"> 班级 </TableHead>
                  <TableHead class="hidden md:table-cell"> 学号 </TableHead>
                  <TableHead class="hidden md:table-cell"> 操作 </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody ref="tbodyRef">
                <!-- 属性class=group-leader 为组长样式  -->
                <TableRow v-if="userGroupList" class="group-leader">
                  <TableCell class="hidden sm:table-cell"
                    ><input type="checkbox" name="" id=""
                  /></TableCell>
                  <TableCell class="font-medium">
                    {{ userGroupList.name }}</TableCell
                  >
                  <TableCell>
                    {{
                      chineseNums[
                        userGroupList.group as keyof typeof chineseNums
                      ] + "组" || "未知"
                    }}
                  </TableCell>
                  <TableCell class="hidden md:table-cell">
                    {{ userGroupList.grade }}级
                  </TableCell>
                  <TableCell class="hidden md:table-cell">
                    {{ userGroupList.clazz }}
                  </TableCell>
                  <TableCell class="hidden md:table-cell">
                    {{ userGroupList.studyId }}
                  </TableCell>
                  <TableCell>
                    <MemberInfo
                      :userId="userGroupList.id"
                      :sendUpdateInfo="getUpdateInfo"
                      :rowData="editRowData"
                    >
                      <DropdownMenu>
                        <DropdownMenuTrigger as-child>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                            class="h-[3vh]"
                          >
                            <MoreHorizontal class="h-4 w-4" />
                            <span class="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent class="bg-white">
                          <!-- <MemberInfo>编辑</MemberInfo> -->
                          <DialogTrigger class="w-full"
                            ><DropdownMenuItem
                              @click="sendOldData(userGroupList, 0)"
                              ><Icon
                                icon="cuida:edit-outline"
                              />编辑</DropdownMenuItem
                            ></DialogTrigger
                          >
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </MemberInfo>
                  </TableCell>
                </TableRow>
                <TableRow
                  v-for="(user, index) in userList"
                  :key="index"
                  ref="rowRefs"
                >
                  <TableCell class="hidden sm:table-cell"
                    ><input type="checkbox" name="" id=""
                  /></TableCell>
                  <TableCell class="font-medium"> {{ user.name }}</TableCell>
                  <TableCell>
                    {{
                      chineseNums[user.group as keyof typeof chineseNums] +
                        "组" || "未知"
                    }}
                  </TableCell>
                  <TableCell class="hidden md:table-cell">
                    {{ user.grade }}级
                  </TableCell>
                  <TableCell class="hidden md:table-cell">
                    {{ user.clazz }}
                  </TableCell>
                  <TableCell class="hidden md:table-cell">
                    {{ user.studyId }}
                  </TableCell>
                  <TableCell>
                    <MemberInfo
                      :userId="user.id"
                      :rowData="editRowData"
                      :sendUpdateInfo="getUpdateInfo"
                    >
                      <DropdownMenu>
                        <DropdownMenuTrigger as-child>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                            class="h-[3vh]"
                          >
                            <MoreHorizontal class="h-4 w-4" />
                            <span class="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent class="bg-white">
                          <DialogTrigger class="w-full">
                            <!-- @click="sendOldData(user)" -->
                            <DropdownMenuItem
                              @click="sendOldData(user, index + 1)"
                            >
                              <Icon icon="cuida:edit-outline" />
                              编辑
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </MemberInfo>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter> </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  </main>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import MemberInfo from "@/features/admin/components/contacts/MemberInfo.vue";
import SelectLeader from "@/features/admin/components/contacts/SelectLeader.vue";
import { getMembersByGroupAndGrade } from "@/features/admin/composables/useContacts";
import type { TeamUserList } from "@/types/Contacts";
import { Icon } from "@iconify/vue";
import { MoreHorizontal } from "lucide-vue-next";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
const editRowData = ref<TeamUserList>();
const tableRef = ref<InstanceType<typeof Table> | null>(null);
const rowRefs = ref<InstanceType<typeof TableRow> | []>([]);
const tbodyRef = ref<InstanceType<typeof TableBody> | null>(null);
const trs = ref<HTMLTableRowElement[]>([]);
// const logTableInfo = () => {
// onMounted(() => {
//   if (tableRef.value) {
//     console.log(tableRef.value.$el.getElementsByTagName("tr"));
//     const trCollection = tableRef.value.$el.getElementsByTagName("tr");
//     console.log(trCollection.length);

//     const trs = Array.from(trCollection);
//     console.log(trs);
//     console.log(trs.length);

//     console.log(tableRef.value.$el.getElementsByTagName("tr").length);
//     const length = Array.from(tableRef.value.$el.querySelectorAll("tr"));
//     console.log(length);

//     // console.log(tableRef.value.$refs.table);
//     const table = tableRef.value.$refs.table as HTMLTableElement;
//     console.log(table.rows.length);

//     // 这里还可以进行更多对表格元素的操作，比如获取列数等
//   }
// });
function gettrs(index?: number) {
  if (tableRef.value) {
    console.log(tableRef.value.$el.getElementsByTagName("tr"));
    const trCollection = tableRef.value.$el.getElementsByTagName("tr");

    const trs = Array.from(trCollection);
    // 删除第一行
    trs.splice(0, 1);
    console.log(trCollection.length);
    console.log(trs);

    // 这里还可以进行更多对表格元素的操作，比如获取列数等
  }
}
// };

function sendOldData(oldData: TeamUserList, index: number) {
  // 将旧数据赋值给editRowData 并传递给子组件（弹窗）以进行修改
  editRowData.value = oldData;
  gettrs();
}
function getUpdateInfo(updateObj: TeamUserList) {
  // 更新数据(通过子组件接收回来新数据)
  console.log("收到数据了", updateObj);
}
const route = useRoute();
const member = ref("");
console.log(route.params);
const chineseNums = {
  "1": "一",
  "2": "二",
  "3": "三",
  "4": "四",
  "5": "五",
  "6": "六",
  "7": "七",
  "8": "八",
  "9": "九",
};

const userList = ref<TeamUserList[]>();
const userGroupList = ref<TeamUserList>();
const grade = ref("");
const group = ref("");
if (route.params && "member" in route.params) {
  const memberValue = route.params.member as string;
  grade.value = member.value.split(",")[0] || route.params.member.split(",")[0];
  group.value = member.value.split(",")[1] || route.params.member.split(",")[1];
} else {
  grade.value = "";
  group.value = "";
}

getMembersByGroupAndGrade(grade.value, group.value).then((res) => {
  console.log(res);
  userGroupList.value = res.userGroupLeader;
  userList.value = res.teamUserList;
  console.log(userList.value);
});
watch(route, (newVal) => {
  console.log("路由变了");
  member.value = (route.params as any).member as string;
  console.log(member.value);
  grade.value = member.value.split(",")[0];
  group.value = member.value.split(",")[1];
  console.log(grade.value, group.value);

  getMembersByGroupAndGrade(grade.value, group.value).then((res) => {
    userGroupList.value = res.userGroupLeader;
    userList.value = res.teamUserList;
    console.log(userList.value);
  });
});
</script>

<style lang="scss" scoped>
$font: #8c9296;

th {
  height: 5.5vh;
}
tr {
  text-align: center;
  font-size: 0.9vw;
}
#tb {
  padding: 0;
  border: 0.1vw solid var(--border);
  border-radius: var(--radius);
}
th {
  text-align: center;
  color: var(--secondary-foreground);
}
td {
  height: 5vh;
  font-size: 0.9vw;
  padding: 0.7vh 0;
}
.main {
  width: 55vw;
}
.group-leader {
  background-color: var(--secondary);
}
.table-actions {
  height: 5vh;
}
.content {
  width: 100%;
  height: 90vh;
  overflow: hidden;
  background-color: white;
  #sidebar {
    color: var(--secondary-foreground);
    width: 20vw;
    a {
      display: block;
    }
    .sidebar-link {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.1vw;
      width: 100%;
      height: 4vh;
      &-item {
        display: flex;
        align-items: center;
        padding: 0.8vh 1vw;
        width: 100%;
        height: max-content;
        font-size: 0.9vw;
        color: var(--secondary-foreground);
        border-radius: var(--radius);
        border: 0.1vw solid #e8ebec;
      }
    }
  }
  #sidebar-container {
    width: 20vw;

    overflow: hidden;
  }
}
.sidebar-menu {
  color: var(--secondary-foreground);
}
#search {
  border-radius: 10px;
  height: 5vh;
  margin-bottom: 10px;
  border: 1px solid #d0d9e4;
  #search_input {
    border-style: none !important;
    height: 100% !important;
    padding: 0 5px !important;
  }
  .search {
    position: relative;

    &_list {
      box-shadow:
        0px 2px 5px rgba(0, 0, 0, 0.1),
        inset 0px 0.2px 0.5px rgba(0, 0, 0, 0.24);
      border: 1px solid var(--secondary-border);
      position: absolute;
      top: 5vh;
      padding: 5px 0;
      border-radius: 2px;
      width: 280px;
      z-index: 5;
      background-color: white;
    }
    &_item {
      &:hover {
        background-color: #f8f8fa;
      }
    }
  }
  input {
    width: 100%;
    height: 45px;
    border: 1px solid #d0d9e4;
    border-radius: 10px;
    padding: 5px 10px;
    padding-left: 30px;
  }
  .search-icon {
    position: absolute;
    top: 50%;
    left: 2%;
    transform: translateY(-50%);
  }
}
#sideber {
  &-provider {
    width: 20vw;
  }
  .group {
    width: 20vw;
  }
}
.card {
  padding: 0 2vw;
  .card-header {
    padding: 1vh 0;
    .header-link {
      display: flex;
      button {
        margin-right: 10px;
      }
      .head {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        text-align: center;
        color: var(--secondary-foreground);
        width: 7vw;
        height: 4vh;

        padding: 0.1vh 0.05vw;
        font-size: 13px;
        border: 1.5px solid var(--border);
        border-radius: var(--radius);
        &:hover {
          color: var(--primary-foreground);
          background-color: var(--primary);
        }
      }
      margin-bottom: 20px;
    }
  }
}

.header-btn {
  color: var(--primary-foreground);
  border: none;
  box-shadow: none;
}
.top-title {
  text-align: center;
  height: 3vh;
  border: 0.15vw solid #e0f1f6;
  border-radius: 1vw;
  margin: 0 10px;
  text-align: center;
  color: var(--secondary-foreground);
  font-size: 12px;
  display: flex;
  align-items: center;
  span {
    display: inline-block;
    margin: 0 8px;
  }
}

.dropdown_menu_content {
  background-color: white;
}

@media screen and (max-width: 1400px) {
  .content {
    span {
      font-size: 12px !important;
    }
    font-size: 12px !important;
  }
}
@media screen and (max-width: 1260px) {
  .content {
    span {
      font-size: 10px !important;
    }
  }
  .content {
    height: 520px;
    ul {
      button {
        height: max-content;
      }
    }
    #sidebar {
      a {
        display: block;
      }
      .sidebar-link {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 20px;
        &-item {
          padding: 0.8vh 1vw;
          font-size: 12px;
          border: 0.1vw solid #e8ebec;
        }
      }
    }
    #sidebar-container {
      width: 20vw;

      overflow: hidden;
    }
  }
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
  .content {
    span {
      font-size: 8px !important;
    }
    svg {
      font-size: 8px !important;
      width: 0.8rem;
    }
  }
}
</style>
