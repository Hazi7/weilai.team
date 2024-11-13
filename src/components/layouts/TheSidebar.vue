<script setup lang="ts">
import Sidebar from "@/components/ui/sidebar/Sidebar.vue";
import SidebarContent from "@/components/ui/sidebar/SidebarContent.vue";
import SidebarGroup from "@/components/ui/sidebar/SidebarGroup.vue";
import SidebarGroupContent from "@/components/ui/sidebar/SidebarGroupContent.vue";
import SidebarGroupLabel from "@/components/ui/sidebar/SidebarGroupLabel.vue";
import SidebarMenu from "@/components/ui/sidebar/SidebarMenu.vue";
import SidebarMenuButton from "@/components/ui/sidebar/SidebarMenuButton.vue";
import SidebarMenuItem from "@/components/ui/sidebar/SidebarMenuItem.vue";
import SidebarProvider from "@/components/ui/sidebar/SidebarProvider.vue";
import { RouterLink } from "vue-router";
import TheSubNav from "./TheSubNav.vue";
const items = [
  {
    title: "首页",
    url: "",
  },
  {
    title: "社区",
    url: "community",
  },
  {
    title: "控制台",
    url: "admin",
  },
  {
    title: "知识库",
    url: "knowledge",
  },
];
</script>

<template>
  <SidebarProvider>
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>未来软件工作室</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    v-for="item in items"
                    :key="item.url"
                    :class="'btn'"
                  >
                    <RouterLink
                      active-class="active"
                      :to="`/${item.url}`"
                      class="sidebar-link"
                    >
                      <span>{{ item.title }}</span>
                    </RouterLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
            <hr />
            <!-- 二级栏目 -->
            <TheSubNav></TheSubNav>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  </SidebarProvider>
</template>

<style lang="scss" scoped>
.sidebar-link {
  width: 100%;
  height: 100%;
  display: block;
  line-height: 40px;
  padding: 0 10px;
  text-decoration: none;
}
.btn {
  &:hover {
    background-color: #e7f3f9;
    color: #5db0da;
  }
  font-size: 14px;
  border-radius: 15px;
  height: 40px;
  color: #636b71;
  padding: 0;
  margin: 10px 0;
}
.active {
  background-color: #e7f3f9;
  color: #5db0da;
}
.container {
  display: flex;
  justify-content: center;
}
</style>
