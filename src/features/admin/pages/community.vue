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
    "title": "社区管理",
    "thirdNavItems": [
      {
        "title": "文章管理",
        "path": "/admin/community",
        "icon": "i-mdi-file-document-multiple-outline"
      },
      {
        "title": "测试",
        "path": "/admin/community/test",
        "icon": "i-mdi-file-document-multiple-outline"
      }
    ]
  }
}
</route>
