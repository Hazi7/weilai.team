<script setup lang="ts">
import { Pagination } from "@/components/recruitment";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useRequest } from "@/composables/useRequest";

import type { ArticleList } from "@/types/Community";
import { checkType, getArticle } from "@community/composables/search";
import { Icon } from "@iconify/vue";
import { ref, computed, watch } from "vue";
const { executeRequest, error, loading, data } = useRequest();

let pages = 0;
let currentPage = 1;
let total = ref<number>();
let pageSize = ref(10);

let authorityList = ['admin_plus', 'team_admin', 'community_admin', 'recruit_admin', 'notice_admin']
function handlePageChange(newPage: number) {
  currentPage = newPage;
  getUserList()
}

let searchTypes = ref([]);
let userList = ref([]);
let content = ref("");

async function getUserList() {
  await executeRequest({ url: `/userManager/permission/searchUser?pageNumber=${currentPage}&pageSize=${pageSize.value}&authorities=${searchTypes.value}&content=${content.value}` })

  console.log(data.value);

  if (data.value.code == 200) {
    userList.value = data.value.data.userList
    total.value = data.value.data.pageInfo.total
    currentPage = data.value.data.pageInfo.current
  }
  console.log('用户：', userList.value);
  if (error.value) {
    console.log('错误', error.value);
  }
}
getUserList()
function authorityTransformer(authority: string) {
  if (authority == 'team_admin') {
    return '用户管理员'
  } else if (authority == 'community_admin') {
    return '社区管理员'
  } else if (authority == 'recruit_admin') {
    return '招新管理员'
  } else if (authority == 'admin_plus') {
    return '权限管理员'
  } else {
    return '公告管理员'
  }
}

const changeAuthorityList = ref([]);

const isAllSelected = ref(false);
const handleItemSelect = (authority: string) => {

  const index = changeAuthorityList.value.indexOf(authority);

  if (index === -1) {
    // 如果没有选中，则添加权限
    changeAuthorityList.value.push(authority);
  } else {
    // 如果已经选中，则移除权限
    changeAuthorityList.value.splice(index, 1);
  }
  if (changeAuthorityList.value.length == authorityList.length) {
    isAllSelected.value = true
  } else {
    isAllSelected.value = false
  }

};
const handleSelectAll = () => {
  if (isAllSelected.value) {
    changeAuthorityList.value = authorityList
  } else {
    changeAuthorityList.value = []
  }
};
async function submitChangeForm(id: number) {

  console.log('提交', changeAuthorityList.value);
  console.log('用户名', id);
  const dataToSend = {
    userId: id,
    authority: changeAuthorityList.value
  }
  await executeRequest({ url: `/userManager/permission/resetUserAuthorities`, method: 'put', requestData: dataToSend })
  document.getElementById('dialogClose').click()
  getUserList()
};

const isTypeAllSelected = ref(false)

function handleTypeSelectAll() {

  if (isTypeAllSelected.value) {
    searchTypes.value = [...authorityList]

  } else {
    searchTypes.value = []
  }
  getUserList()
}
function handleTypeSelect(item) {
  const index = searchTypes.value.indexOf(item);

  if (index === -1) {
    // 如果没有选中，则添加权限
    searchTypes.value.push(item);
  } else {
    // 如果已经选中，则移除权限
    searchTypes.value.splice(index, 1);
  }
  if (searchTypes.value.length == authorityList.length) {
    isTypeAllSelected.value = true
  } else {
    isTypeAllSelected.value = false
  }

  getUserList()
}
function reset() {
  isTypeAllSelected.value = false
  searchTypes.value = []
  content.value = ''
  getUserList()
}
</script>

