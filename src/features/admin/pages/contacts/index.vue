<script setup lang="ts">
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

import { Icon } from "@iconify/vue";
const navMain = [
  {
    title: "2024未来软件工作室",
    url: "#",
    icon: SquareTerminal,
    isActive: true,
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
  <SidebarProvider class="relative">
    <Sidebar collapsible="icon" class="absolute">
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <Collapsible
              v-for="item in navMain"
              :key="item.title"
              as-child
              :default-open="item.isActive"
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
</template>

<style lang="scss" scoped>
.sidebar {
  position: relative !important;
}
</style>
