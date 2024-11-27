<script setup lang="ts">

import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
} from '@/components/ui/menubar';
import { Button } from '@/components/ui/button';

import {  defineProps } from 'vue';
type Item= {
    index: number;
    title: string;
    isActive: boolean;
}

const props = defineProps<{
    toggleItems: Item[];
}>()

// 切换组件的样式控制
function toggleActive(index: number) {
    props.toggleItems.forEach((item) => {
        item.isActive = item.index === index;
    });
}

</script>

<template>
    <Menubar class="toggle-show border-b p-3 ">
        <MenubarMenu>
                <MenubarTrigger
                v-for="item  in toggleItems"
                :key="item.index"
                >
                <Button
                :class="item.isActive? 'active' : 'not-active' "
                @click="toggleActive(item.index)"
                >
                {{ item.title }}</Button>
            </MenubarTrigger>
        </MenubarMenu>
    </Menubar>
</template>


<style lang="scss"  scoped>
@use '@/assets/styles';
//TODO: 设置外层内边距 外层设置的行内弹性盒子
$undertone: #647499;

.toggle-show {
    height: 80%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: var(--primary);
}
.active {
    background-color: white;
    color: var(--white);
}
.not-active {
    background-color: var(--white);
    color: $undertone;
    border: none;
}
</style>