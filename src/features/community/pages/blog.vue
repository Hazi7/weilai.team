<script setup lang="ts">
import TheTopNav from "@/components/layouts/AppThirdNav.vue";
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
        "path": "/community/blog/label",
        "icon": "i-mdi-file-document-multiple-outline"
    }
    ]
  }
}
</route>
