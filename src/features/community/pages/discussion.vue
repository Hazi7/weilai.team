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
    "title": "交流",
    "thirdNavItems": [
      {
        "title": "交流",
        "path": "/community/discussion",
        "icon": "i-mdi-file-document-multiple-outline"
      }
    ]
  }
}
</route>
