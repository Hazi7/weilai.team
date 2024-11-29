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
        "title": "全部",
        "path": "/message/all",
        "icon": "i-mdi-file-document-multiple-outline"
      },
      {
        "title": "点赞/收藏",
        "path": "/message/likeMes",
        "icon": "i-mdi-file-document-multiple-outline"
      },
      {
        "title": "评论",
        "path": "/message/commentMes",
        "icon": "i-mdi-file-document-multiple-outline"
      }
    ]
  }
}
</route>
