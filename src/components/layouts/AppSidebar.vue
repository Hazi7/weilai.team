<script setup lang="ts">
import Sidebar from "@/components/ui/sidebar/Sidebar.vue";
import SidebarContent from "@/components/ui/sidebar/SidebarContent.vue";
import SidebarGroup from "@/components/ui/sidebar/SidebarGroup.vue";
import SidebarGroupContent from "@/components/ui/sidebar/SidebarGroupContent.vue";
import SidebarMenu from "@/components/ui/sidebar/SidebarMenu.vue";
import SidebarMenuButton from "@/components/ui/sidebar/SidebarMenuButton.vue";
import SidebarMenuItem from "@/components/ui/sidebar/SidebarMenuItem.vue";
import { RouterLink, useRoute } from "vue-router";
import SidebarFooter from "../ui/sidebar/SidebarFooter.vue";
import SidebarHeader from "../ui/sidebar/SidebarHeader.vue";

const route = useRoute();
const subNavItems = route.meta.subNavItems as SubItemInterface[] | undefined;
console.log(route);

console.log(subNavItems);

const items = [
  {
    title: "首页",
    url: "",
  },
  {
    title: "社区",
    url: "community/comprehensive",
  },
  {
    title: "控制台",
    url: "admin/profile",
  },
];

interface SubItemInterface {
  title: string;
  icon: string;
  path: string;
}
</script>

<template>
  <Sidebar class="sidebar">
    <SidebarHeader>未来软件工作室</SidebarHeader>
    <SidebarContent>
      <!-- 一级导航 -->
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem
              v-for="item in items"
              :key="item.url"
              class="sidebar__item"
            >
              <SidebarMenuButton class="sidebar__button">
                <RouterLink
                  :to="`/${item.url}`"
                  active-class="sidebar__link--active"
                  class="sidebar__link"
                >
                  <span>{{ item.title }}</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <!-- 二级导航 -->
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem
              v-for="(item, index) in subNavItems"
              :key="index"
              class="sidebar__item"
            >
              <SidebarMenuButton class="sidebar__button">
                <RouterLink
                  :to="item.path"
                  active-class="sidebar__sub-link--active"
                  class="sidebar__sub-link"
                >
                  <span>{{ item.title }}</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter></SidebarFooter>
  </Sidebar>
</template>

<style lang="scss" scoped>
.sidebar {
  &__button {
    padding: 0;
    height: 100%;
  }

  &__link,
  &__sub-link {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0.65rem 1rem;
    border-radius: 2rem;
  }

  &__link {
    &:hover {
      color: var(--primary-foreground);
      background-color: var(--primary);
    }

    &--active {
      color: var(--primary-foreground);
      background-color: var(--primary);
    }
  }

  &__sub-link {
    &:hover {
      color: var(--secondary-foreground);
      background-color: var(--secondary);
    }

    &--active {
      color: var(--secondary-foreground);
      background-color: var(--secondary);
    }
  }
}
</style>
