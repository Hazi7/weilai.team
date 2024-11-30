<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { reactive, ref } from "vue";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { computed } from "vue";
import CommunityTag from "../../composables/CommunityTag";

const { useTagList, getUseTagList } = CommunityTag()
const firstUseTagList = ref<{ tag_name: string; tag_usage_count: number }[]>([]);
getUseTagList()
    .then(() => {
        firstUseTagList.value = useTagList.value.slice(0, 10);
    })

</script>

<template>
    <div class="article-rank">
        <div class="rank-top">
            <p>
                <Icon icon="icon-park-outline:tag" class="tagHeadIcon" /> &nbsp;<span>标签榜
                </span>
            </p>
            <Icon icon="material-symbols-light:navigate-next"
                style="font-size: 25px; float: right; font-weight: bold" />
        </div>
        <hr />
        <ul>
            <li v-for="(item, index) in firstUseTagList" :key="index">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <router-link :to="`/community/discussion/label/${item.tag_name}`">
                                <span class="ranking">{{ index + 1 }}</span><span>{{ item.tag_name }}</span>
                            </router-link>
                            <a href="#"></a>
                        </TooltipTrigger>
                        <TooltipContent class="bg-white">
                            <router-link :to="`/community/discussion/label/${item.tag_name}`">
                                <span>{{ item.tag_name }}</span>
                            </router-link>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <div class="bar">
                    <Icon v-if="index < 3" icon="bxs:hot" class="hotIcon"></Icon>
                    <span class="rank-num">{{ item.tag_usage_count }}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
.article-rank {
    background-color: white;
    border-radius: var(--radius);
    border-radius: 4px;
    box-shadow: 0 4px 30px 0 rgba(232, 232, 237, .3);
}

.rank-top {
    height: 3rem;
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .tagHeadIcon {
        font-size: 20px;
    }

    p {
        display: flex;
        align-items: center;
        color: var(--secondary-foreground);
        height: 100%;
        font-size: 16px;
        line-height: 4rem;
    }
}

.ranking {
    font-weight: bold;
    font-size: 17px;
    font-family: sans-serif;
    background-image: linear-gradient(#e9afa6, #eee0d4, #eadccc);
    -webkit-background-clip: text;
    /* Safari 和 Chrome 需要此属性 */
    color: transparent;
    /* 确保文字是透明的 */
    margin-right: 5px;
    display: inline-block;
    width: 30px;
    text-align: center;
}

ul {
    padding: 10px 15px;
    width: 100%;

    li {
        font-size: 15px;
        color: var(--secondary-foreground);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &:hover {
            cursor: pointer;
        }

        a {
            display: inline-block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 220px;
        }
    }

    .bar {
        display: flex;
        align-items: center;

        .hotIcon {
            color: #f2731e;
            margin-right: 5px;
        }
    }
}

@media screen and (max-width: 1200px) {
    .rank-top {
        font-size: 14px;

        .tagHeadIcon {
            font-size: 18px;
        }

        p {
            height: 100%;
            font-size: 14px;
            line-height: 4rem;
        }
    }

        .ranking{
            font-size: 14px;
        }

    ul{
        li{
            font-size: 13px;
        }
    }
}

@media screen and (max-width: 1040px) {}
</style>