<script setup lang="ts">
import tagWordCloud from '@/features/community/components/tag/TagWordCloud.vue';
import TagRightBar from '@/features/community/components/tag/TagRightBar.vue';
import TagSuggest from '@/features/community/components/tag/TagSuggest.vue';
</script>

<template>
    <div class="tag-container">
        <!-- <div>标签</div> -->
        <!-- <tag-word-cloud></tag-word-cloud> -->
        <div class="all-article">
            文章列表
        </div>
        <div class="right-bar">
            <tag-suggest style="margin: 0 0 40px 0;"></tag-suggest>
            <tag-right-bar style="width: 350px;"></tag-right-bar>
        </div>
    </div>
</template>

<style scoped lang="scss">
.tag-container{
    margin-top: 100px;
    display: flex;

    .all-article{
        width: calc(100% - 350px);
    }
}
</style>