<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Icon } from "@iconify/vue";

</script>

<template>
    <p>标签</p>
</template>

<style scoped lang="scss">
.tag-head-bar {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    background-color: #ffffff;
    box-shadow: 0 4px 30px 0 rgba(232, 232, 237, .5);
    border-radius: 4px;
    padding: 10px;
    max-height: 65px;
    overflow: hidden;

    &:hover {
        transition: all .5s;
        max-height: 220px;
    }

    .tag-head-bar-item {
        font-size: 16px;
        margin: 10px 20px;
        color: #676767;
    }

    .tag-head-bar-more,
    .tag-head-bar-few {
        position: absolute;
        right: 50%;
        bottom: 0;
        display: block;
        width: 30px;
        height: 15px;
        background-color: #f4f4f4;
        border-radius: 5px 5px 0 0;
        text-align: center;
        padding: 0 8px;
        font-size: 14px;
        color: #8a8a8a;
    }

    .tag-head-bar-more {
        opacity: 1;
    }

    .tag-head-bar-few {
        opacity: 0;
    }

    &:hover .tag-head-bar-more {
        opacity: 0;
    }

    &:hover .tag-head-bar-few {
        opacity: 1;
    }
}
</style>