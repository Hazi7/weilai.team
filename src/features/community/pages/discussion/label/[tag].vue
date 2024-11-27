<script setup lang="ts">
import TagRightBar from '@/features/community/components/tag/TagRightBar.vue';
import TagSuggest from '@/features/community/components/tag/TagSuggest.vue';
import NewsContent from '@/features/community/components/NewsContent.vue';
import CommunityTag from '@/features/community/composables/CommunityTag';
import { ref, watch } from 'vue';
import { useRoute } from "vue-router";
const route = useRoute();

const { tagPostList, getPostList } = CommunityTag();
const tag = ref('');
function getTag() {
    if ("tag" in route.params) {
        tag.value = route.params.tag as string;
    } else {
        tag.value = "";
    }
    getPostList(tag.value);
}
getTag();

watch(
    route,
    (newVal) => {
        getTag()
    }
);
</script>

<template>
    <div class="tag-container">
        <!-- <div>标签</div> -->
        <!-- <tag-word-cloud></tag-word-cloud> -->
        <div class="all-article">
            <NewsContent :tagPostList="tagPostList" />
        </div>
        <div class="right-bar">
            <tag-suggest style="margin: 0 0 40px 0;"></tag-suggest>
            <!-- <HotTag style="width: 350px;"></HotTag> -->
            <tag-right-bar style=""></tag-right-bar>
        </div>
    </div>
</template>

<style scoped lang="scss">
.tag-container {
    margin-top: 100px;
    display: flex;

    .all-article {
        width: calc(100% - 350px);
    }

    .right-bar {
        width: 350px;
        margin-left: 20px;
    }
}
</style>