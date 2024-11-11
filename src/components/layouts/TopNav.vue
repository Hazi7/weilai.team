<template>
    <div class="topNav">
        <Breadcrumb class="breadcrumb">
            <div class="top-title">
                <span>{{ route.meta.title }}</span>
            </div>
            <BreadcrumbList class="top-ol">
                <BreadcrumbItem
                    v-for="item in subItems[subName]"
                    class="top-item"
                >
                    <BreadcrumbLink
                        :href="`/${firNav}/${subName as string}/${item.url}`"
                        active-class="active"
                    >
                        {{ item.title }}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    </div>
</template>
<script setup lang="ts" name="TopNav">
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { useRoute } from "vue-router";
const route = useRoute();
let subName = route.meta.name as keyof (keyof typeof tops);

let firNav = route.meta.father as keyof typeof tops;
console.log(route);

const tops = {
    console: {
        招新管理: [
            {
                title: "概览",
                url: "",
            },
            {
                title: "候选人",
                url: "candidate",
            },
            {
                title: "面试",
                url: "interview",
            },
        ],
        社区管理: [
            {
                title: "帖子管理",
                url: "post",
            },
            {
                title: "社区",
                url: "#",
            },
            {
                title: "社区",
                url: "#",
            },
            {
                title: "社区",
                url: "#",
            },
        ],
        通讯录: [
            {
                title: "成员管理",
                url: "member",
            },
        ],
    },
    community: {
        comprehensive: [
            {
                title: "热门",
                url: "hot",
            },
            {
                title: "最新",
                url: "latest",
            },
            {
                title: "标签",
                url: "label",
            },
            {
                title: "用户",
                url: "user",
            },
        ],
    },
};
let subItems = tops[firNav] as any;
console.log(subItems[subName], 111);
</script>

<style lang="scss" scoped>
$font: #8c9296;
.topNav {
    margin: 10px 10px;
    box-sizing: border-box;
    width: 100%;
    border-bottom: 2px solid #eff1f1;
    display: flex;
    align-content: center;
    flex-wrap: nowrap;
    height: 50px;
    .breadcrumb {
        display: flex;
        align-items: center;
    }
    .top-ol {
        height: 100%;
    }
    .top-title {
        width: 80px;
        height: 30px;
        border: 2px solid #e0f1f6;
        border-radius: 15px;
        margin: 0 10px;
        text-align: center;
        color: $font;
    }
    .top-item {
        height: 100%;
        text-align: center;
        width: 60px;
        justify-content: center;
    }

    .top-label {
        width: 80%;
        height: 50px;
        display: flex;
    }
    .top-link {
        line-height: 50px;
    }
}
.active {
    border-bottom: 2px solid #e7f3f9;
}
</style>
