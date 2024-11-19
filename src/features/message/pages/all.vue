<script setup lang="ts">
import TheTopNav from "../../../components/layouts/AppThirdNav.vue";
</script>

<template>
  <TheTopNav></TheTopNav>
  <RouterView></RouterView>
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
  "meta": {
    "title": "消息",
    "thirdNavItems": [
      {
        "title": "消息",
        "path": "/message/all",
        "icon": "i-mdi-file-document-multiple-outline"
      }
    ]
  }
}
</route>
