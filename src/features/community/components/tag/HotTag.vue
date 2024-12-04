<script setup lang="ts">
import 'iconify-icon';
import CommunityTag from '@/features/community/composables/CommunityTag';
import { reactive } from 'vue';

const { hotTagList, getHotTagList } = CommunityTag()
const props = defineProps({
    type: {
        type: Number,
        default: null
    },
    tagType: {
        type: String,
        default: "comprehensive"
    }
})
getHotTagList(props.type)
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
            <span class="tag" v-for="(tag, index) in hotTagList" :key="index">#{{ tag }}</span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.rightBarTag {
    border: 2px solid #ffffff;
    max-height: 168px;
    overflow: hidden;
    box-shadow: 0 4px 30px 0 rgba(232, 232, 237, .3);

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
        padding: 10px;
        // max-height: 155px;
        // overflow: hidden;

        .tag {
            color: #747272;
            font-size: 12px;
            padding: 0px 20px;
            margin: 8px 5px;
            // border: 1px solid #88a6dd;
            background-color: #e7f3f9;
            border-radius: 25px;
        }

        .tag:nth-child(n) {
            background-color: #e7f3f9;
        }

        .tag:nth-child(2n) {
            background-color: #f7e7f9;
        }

        .tag:nth-child(3n) {
            background-color: #e7f9e7;
        }

        .tag:nth-child(4n) {
            background-color: #f8f9e7;
        }

        .tag:nth-child(5n) {
            background-color: #e8e7f9;
        }

        .tag:nth-child(6n) {
            background-color: #f7e3dc;
        }
    }
}
</style>