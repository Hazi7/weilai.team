<template>
    <!-- 招新顶部导航栏 -->
    <Menubar class="border-b">
        <MenubarMenu>
                <MenubarTrigger><Badge class="badge">招新管理</Badge></MenubarTrigger>
                <MenubarTrigger><Icon icon="bitcoin-icons:home-outline" id="top-nav-icon"/>首页</MenubarTrigger>
                <MenubarTrigger><Icon icon="la:user-tie" id="top-nav-icon"/>  候选人</MenubarTrigger>
                <MenubarTrigger><Icon icon="heroicons:calendar-date-range" id="top-nav-icon"/> 面试</MenubarTrigger>
        </MenubarMenu>
    </Menubar>
</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue';
import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
} from '@/components/ui/menubar'
import { Badge } from '@/components/ui/badge'

</script>
<style lang="scss">
    .badge{
    background-color:none;
    padding: 8px;
    border:solid 1px #CAEAF3;
    margin-bottom: 5px;
    }
    #top-nav-icon{
        font-size: 1.2rem;
        margin-right: 8px;
    }
</style>