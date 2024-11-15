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
    "title": "综合",
    "thirdNavItems": [
      {
        "title": "热门",
        "path": "/community/comprehensive",
        "icon": "i-mdi-file-document-multiple-outline"
      },
      {
        "title": "用户",
        "path": "/community/comprehensive/user",
        "icon": "i-mdi-file-document-multiple-outline"
      }
    ]
  }
}
</route>
