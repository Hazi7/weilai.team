<script setup lang="ts">
import { reactive } from 'vue';
import { Icon } from "@iconify/vue";
import CommunityTag from '../../composables/CommunityTag';

const { likeTagList, getRecommendTag } = CommunityTag();
getRecommendTag()
</script>

<template>
    <!-- <div class="tag-suggest">
        <div class="tag-suggest-like">猜你喜欢</div>
        <div class="suggestTagList">
            <div class="tag-suggest-item" v-for="(item, index) in likeTagList" :key="index">
                <Icon icon="icon-park-outline:tag" class="tag-suggest-item-icon" />
                <div class="tag-suggest-item-name">{{ item }}</div>
            </div>
        </div>
    </div> -->
    <div class="rightBarTag">
        <div class="rightTagHead">
            <div class="tagHeadTitle">
                <Icon icon="tabler:tag" class="tagIcon"></Icon>
                <span>猜你喜欢</span>
            </div>
        </div>
        <div v-if="!likeTagList" class="noMoreTag">
            暂无相关推荐
        </div>
        <div class="hotTagList" v-if="likeTagList">
            <span class="tag" v-for="(tag, index) in likeTagList" :key="index">
                <router-link :to="`/community/discussion/label/${tag}`">#{{ tag }}</router-link>
            </span>
        </div>
    </div>
</template>

<style scoped lang="scss">
// .tag-suggest {
//     width: 100%;
//     background-color: white;
//     // border-radius: 5px;
//     border: 1.5px solid #efefef;

//     .tag-suggest-like {
//         background-image: linear-gradient(#cde9f1, #ffffff);
//         padding: 10px 20px;
//         font-size: 18px;
//     }

//     .suggestTagList {
//         padding: 10px 20px;
//         display: flex;
//         flex-direction: row;
//         flex-wrap: wrap;
//         // flex-direction: column;

//         .tag-suggest-item {
//             display: flex;
//             align-items: center;
//             margin: 5px 15px;

//             .tag-suggest-item-icon {
//                 color: var(--primary-foreground);
//             }

//             .tag-suggest-item-name {
//                 margin-left: 10px;
//                 color: #767676;
//             }
//         }
//     }
// }

.rightBarTag {
    border: 2px solid #ffffff;
    max-height: 168px;
    overflow: hidden;
    background-color: white;

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

    .noMoreTag {
        padding: 20px;
        color: #5a5a5a;
        text-align: center;
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

@media screen and (max-width: 1200px) {
    .rightBarTag {
        .rightTagHead {
            font-size: 12px;

            .tagHeadTitle {
                .tagIcon {
                    font-size: 14px;
                }
            }
        }

        .hotTagList {
            .tag {
                font-size: 11px;
            }
        }
    }
}

@media screen and (max-width: 1040px) {}
</style>