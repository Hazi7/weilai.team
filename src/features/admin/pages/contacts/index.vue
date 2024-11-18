<script setup lang="ts">
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Bot, ChevronRight, SquareTerminal } from "lucide-vue-next";

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
  DropdownMenuLabel,
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
import { MoreHorizontal } from "lucide-vue-next";

import { Icon } from "@iconify/vue";
const navMain = [
  {
    title: "2024未来软件工作室",
    url: "#",
    icon: SquareTerminal,
    // isActive: true,
    items: [
      {
        title: "一组",
        url: "#",
      },
      {
        title: "二组",
        url: "#",
      },
      {
        title: "三组",
        url: "#",
      },
    ],
  },
  {
    title: "2023 未来软件工作室",
    url: "#",
    icon: Bot,
    items: [
      {
        title: "一组",
        url: "#",
      },
      {
        title: "二组",
        url: "#",
      },
      {
        title: "三组",
        url: "#",
      },
    ],
  },
];
</script>

<template>
  <div class="content" style="display: flex">
    <div id="sidebar-container">
      <SidebarProvider class="relative" style="width: 38rem">
        <Sidebar
          collapsible="icon"
          class="absolute"
          id="sidebar"
          style="padding: 15px; width: 20rem"
        >
          <div id="search">
            <div class="search">
              <span class="search-icon"
                ><Icon
                  icon="bitcoin-icons:search-filled"
                  color="#b9c2d0"
                  font-size="26px"
                />
              </span>
              <input type="text" placeholder="搜索" />
            </div>
          </div>
          <div class="sidebar-link">
            <RouterLink to="">
              <Button
                variant="outline"
                size="sm"
                class="gap-1 sidebar-link-item"
              >
                <Icon icon="lsicon:control-outline" />
                <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  组织管理
                </span>
              </Button>
            </RouterLink>

            <RouterLink to="">
              <Button
                variant="outline"
                size="sm"
                class="gap-1 sidebar-link-item"
              >
                <Icon icon="lsicon:control-outline" />
                <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  添加组织
                </span>
              </Button>
            </RouterLink>
          </div>
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu class="sidebar-menu">
                <SidebarMenuButton>
                  <Icon icon="fluent:people-28-regular" />
                  <span>小组全体成员</span><span>(61人)</span>
                </SidebarMenuButton>
                <Collapsible
                  v-for="item in navMain"
                  :key="item.title"
                  as-child
                  class="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger as-child>
                      <SidebarMenuButton :tooltip="item.title">
                        <Icon
                          icon="material-symbols-light:account-tree-outline-rounded"
                        />
                        <span>{{ item.title }}</span>
                        <ChevronRight
                          class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                        />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem
                          v-for="subItem in item.items"
                          :key="subItem.title"
                        >
                          <SidebarMenuSubButton as-child>
                            <a :href="subItem.url">
                              <span>{{ subItem.title }}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </div>
    <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs default-value="all">
        <div class="flex items-center" style="margin: 5px 0px">
          <TabsList>
            <div class="top-title">
              <span>2024未来软件工作室</span>
            </div>
          </TabsList>
          <div class="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button
                  variant="outline"
                  size="sm"
                  class="h-7 gap-1 header-btn"
                >
                  <Icon icon="proicons:person-2" />
                  <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    设置组长
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <!-- <DropdownMenuContent>
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem checked> Active </DropdownMenuItem>
                <DropdownMenuItem>Draft</DropdownMenuItem>
                <DropdownMenuItem> Archived </DropdownMenuItem>
              </DropdownMenuContent> -->
            </DropdownMenu>
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
          <Card>
            <CardHeader>
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
            <CardContent>
              <Table id="tb">
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
                <TableBody>
                  <TableRow class="group-leader">
                    <TableCell class="hidden sm:table-cell"
                      ><input type="checkbox" name="" id=""
                    /></TableCell>
                    <TableCell class="font-medium"> 爆米奇 </TableCell>
                    <TableCell> 一组 </TableCell>
                    <TableCell class="hidden md:table-cell"> 2023级 </TableCell>
                    <TableCell class="hidden md:table-cell">
                      计科235
                    </TableCell>
                    <TableCell class="hidden md:table-cell">
                      20231514530
                    </TableCell>
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
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell class="hidden sm:table-cell"
                      ><input type="checkbox" name="" id=""
                    /></TableCell>
                    <TableCell class="font-medium"> 爆米奇 </TableCell>
                    <TableCell>
                      <Badge variant="outline"> 一组</Badge>
                    </TableCell>
                    <TableCell class="hidden md:table-cell"> 2023级 </TableCell>
                    <TableCell class="hidden md:table-cell">
                      计科235
                    </TableCell>
                    <TableCell class="hidden md:table-cell">
                      20231514530
                    </TableCell>
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
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell class="hidden sm:table-cell"
                      ><input type="checkbox" name="" id=""
                    /></TableCell>
                    <TableCell class="font-medium"> 爆米奇 </TableCell>
                    <TableCell>
                      <Badge variant="outline"> Draft </Badge>
                    </TableCell>
                    <TableCell class="hidden md:table-cell">
                      $499.99
                    </TableCell>
                    <TableCell class="hidden md:table-cell"> 25 </TableCell>
                    <TableCell class="hidden md:table-cell">
                      2023-07-12 10:42 AM
                    </TableCell>
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
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
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
#search {
  height: 50px;
  margin-bottom: 10px;
  .search {
    position: relative;
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

.header-link {
  display: flex;
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
</style>
