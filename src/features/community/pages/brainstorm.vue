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
    "title": "头脑风暴",
    "thirdNavItems": [
      {
        "title": "头脑风暴",
        "path": "/community/brainstorm",
        "icon": "i-mdi-file-document-multiple-outline"
      }
    ]
  }
}
</route>
