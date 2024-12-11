<script setup lang="ts">
import TheTopNav from "@/components/layouts/AppThirdNav.vue";
import { ref } from "vue";
import { useTagStore } from "@/store/tagTypeStore";
interface TagData {
  type: number;
  tagType: string;
}
// const tagType = ref('blog')
const typeData = ref<TagData>({ type: 1, tagType: "blog" });

const addTagType = useTagStore();
addTagType.addTag(typeData.value);
</script>

<template>
  <TheTopNav></TheTopNav>
  <RouterView></RouterView>
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
  "meta": {
    "title": "博客",
    "thirdNavItems": [
      {
        "title": "热门",
        "path": "/community/blog/hot",
        "icon": "i-mdi-file-document-multiple-outline"
      },
      {
        "title": "用户",
        "path": "/community/blog/user",
        "icon": "i-mdi-file-document-multiple-outline"
      },
      {
        "title": "标签",
        "path": "/community/blog/label/suggest",
        "icon": "i-mdi-file-document-multiple-outline"
      }
    ]
  }
}
</route>