<template>
  <div class="content" style="display: flex; flex-wrap: wrap">
    <main class="grid flex-1 items-start gap-4 p-0 sm:px-6 sm:py-0 md:gap-8">
      <Tabs default-value="all">
        <TabsContent value="all" class="tc">
          <Card class="border-none shadow-none">
            <CardHeader class="card_header p-0 ">
              <div class="header-link">
                <div class="select-type">
                  <span>筛选：</span>
                  <div class="ml-2 mr-2 flex ">
                    <input type="checkbox" v-model="isTypeAllSelected" @change="handleTypeSelectAll">
                    &nbsp;全选
                  </div>
                  <div class="ml-2 mr-2 flex " v-for="item in authorityList" :key="item">
                    <input type="checkbox" :checked="searchTypes.includes(item)" @change="handleTypeSelect(item)">
                    &nbsp;{{ authorityTransformer(item) }}
                  </div>
                </div>
                <div class="flex items-center">
                  <div class="header-search">
                    <span>姓名
                    </span>
                    <div class="search_input_box">
                      <input placeholder="请输入姓名" class="search_input" v-model="content"
                        @keydown.enter="getUserList()" />
                    </div>
                  </div>
                  <button class="search-btn" @click="getUserList()">搜索</button>
                  <div class="reset cursor-pointer">
                    <Icon icon="grommet-icons:power-reset" @click="reset()" />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent class="card_content p-0">
              <Table id="tb">
                <TableHeader>
                  <TableRow>
                    <TableHead class="hidden md:table-cell" id="th">学号</TableHead>
                    <TableHead class="hidden md:table-cell">姓名</TableHead>
                    <TableHead class="hidden md:table-cell">性别</TableHead>
                    <TableHead class="hidden md:table-cell">权限</TableHead>
                    <TableHead class="hidden md:table-cell">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow v-for="item in userList" :key="item.username" class="">
                    <TableCell class="font-medium table_title">
                      {{ item.username }}
                    </TableCell>
                    <TableCell class="table_writer">
                      {{ item.name }}
                    </TableCell>
                    <TableCell class="font-medium table_type">
                      {{ item.sex }}
                    </TableCell>
                    <TableCell class="hidden md:table-cell">
                      <Badge v-for="authority in item.authority" :key="authority" variant="outline">{{
                        authorityTransformer(authority) }}
                      </Badge>
                      <Badge v-if="item.authority.length == 0" variant="outline">暂无权限</Badge>
                    </TableCell>

                    <TableCell>
                      <Dialog>
                        <DialogTrigger as-child class="mb-4">
                          <Button variant="outline" class="bg-blue-100 text-blue-600 m-auto"
                            @click="changeAuthorityList = [...item.authority]">
                            修改权限
                          </Button>
                        </DialogTrigger>
                        <DialogContent class="sm:max-w-[425px] bg-white max-h-[500px] overflow-y-auto">
                          <DialogClose id="dialogClose"></DialogClose>

                          <DialogHeader>
                            <DialogTitle>修改权限</DialogTitle>
                            <DialogDescription>
                              在这里修改权限，完成之后点击保存即可
                            </DialogDescription>
                          </DialogHeader>
                          <div class="grid gap-4 py-4">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>
                                    <input type="checkbox" v-model="isAllSelected" @change="handleSelectAll" />
                                  </TableHead>
                                  <TableHead>权限</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow v-for="authority in authorityList" :key="authority">
                                  <TableCell class="font-medium">
                                    <input type="checkbox" :checked="changeAuthorityList.includes(authority)"
                                      @change="handleItemSelect(authority)" />
                                  </TableCell>
                                  <TableCell>
                                    {{ authorityTransformer(authority) }}
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                          <DialogFooter>
                            <Button type="submit" @click="submitChangeForm(item.id)">
                              保存
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter class="justify-end p-0">
              <div class="pageBox pagination-container">
                <Pagination :totalItems="total" :pageSize="pageSize" @update:page="handlePageChange">
                </Pagination>
                <span class="postsNum">共 {{ total }} 个用户</span>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  </div>
</template>

<style lang="scss" scoped>
$font: #8c9296;

tr {
  text-align: center;
  font-size: 14.5px;
  height: 50px ;
  box-sizing: border-box;

  &:nth-child(even) {
    background-color: #f8f8fa;
  }
}

#tb {
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
}

th {
  text-align: center;
  color: var(--secondary-foreground);
}

