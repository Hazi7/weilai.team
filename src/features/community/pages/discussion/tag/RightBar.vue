<script setup lang="ts">
import 'iconify-icon';

const tagList = ['java', 'python', 'c++', 'c', 'javascript', 'php', 'ruby',]
</script>

<template>
    <div class="rightBarTag">
        <div class="rightTagHead">
            <div class="tagHeadTitle">
                <iconify-icon icon="tabler:tag" class="tagIcon"></iconify-icon>
                <span>热门标签</span>
            </div>
            <iconify-icon icon="icon-park-outline:right" class="moreTag"></iconify-icon>
        </div>
        <div class="hotTagList">
            <span class="tag" v-for="(tag, index) in tagList" :key="index">#{{ tag }}</span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.rightBarTag {
    margin-top: 100px;
    border: 1px solid #999;

    .rightTagHead {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        border-bottom: 1.5px solid #e6e6e6;

        .tagHeadTitle {
            display: flex;
            align-items: center;
            color: #6d6d6d;

            .tagIcon {
                color: #4f4e4e;
                font-size: 20px;
                margin-right: 10px;
            }
        }

        .moreTag {
            color: #4f4e4e;
            font-size: 22px;
        }
    }

    .hotTagList {
        display: flex;
        flex-wrap: wrap;
        padding: 20px 10px;

        .tag {
            color: #747272;
            font-size: 12px;
            padding: 0px 20px;
            margin: 5px 5px;
            // border: 1px solid #88a6dd;
            background-color: #e7f3f9;
            border-radius: 25px;
        }
    }
}
</style>