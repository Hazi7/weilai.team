<template>
    <div>
        <SidebarGroupContent>
            <SidebarGroup>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            v-for="item in subItems"
                            :class="'btn'"
                        >
                            <RouterLink
                                :to="`/${route.meta.father}/${item.name}`"
                                active-class="active"
                                class="subnav-link"
                            >
                                <span>{{ item.title }}</span>
                            </RouterLink>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroup>
            <hr />
        </SidebarGroupContent>
    </div>
</template>

<script setup lang="ts" name="SubNav">
import SidebarGroup from "@/components/ui/sidebar/SidebarGroup.vue";
import SidebarGroupContent from "@/components/ui/sidebar/SidebarGroupContent.vue";
import SidebarMenu from "@/components/ui/sidebar/SidebarMenu.vue";
import SidebarMenuButton from "@/components/ui/sidebar/SidebarMenuButton.vue";
import SidebarMenuItem from "@/components/ui/sidebar/SidebarMenuItem.vue";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
// 打印query参数
console.log(route);

console.log(route.name);

type Items = {
    community: { title: string; name: string; url: string }[];
    home: { title: string; name: string; url: string }[];
    console: { title: string; name: string; url: string }[];
    knowledge: { title: string; name: string; url: string }[];
};
let items: Items = {
    community: [
        {
            title: "综合",
            name: "comprehensive",
            url: "comprehensive",
        },
        {
            title: "博客",
            name: "blog",
            url: "blog",
        },
        {
            title: "公告",
            name: "notice",
            url: "notice",
        },
        {
            title: "交流",
            name: "communication",
            url: "communication",
        },
    ],
    home: [{ title: "首页", name: "home", url: "#" }],
    console: [
        {
            title: "通讯录",
            name: "addressBook",
            url: "#",
        },
        {
            title: "社区管理",
            name: "communityManage",
            url: "#",
        },
        {
            title: "招新管理",
            name: "recruitManage",
            url: "#",
        },
        {
            title: "考勤管理",
            name: "attendanceManage",
            url: "#",
        },
    ],
    knowledge: [
        {
            title: "知识库",
            url: "#",
            name: "knowledge",
        },
    ],
};
const fatherName = route.meta.father as keyof Items;
// console.log(items.community);

// items.subName = subName;
const subItems = items[fatherName];

// console.log(items[items.subName]);
</script>

<style lang="scss" scoped>
.active {
    background-color: #f7f7f8;
}
.btn {
    padding: 0;
    height: 40px;
    border-radius: 15px;
}
.subnav-link {
    line-height: 40px;
    padding: 0 5px;
    display: block;
    width: 100%;
    height: 100%;
}
</style>
