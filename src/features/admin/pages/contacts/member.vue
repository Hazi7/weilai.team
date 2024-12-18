<script setup lang="ts">
import { Button } from "@/components/ui/button";
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
import router from "@/router";
import type { TeamInfo, TeamUserList } from "@/types/Contacts";
import { Icon } from "@iconify/vue";
import { ChevronRight } from "lucide-vue-next";
import { ref } from "vue";
import Search from "../../components/contacts/Search.vue";
import { getMembers } from "../../composables/useContacts";
import Member from "./member/[member].vue";

const userCount = ref(0);
const teamUserList = ref<TeamUserList[]>([]);
const teamAble = ref<TeamInfo[]>([]);
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
getMembers().then((res) => {
  userCount.value = res.userCount;
  teamAble.value = res.teamAble;
  teamUserList.value = res.teamUserList;
});

const items: Item[] = [
  { name: "Item 1", description: "This is item 1" },
  { name: "Item 1", description: "This is item 1" },
];

function getMembersOfGroup(str: string) {
  let parts = str.split("$");
  const chineseNums = {
    1: "一",
    2: "二",
    3: "三",
    4: "四",
    5: "五",
    6: "六",
    7: "七",
    8: "八",
    9: "九",
  };
  return {
    title: `${chineseNums[parts[0] as unknown as keyof typeof chineseNums]}组（${parts[1]}人）`,
    group: parts[0],
    count: parts[1],
    info: `${parts[0]},${parts[1]}`,
  };
}
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
          <Search />
          <!-- <div id="search">
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
              />

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
              </CommandList>
            </Command>
          </div> -->
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
                  <span>小组全体成员</span><span>({{ userCount }})</span>
                </SidebarMenuButton>
                <Collapsible
                  v-for="item in teamAble"
                  as-child
                  class="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger as-child>
                      <SidebarMenuButton :tooltip="item.grade">
                        <Icon
                          icon="material-symbols-light:account-tree-outline-rounded"
                        />
                        <span>{{ item.grade }}未来软件工作室</span>
                        <ChevronRight
                          class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                        />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem v-for="subItem in item.group">
                          <SidebarMenuSubButton as-child>
                            <a
                              class="group-item"
                              @click.prevent="
                                router.push(
                                  `/admin/contacts/member/${item.grade + ',' + getMembersOfGroup(subItem).info} `,
                                )
                              "
                            >
                              <span>{{
                                getMembersOfGroup(subItem).title
                              }}</span>
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
    <Member :teamAble="teamAble" :teamUserList="teamUserList"></Member>
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
.group-item {
  &:hover {
    cursor: pointer;
  }
}
.table-actions {
  height: 5vh;
}
.content {
  width: 100%;

  top: 0;
  margin-bottom: 50px;

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
