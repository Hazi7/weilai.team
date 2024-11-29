<script setup lang="ts">
import { reactive } from 'vue'
import { Icon } from "@iconify/vue";
import CommunityTag from '@/features/community/composables/CommunityTag';

const { allTagList, getAllTagList } = CommunityTag()

// const tagLists: TagLists[] = reactive([])
getAllTagList()
// const tagList = reactive(['推荐', '前端', '后端', 'java', 'python', 'go', 'c', 'C++', 'php', 'html', 'css', 'scss', 'js', 'ts', '人工智能', 'AIGC', '大数据', '数据库'])
</script>

<template>
    <div>
        <div class="tag-head-bar">
            <div class="tag-head-bar-item">
                <router-link active-class="active" :to="`/community/discussion/label/推荐`">推荐</router-link>
            </div>
            <div v-for="(item, index) in allTagList" :key="index" class="tag-head-bar-item">
                <router-link active-class="active" :to="`/community/discussion/label/${item}`">{{ item }}</router-link>
            </div>
            <span class="tag-head-bar-more">
                <Icon icon="bytesize:chevron-bottom"></Icon>
            </span>

            <span class="tag-head-bar-few">
                <Icon icon="bytesize:chevron-top"></Icon>
            </span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.active {
    color: var(--primary-foreground);
}

.tag-head-bar {
    max-width: 1336px;
    position: absolute;
    top: 70px;
    display: flex;
    flex-wrap: wrap;
    background-color: #ffffff;
    box-shadow: 0 4px 30px 0 rgba(232, 232, 237, .5);
    border-radius: 4px;
    padding: 10px;
    margin-right: 33px;
    max-height: 65px;
    overflow: hidden;
    z-index: 1;

    &:hover {
        transition: all .5s;
        max-height: 220px;
        -webkit-box-shadow: 0 4px 30px 0 rgba(223, 223, 229, 0.4);
        box-shadow: 0 4px 30px 0 rgba(223, 223, 229, 0.4);
        border-radius: 4px;
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