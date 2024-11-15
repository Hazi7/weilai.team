<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Sidebar from "@/components/ui/sidebar/Sidebar.vue";
import SidebarContent from "@/components/ui/sidebar/SidebarContent.vue";
import SidebarGroup from "@/components/ui/sidebar/SidebarGroup.vue";
import SidebarGroupContent from "@/components/ui/sidebar/SidebarGroupContent.vue";
import SidebarMenu from "@/components/ui/sidebar/SidebarMenu.vue";
import SidebarMenuButton from "@/components/ui/sidebar/SidebarMenuButton.vue";
import SidebarMenuItem from "@/components/ui/sidebar/SidebarMenuItem.vue";
import { Icon } from "@iconify/vue";
import { watch } from "vue";
import { RouterLink, useRoute } from "vue-router";
import SidebarFooter from "../ui/sidebar/SidebarFooter.vue";
import SidebarHeader from "../ui/sidebar/SidebarHeader.vue";

const route = useRoute();
const subNavItems = route.meta.subNavItems as SubItemInterface[] | undefined;
console.log(route.meta);
watch(
  route,
  (newVal) => {
    console.log("meta改变了");

    console.log(newVal, "111");
  },
  {
    deep: true,
  },
);
console.log(subNavItems);

const items = [
  {
    title: "首页",
    url: "",
    icon: "bitcoin-icons:home-outline",
  },
  {
    title: "社区",
    url: "community/comprehensive",
    icon: "fluent:people-community-20-regular",
  },
  {
    title: "控制台",
    url: "admin/profile",
    icon: "lsicon:control-outline",
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
    <SidebarHeader
      ><div class="sidebar-logo">
        <img src="../../../public/logo.png" alt="" /></div
    ></SidebarHeader>
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
                  <Icon :icon="`${item.icon}`" />&nbsp;
                  <span>{{ item.title }}</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <hr />
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
                  <Icon :icon="`${item.icon}`" />&nbsp;
                  <span>{{ item.title }}</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <SidebarMenuButton class="publish-btn">
              <Icon icon="prime:pencil" width="16px" />
              发布
            </SidebarMenuButton>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton style="height: 60px">
                <img src="@/assets/img/headImg.jpg" alt="" class="avatar" />
                爆米奇
                <!-- <ChevronUp className="ml-auto" /> -->
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              className="w-[--radix-popper-anchor-width]"
              class="footer-menu"
            >
              <DropdownMenuItem class="footer-item">
                <RouterLink to="/personCenter/overall"
                  ><span> 个人资料</span></RouterLink
                >
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>消息</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>退出</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>

<style lang="scss" scoped>
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.publish-btn {
  height: 40px;
  padding-left: 15px;
  border-radius: 20px;
  color: white;
  font-size: 15px;
  background: linear-gradient(
    to right,
    #139bb8,
    #739fcd,
    #b2b3df,
    #e7dcf3,
    #fdfbfe00
  );
  svg {
    font-weight: bold;
    font-size: 16px;
  }
}
.sidebar {
  background-color: white;
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
  &-logo {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      height: 80%;
      object-fit: cover;
    }
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
