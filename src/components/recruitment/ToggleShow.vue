<script setup lang="ts">

import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
} from '@/components/ui/menubar';
import { Button } from '@/components/ui/button';

import { ref, defineProps } from 'vue';
type Item= {
    index: number;
    title: string;
    isActive: boolean;
}

const props = defineProps<{
    items: Item[];
}>()

// 切换组件的样式控制
function toggleActive(index: number) {
    props.items.forEach((item) => {
        item.isActive = item.index === index;
    });
}

</script>

<template>
    <Menubar class="border-b toggle-show p-3">
        <MenubarMenu class="toggle-item" style="padding: 5px 0px;">
                <MenubarTrigger
                v-for="item  in items"
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

<style lang="scss" scoped>
@use '@/assets/styles';

$undertone: #647499;

.toggle-show {
    // width: 400px;
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