td {
  padding: 0;
  height: 50px;
}

.group-leader {
  background-color: var(--secondary);
}

.card {
  &_header {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
  }

  &_content {
    min-height: 600px;
  }
}

.content {
  height: max-content;
  margin-bottom: 50px;
  background-color: white;

  #sidebar {
    color: var(--secondary-foreground);
    width: 20rem;

    .sidebar-link {
      display: flex;
      justify-content: space-around;
      align-items: center;

      &-item {
        display: flex;
        align-items: center;
        padding: 5px 20px;
        font-size: 14px;
        color: var(--secondary-foreground);
        margin: 0 5px;
        border-radius: var(--radius);
        border: 1.5px solid #e8ebec;
      }
    }
  }

  #sidebar-container {
    width: 20rem;
    overflow: hidden;
  }
}

.sidebar-menu {
  color: var(--secondary-foreground);
}

.header-link {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 5px;
  width: 100%;

  .select-type {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    select {
      font-size: 0.9vw;
    }
  }

  .select {

    &-type,
    &-time {
      margin-right: 5px;

      // button {
      //   padding: 0.5vw 0.8vw;
      //   height: 6vh;
      //   font-size: 0.9vw;
      // }
      span {
        width: max-content;
        padding: 0.2vw;
        margin-right: 5px;
      }

      display: flex;
      font-size: 14px;
      color: var(--secondary-foreground);
      align-items: center;
    }

    &-time {
      &-btn {
        width: 15vw;
      }
    }

    &-type {
      button {
        outline: none;
      }
    }
  }
}

.header-operation {
  width: 100%;

  .operation {
    display: flex;
    align-items: center;

    .operation-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
      text-align: center;
      color: var(--secondary-foreground);
      width: 110px;
      margin: 0 5px;
      padding: 5px;
      font-size: 13px;
      border: 1.5px solid var(--border);
      border-radius: var(--radius);

      &:hover {
        color: var(--primary-foreground);
        background-color: var(--primary);
      }
    }
  }
}

.header-btn {
  color: var(--primary-foreground);
  border: none;
  box-shadow: none;
}

.header-search {
  display: flex;
  align-items: center;

  span {
    font-size: 0.9vw;
    width: max-content;
    color: var(--secondary-foreground);
    margin-right: 5px;
  }

  .search_input_box {
    float: right;
    position: relative;

    &_input_box {
      position: relative;
    }

    input {
      text-decoration: none;
      list-style: none;
      outline-style: none;
      width: 180px;
      height: 40px;
      font-size: 0.9vw;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 5px 10px;
      padding-left: 10px;
    }

    .search-icon {
      position: absolute;
      top: 50%;
      left: 2%;
      transform: translateY(-50%);
    }

    &_list {
      border-radius: var(--radius);
      background-color: white;
      box-shadow:
        0px 2px 5px rgba(0, 0, 0, 0.1),
        inset 0px 0.2px 0.5px rgba(0, 0, 0, 0.24);
    }

    &_item {
      padding: 5px 6px;
      font-size: 15px;
      color: var(--secondary-foreground);

      a {
        width: 100%;
      }

      &:hover {
        background-color: #f8f8fa;
      }
    }
  }
}

.search-btn {
  margin: 0 10px;
  width: max-content;
  height: max-content;
  padding: 1vh 1.5vw;
  font-size: 0.9vw;
  border-radius: 8px;
  background-color: var(--primary);
  color: var(--primary-foreground);
}

.reset {
  color: var(--secondary-foreground);
  font-size: 0.9vw;
}

.top-title {
  text-align: center;
  height: 30px;
  border: 2px solid #e0f1f6;
  border-radius: 15px;
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

.table {
  &_title {
    max-width: 250px;
  }

  &_writer {
    max-width: 150px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

.tooltip {
  &_trigger {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 150px;
  }
}

.pageBox {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;

  .postsNum {
    margin-right: 20px;
    line-height: 40px;
  }
}

@media (max-width: 768px) {
  .content {
    margin-top: 70px;
    padding: 0px;
  }
}
</style>
