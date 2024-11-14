<template>
    <!-- 招新顶部导航栏 -->
    <Menubar class="border-b">
        <MenubarMenu>
                <MenubarTrigger><Button>待我反馈</Button></MenubarTrigger>
                <MenubarTrigger><Button>我录取的</Button></MenubarTrigger>
                <MenubarTrigger><Button>我淘汰的</Button></MenubarTrigger>
        </MenubarMenu>
    </Menubar>
</template>
<script setup lang="ts">
// import { Icon } from '@iconify/vue';
import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
} from '@/components/ui/menubar'
// import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button';
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