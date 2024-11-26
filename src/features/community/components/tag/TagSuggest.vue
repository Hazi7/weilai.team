<script setup lang="ts">
import { reactive } from 'vue';
import { Icon } from "@iconify/vue";

const suggestList = reactive([
    { name: 'vue' },
    { name: 'react' },
    { name: 'angular' }
])
</script>

<template>
    <div class="tag-suggest">
        <div class="tag-suggest-like">猜你喜欢</div>
        <div class="suggestTagList">
            <div class="tag-suggest-item" v-for="(item, index) in suggestList" :key="index">
                <Icon icon="icon-park-outline:tag" class="tag-suggest-item-icon" />
                <div class="tag-suggest-item-name">{{ item.name }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.tag-suggest {
    width: 100%;
    background-color: white;
    // border-radius: 5px;
    border: 1.5px solid #efefef;

    .tag-suggest-like {
        background-image: linear-gradient(#e7f5f9, #ffffff);
        padding: 10px 20px;
        font-size: 18px;
    }

    .suggestTagList {
        padding: 10px 20px;
        display: flex;
        flex-direction: column;

        .tag-suggest-item {
            display: flex;
            align-items: center;
            margin: 5px;

            .tag-suggest-item-icon {
                color: var(--primary-foreground);
            }

            .tag-suggest-item-name {
                margin-left: 10px;
                color: #767676;
            }
        }
    }
}
</style>