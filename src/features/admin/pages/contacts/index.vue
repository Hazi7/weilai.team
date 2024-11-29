<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Command, CommandInput } from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { Icon } from "@iconify/vue";
import {
  Bot,
  ChevronRight,
  MoreHorizontal,
  SquareTerminal,
} from "lucide-vue-next";
import { ref } from "vue";
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
const isVisible = ref(false);
interface Item {
  name: string;
  description: string;
}
const onInputFocus = () => {
  isVisible.value = true;
};

const onInputBlur = () => {
  isVisible.value = false;
};

const items: Item[] = [
  { name: "Item 1", description: "This is item 1" },
  { name: "Item 1", description: "This is item 1" },
];
</script>

<template>
  <div class="content" style="display: flex">
    <div id="sidebar-container">
      <SidebarProvider class="relative" id="sidebar-provider">
        <Sidebar
          collapsible="icon"
          class="absolute"
          id="sidebar"
          style="padding: 0.9vw; width: 20vw"
        >
          <div id="search">
            <Command class="h-full">
              <CommandInput
                placeholder="请输入关键词"
                id="search_input"
                class="p-0 h-full border-none outline-none"
                ref="inputRef"
                @keydown.enter="
                  () => {
                    console.log('enter');
                  }
                "
                @focus="onInputFocus"
                @blur="onInputBlur"
              />
              <!-- 
              <CommandList
                class="search_list"
                v-show="items.length && isVisible"
              >
                <CommandEmpty>未找到搜索结果</CommandEmpty>
                <CommandGroup heading="" class="p-0">
                  <CommandItem
                    :value="item.description"
                    v-for="item in items"
                    class="search_item"
                  >
                    <span>{{ item.name }}</span>
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
              </CommandList> -->
            </Command>
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
    <main class="flex-1 items-start gap-4 md:gap-8 main">
      <Tabs default-value="all">
        <div
          class="flex items-center"
          style="margin: 5px 0px; height: 5vh; width: 100%"
        >
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
                            class="h-[3vh]"
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

  // .command_box {
  //   background-color: white;

  //   position: relative;
  //   overflow: visible;
  //   width: 250px;
  //   float: right;
  //   height: 45px;
  //   border-radius: 25px;
  // }
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
