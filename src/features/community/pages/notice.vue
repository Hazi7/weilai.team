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
    "title": "公告",
    "thirdNavItems": [
      {
        "title": "公告",
        "path": "/community/notice",
        "icon": "i-mdi-file-document-multiple-outline"
      }
    ]
  }
}
</route>
