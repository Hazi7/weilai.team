<script setup lang="ts">
import TheTopNav from "@/components/layouts/AppThirdNav.vue";
import { useTagStore } from "@/store/tagTypeStore";
import { ref } from "vue";
interface TagData {
  type: number;
  tagType: string;
}
// const tagType = ref('blog')
const typeData = ref<TagData>({ type: 3, tagType: "discussion" });

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
    "title": "交流",
    "redirect": "/community/discussion/recommend",
    "thirdNavItems": [
      {
        "title": "推荐",
        "path": "/community/discussion/recommend",
        "icon": "i-mdi-file-document-multiple-outline"
      },
      {
        "title": "最新",
        "path": "/community/discussion/latest",
        "icon": "i-mdi-file-document-multiple-outline"
      },
      {
        "title": "标签",
        "path": "/community/discussion/label/suggest",
        "icon": "i-mdi-file-document-multiple-outline"
      },
      {
        "title": "用户",
        "path": "/community/discussion/user",
        "icon": "i-mdi-file-document-multiple-outline"
      }
    ]
  }
}
</route>
