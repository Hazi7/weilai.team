<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
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
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRequest } from "@/composables/useRequest";
import type { adminData, adminPost } from "@/types/Community";
import { Icon } from "@iconify/vue";
import { MoreHorizontal } from "lucide-vue-next";
import { ref } from "vue";
const { executeRequest, error, loading, data } = useRequest();

const postList = ref<adminPost[]>([]);
let title = "";
let name = "";
let page = "";
let pageSize: number = 10;
let startTime: string = "";
let type: number;

async function getArticleList() {
  await executeRequest({
    url: `/post/adminPostList`,
    method: "get",
  });
  let res = data.value as adminData;
  postList.value = res.data.records;
  console.log(postList.value);
}
//

getArticleList();
</script>

<template>
  <div class="content" style="display: flex">
    <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs default-value="all">
        <TabsContent value="all" class="tc">
          <Card class="border-none shadow-none">
            <CardHeader class="card_header">
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
              <div class="header-search">
                <div class="search_input_box">
                  <span class="search-icon"
                    ><Icon
                      icon="bitcoin-icons:search-filled"
                      color="#b9c2d0"
                      font-size="26px"
                    />
                  </span>
                  <input
                    placeholder="请输入关键词"
                    class="search_input"
                    ref="inputRef"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table id="tb">
                <TableHeader>
                  <TableRow>
                    <TableHead class="hidden w-[100px] md:table-cell text-left">
                      <input type="checkbox" name="" id="" />
                    </TableHead>
                    <TableHead class="hidden md:table-cell" id="th"
                      >文章标题</TableHead
                    >
                    <TableHead class="hidden md:table-cell"> 作者 </TableHead>
                    <TableHead class="hidden md:table-cell">发布时间</TableHead>
                    <TableHead class="hidden md:table-cell">
                      所属分类
                    </TableHead>
                    <!-- <TableHead class="hidden md:table-cell"> 状态 </TableHead> -->

                    <TableHead class="hidden md:table-cell"> 操作 </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow v-for="(item, index) in postList" :key="index">
                    <TableCell class="hidden sm:table-cell"
                      ><input type="checkbox" name="" id=""
                    /></TableCell>
                    <TableCell class="font-medium table_title">
                      {{ item.title }}
                    </TableCell>
                    <TableCell class="table_writer">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger class="tooltip_trigger">{{
                            item.name
                          }}</TooltipTrigger>
                          <TooltipContent class="bg-white">
                            <p>
                              {{ item.name }}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell class="hidden md:table-cell">
                      {{ item.postTime }}</TableCell
                    >
                    <TableCell class="hidden md:table-cell"> </TableCell>
                    <!-- <TableCell class="hidden md:table-cell"> 删除 </TableCell> -->
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger as-child>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal class="h-4 w-4" />
                            <span class="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent class="bg-white">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
  </div>
</template>

<style lang="scss" scoped>
$font: #8c9296;
tr {
  text-align: center;
  border-bottom: 1.5px solid var(--border);
  font-size: 14.5px;
}
#tb {
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
}
th {
  text-align: center;
  color: var(--secondary-foreground);
}
.group-leader {
  background-color: var(--secondary);
}
.card_header {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-between;
}
.content {
  height: 90vh;
  overflow: hidden;
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
  width: 40%;
  .head {
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

.header-btn {
  color: var(--primary-foreground);
  border: none;
  box-shadow: none;
}

.header-search {
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
      width: 250px;
      height: 40px;
      font-size: 14px;
      border: 1px solid #d0d9e4;
      border-radius: 25px;
      padding: 5px 10px;
      padding-left: 30px;
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
  width: 40%;
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
</style>
