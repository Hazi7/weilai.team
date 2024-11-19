<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Sidebar from "@/components/ui/sidebar/Sidebar.vue";
import SidebarContent from "@/components/ui/sidebar/SidebarContent.vue";
import SidebarGroup from "@/components/ui/sidebar/SidebarGroup.vue";
import SidebarGroupContent from "@/components/ui/sidebar/SidebarGroupContent.vue";
import SidebarMenu from "@/components/ui/sidebar/SidebarMenu.vue";
import SidebarMenuButton from "@/components/ui/sidebar/SidebarMenuButton.vue";
import SidebarMenuItem from "@/components/ui/sidebar/SidebarMenuItem.vue";
import SidebarProvider from "@/components/ui/sidebar/SidebarProvider.vue";
import { Icon } from "@iconify/vue";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
} from "lucide-vue-next";
import { watch } from "vue";
import { RouterLink, useRoute } from "vue-router";
import Button from "../ui/button/Button.vue";
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
    url: "community/",
    icon: "fluent:people-community-20-regular",
  },
  {
    title: "控制台",
    url: "admin/",
    icon: "lsicon:control-outline",
  },
];

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",

      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",

      plan: "Startup",
    },
    {
      name: "Evil Corp.",

      plan: "Free",
    },
  ],
};
interface SubItemInterface {
  title: string;
  icon: string;
  path: string;
}
</script>

<template>
  
  <div class="frame">
    <div class="sidebar">
      <SidebarProvider id="sidebar-provider">
        <Sidebar id="sidebar" class="sidebar">
    <SidebarHeader id="sidebar-header"
      ><div class="sidebar-logo">
        <img src="../../../public/logo.png" alt="" /></div
    ></SidebarHeader>
    <SidebarContent id="sidebar-content">
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
      <SidebarGroup  id="sub-nav">
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
      <hr />
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem
          
              class="sidebar__item"
            >
              <SidebarMenuButton class="sidebar__button">
                <RouterLink
                  :to="`/personalCenter/userInfo`"
                  active-class="sidebar__link--active"
                  class="sidebar__link"
                >
                  <Icon icon="bi:person" />&nbsp;
                  <span>个人资料</span>
                </RouterLink>
              </SidebarMenuButton>
              <SidebarMenuButton class="sidebar__button">
                <RouterLink
                  :to="`/message`"
                  active-class="sidebar__link--active"
                  class="sidebar__link"
                >
                  <Icon icon="mage:box-3d-notification" />&nbsp;
                  <span>消息</span>
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
          <DropdownMenu >
            <DropdownMenuTrigger as-child>
              <SidebarMenuButton
                size="lg"
                class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <img src="@/assets/img/headImg.jpg" alt="" class="avatar" />
                <div class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate">爆米奇</span>
                </div>
                <ChevronsUpDown class="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg p-0"
              side="bottom"
              :side-offset="4"
            ><router-link to="/personalCenter/userInfo">
              <DropdownMenuItem class="drop-menu-item">
                <BadgeCheck />
               个人资料
              </DropdownMenuItem class="drop-menu-item">
            </router-link> 
              <DropdownMenuItem class="drop-menu-item">
                <CreditCard />
                Billing
              </DropdownMenuItem class="drop-menu-item">
      
              <DropdownMenuItem class="drop-menu-item">
                <Bell />
                Notifications
              </DropdownMenuItem>

              <DropdownMenuItem class="drop-menu-item">
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
      </SidebarProvider>
    </div>
    
  </div>
  <div class="main-menu">
    <Button>  <RouterLink to="">  <Icon icon="prime:pencil" width="16px" /></RouterLink></Button>
    <Button>  <RouterLink to="">  <Icon icon="prime:pencil" width="16px" /></RouterLink></Button>
    <Button>  <RouterLink to="">  <Icon icon="prime:pencil" width="16px" /></RouterLink></Button>
    <Button>  <RouterLink to="">  <Icon icon="prime:pencil" width="16px" /></RouterLink></Button>
  
    
  </div>
</template>

<style lang="scss" scoped>
.main-menu{
  display: none;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.frame {
color :var(--secondary-foreground);
  // #sub-nav{
  //   padding: 0;
  // }
  top: 0;
  background-color: #fafafa;
  display: flex;
  #sidebar {
    background-color: white;
  }
}
.sidebar {
  background-color: white;
}

.drop-menu-item {
  background-color: white ;
  width: 105%;
  &:hover{
    background-color: var(--secondary);
  }
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
.main-menu{
  
}

@media screen and (max-width: 768px) {
  .main-menu{
  display: flex;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  bottom: 0;
  height: 50px;
  background-color: white
}
  .frame{
    display: none;
    position: fixed;
    bottom: 0;
    height: 100px;
    overflow: hidden;
    #sidebar{
      position: fixed;
      top: 90%;
      bottom: 0;
     max-height:100px;
      &-header{
        display: none;
      }
      #sub-nav{
        display: none;
      }
      &-content{
        max-height: 100px;
      }
    }
    
  }
}
</style>
