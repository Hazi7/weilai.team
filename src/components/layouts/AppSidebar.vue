<script setup lang="ts">
import Avatar from "@/components/avatar/UserAvatar.vue";
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
import SidebarProvider from "@/components/ui/sidebar/SidebarProvider.vue";

import UserLogin from "@/composables/useLoginAll";
import { useMessageStore } from '@/store/messageStore';
import { useUserStore } from '@/store/userStore';
import { Icon } from "@iconify/vue";
import {
  BadgeCheck,
  ChevronsUpDown,
  LogOut
} from "lucide-vue-next";
import { watch } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import Button from "../ui/button/Button.vue";
import SidebarFooter from "../ui/sidebar/SidebarFooter.vue";
import SidebarHeader from "../ui/sidebar/SidebarHeader.vue";
const messageStore = useMessageStore();


const {  logout } = UserLogin()
const route = useRoute();
const router = useRouter();
const subNavItems = route.meta.subNavItems as SubItemInterface[] | undefined;
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
const subNavs = [
  {
    title: "综合",
    icon: "material-symbols-light:overview-key-outline",
    path: "/community/comprehensive",
  },
  {
    title: "博客",
    icon: "material-symbols:article-outline",
    path: "/community/blog",
  },
  {
    title: "公告",
    icon: "material-symbols:article-outline",
    path: "/community/notice",
  },
  {
    title: "交流",
    icon: "weui:time-outlined",
    path: "/community/discussion",
  },
  {
    title: "头脑风暴",
    icon: "weui:time-outlined",
    path: "/community/brainstorm",
  },
];

const items = [
  {
    title: "首页",
    url: "",
    icon: "bitcoin-icons:home-outline",
    redirect: "",
  },
  {
    title: "社区",
    url: "community/",
    icon: "fluent:people-community-20-regular",
    redirect: "community/comprehensive/hot",
  },
  {
    title: "控制台",
    url: "admin/",
    icon: "lsicon:control-outline",
    redirect: "admin/profile",
  },
];

const handleMessageClick = () => {
  messageStore.setHasNewMessage(false)
}

interface SubItemInterface {
  title: string;
  icon: string;
  path: string;
  redirect?:string;
}
const userStore=useUserStore()

function skipToPersonalCenter(){
console.log("点击了");

  userStore.reset();
  router.push('/personalCenter/userInfo')
}
</script>

<template>
  <div class="frame">
    <div class="sidebar">
      <SidebarProvider id="sidebar-provider" class=" ">
        <Sidebar id="sidebar" class="sidebar bg-white bg-white w-[17vw]  ">
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
                    <SidebarMenuButton class="sidebar__button "  >
                      <RouterLink
                        :to="`/${item.url}`"

                        active-class="sidebar__link--active"
                        class="sidebar__link"
                        @click="router.push(`/${item.redirect}`)"

                      >
                        <Icon :icon="`${item.icon}`" />&nbsp;
                        <span >{{ item.title }}</span>
                      </RouterLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <!-- 二级导航 -->
            <SidebarGroup  id="sub-nav" v-show="subNavItems?.length" >
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
                        @click="router.push(item.redirect? item.redirect : item.path)"

                      >
                        <Icon :icon="`${item.icon}`" />&nbsp;
                        <span>{{ item.title }}</span>
                      </RouterLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem

                    class="sidebar__item"
                  >
                    <SidebarMenuButton class="sidebar__button">
                      <RouterLink

                        :to="`/personalCenter/userInfo/myPosts`"
                        active-class="sidebar__link--active"
                        class="sidebar__link mb-1 "
                        @click="skipToPersonalCenter"
                      >
                        <Icon icon="bi:person" />&nbsp;
                        <span>个人资料</span>
                      </RouterLink>
                    </SidebarMenuButton>
                    <SidebarMenuButton class="sidebar__button">
                      <RouterLink
                        :to="`/message/likeMes`"
                        active-class="sidebar__link--active"
                        class="sidebar__link"
                        @click="handleMessageClick"
                      >
                        <Icon icon="mage:box-3d-notification" />&nbsp;
                        <span>消息</span>
                        <span
                         v-if="messageStore.hasNewMessage"
                        class="dot"
                        ></span>
                      </RouterLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter id="sidebar-footer">
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <SidebarMenuButton class="publish-btn">
                    <RouterLink to="/post" class="flex items-center w-full h-full">
                      <Icon icon="prime:pencil" width="16px" />
                      <span class="ml-2">发布</span>
                    </RouterLink>
                  </SidebarMenuButton>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenu class="footer-user">
              <SidebarMenuItem>
                <DropdownMenu >
                  <DropdownMenuTrigger as-child>
                    <SidebarMenuButton
                      size="lg"
                      class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                      <!-- <img src="@/assets/img/headImg.jpg" alt="" class="avatar" /> -->
                       <div class="avatar"> <Avatar    /></div>

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
        

                    <DropdownMenuItem class="drop-menu-item" @click="logout()">
                      <LogOut />
                     退出
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
    <RouterLink to="/">
      <Button class="main-menu-button"
        ><Icon
          icon="bitcoin-icons:home-outline"
          class="main-menu-icon" /></Button
    ></RouterLink>

    <DropdownMenu>
      <DropdownMenuTrigger
        ><Button class="main-menu-button"
          ><Icon
            icon="fluent:people-community-20-regular"
            class="main-menu-icon" /></Button
      ></DropdownMenuTrigger>
      <DropdownMenuContent class="w-6 bg-white">
        <RouterLink
          :to="item.path"
          class="main-menu-sub-link"
          v-for="(item, index) in subNavs"
        >
          {{ item.title }}
        </RouterLink>
      </DropdownMenuContent>
    </DropdownMenu>
    <RouterLink to="/personalCenter/userInfo/myPosts"
      ><Button class="main-menu-button"
        ><Icon icon="bi:person" class="main-menu-icon" /></Button
    ></RouterLink>
    <RouterLink to=""
      ><Button class="main-menu-button main-menu-publish"
        ><Icon
          icon="prime:pencil"
          class="main-menu-icon icon-publish" /></Button
    ></RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.dot{
  position: absolute;
  top: 40%;
  right: 20px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ff0000;;
}
.main-menu {
  display: none;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.frame {
  color: var(--secondary-foreground);
  #sub-nav {

    border-top: 1px solid #e5e7eb;
    border-bottom: 1px solid #e5e7eb;
  }
  top: 0;
  background-color: #fafafa;
  display: flex;
  #sidebar {
    background-color: white;
  }
}


