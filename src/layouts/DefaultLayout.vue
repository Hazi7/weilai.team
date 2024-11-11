<template>
    <div class="frame">
        <div class="rightbar">
            <!-- :style="{ '--sidebar-width': '20rem', '--sidebar-width-mobile': '20rem' }" -->
            <SidebarProvider>
                <Sidebar>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel>Application</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarGroup>
                                    <SidebarMenu>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton
                                                v-for="item in items"
                                                :class="'btn'"
                                                :key="item.url"
                                            >
                                                <RouterLink
                                                    active-class="active"
                                                    :to="`/${item.url}`"
                                                    class="sidebar-link"
                                                >
                                                    <span>{{
                                                        item.title
                                                    }}</span>
                                                </RouterLink>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </SidebarMenu>
                                </SidebarGroup>
                                <hr />
                                <keep-alive include="SubNav">
                                    <RouterView
                                        :key="$route.path"
                                        name="default"
                                    ></RouterView>
                                </keep-alive>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>
            </SidebarProvider>
        </div>
        <div class="container">
            <!-- <div class="topNav">
          <div class="title">
            <p>#{{ title }}</p>
          </div>
          <div class="top-label">
            <div v-for="item in tops" class="top-item">
              <router-link class="top-link" to=""
                ><p>{{ item.title }}</p></router-link
              >
            </div>
          </div>
        </div> -->
            <!-- <RouterView to="">
          <span>{{}}</span>
        </RouterView> -->
            <keep-alive include="TopNav">
                <RouterView name="top" :key="$route.path"></RouterView>
            </keep-alive>
            <RouterView name="content" :key="$route.path"></RouterView>
        </div>
    </div>
</template>
<script setup lang="ts" name="Layouts">
// import TopNav from "@/components/community/Topnav.vue";
import Sidebar from "@/components/ui/sidebar/Sidebar.vue";
import SidebarContent from "@/components/ui/sidebar/SidebarContent.vue";
import SidebarGroup from "@/components/ui/sidebar/SidebarGroup.vue";
import SidebarGroupContent from "@/components/ui/sidebar/SidebarGroupContent.vue";
import SidebarGroupLabel from "@/components/ui/sidebar/SidebarGroupLabel.vue";
import SidebarMenu from "@/components/ui/sidebar/SidebarMenu.vue";
import SidebarMenuButton from "@/components/ui/sidebar/SidebarMenuButton.vue";
import SidebarMenuItem from "@/components/ui/sidebar/SidebarMenuItem.vue";
import SidebarProvider from "@/components/ui/sidebar/SidebarProvider.vue";
import { defineProps } from "vue";
import { RouterLink, RouterView } from "vue-router";
defineProps(["title"]);
// const tops = reactive([
//   {
//     title: "热门",
//     url: "",
//   },
//   {
//     title: "最新",
//     url: "",
//   },
//   {
//     title: "标签",
//     url: "",
//   },
//   {
//     title: "用户",
//     url: "",
//   },
// ]);
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
        url: "console",
    },
    {
        title: "知识库",
        url: "knowledge",
    },
];
</script>

<style lang="scss" scoped>
.frame {
    background-color: #fafafa;
    display: flex;
}
.rightbar {
    width: 16rem;
    background-color: white;
}
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