.drop-menu-item {
  background-color: white;
  width: 105%;
  &:hover {
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
    position: relative;
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

@media screen and (max-width: 768px) {
  .main-menu{
  padding: 8px 25px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  bottom: 0;
  height: 60px;
  box-sizing:border-box;
  background-color: white;
  &-button{
    width: 45px;
    height: 45px;
    display: flex;




    #main-menu_dropdown {
      width: max-content;
    }
    .icon-publish {
      color: white;
    }
  }
  &-button {
      width: 45px;
      height: 45px;
      display: flex;
      box-shadow: none;
      padding: 0 10px;
    }
    &-icon {
      font-size: 22px;
      width: 90%;
      height: 90%;
    }
    &-sub-link {
      width: 100%;
      display: inline-block;
      padding: 5px 5px;
      box-sizing: border-box;
      color: var(--secondary-foreground);
      text-align: center;
      &:hover {
        background-color: var(--secondary);
      }
    }

  &-publish {
      border-radius: 50%;
      padding: 12px;
      background: linear-gradient(#67a5e6, #c0d2e6, #eff1f4);
    }
  .frame {
    display: none;
    position: fixed;
    bottom: 0;
    height: 100px;
    overflow: hidden;
    #sidebar {
      position: fixed;
      top: 90%;
      bottom: 0;
      max-height: 100px;
      &-header {
        display: none;
      }
      #sub-nav {
        display: none;
      }
      &-content {
        max-height: 100px;
      }
    }
  }
}
}
@media screen and (min-width:900px) and (max-width: 2000px) {
  a{
  height: 5vh !important;
}

.main-menu{
  display: none;
}

.avatar {
  width: calc(20% - 2px);
  height: calc(100% - 2px);
  border-radius: 50%;
}
.frame {

color :var(--secondary-foreground);
  #sub-nav{
   border-top: 1px solid #e5e7eb;
   border-bottom: 1px solid #e5e7eb;
  }
  span{
    font-size:0.9vw  !important ;
  }



}


.drop-menu-item {
  background-color: white ;
  width: 105%;
  &:hover{
    background-color: var(--secondary);
  }
}
.publish-btn {
  height: 5vh;
  padding-left: 15px;
  border-radius: 20px;
  color: white;
  font-size: 0.9vw;
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
  width: 17vw;


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
    height: 8vh;
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

#sidebar{
  width: 17vh;
  &-provider{
    height: 100vh;
  }
  &-content{
    width: 17vw;
  }
  &-footer{
    .footer-user{
      height: 5.5vh;
      box-sizing: border-box;
      .truncate{
        font-size: 0.9vw;
      }
      li{
        box-sizing: border-box;
        height: 100%;
       button{
        box-sizing: border-box;
        height: 100%;
        padding: 0 0.5vw;
       }
      }
    }
  }
}
}
@media screen and (min-width:1700px) {

   a{
  height: 5vh !important;
}



.avatar {
  width: calc(20% - 2px);
  height: calc(100% - 2px);
  border-radius: 50%;
}
.frame {

  color :var(--secondary-foreground);
  #sub-nav{
   border-top: 1px solid #e5e7eb;
   border-bottom: 1px solid #e5e7eb;
  }
  span{
    font-size:0.9vw  !important ;
  }



}


.drop-menu-item {
  background-color: white ;
  width: 105%;
  &:hover{
    background-color: var(--secondary);
  }
}
.publish-btn {
  height: 5vh;
  padding-left: 15px;
  border-radius: 20px;
  color: white;
  font-size: 0.9vw;
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
    font-size: 60px;
  }
}
.sidebar {
  width: 17vw;


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
    svg{
      font-size: 1.5rem;
    }
  }
  &-logo {
    height: 8vh;
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

#sidebar{
  width: 17vh;
  &-provider{
    height: 100vh;
  }
  &-content{
    width: 17vw;
  }
  &-footer{
    .footer-user{
      height: 5.5vh;
      box-sizing: border-box;
      .truncate{
        font-size: 0.9vw;
      }
      li{
        box-sizing: border-box;
        height: 100%;
       button{
        box-sizing: border-box;
        height: 100%;
        padding: 0 0.5vw;
       }
      }
    }
  }
}
}

</style>
