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
        "title": "点赞/收藏",
        "path": "/message/likeMes",
        "icon": "i-mdi-file-document-multiple-outline"
      },
      {
        "title": "评论",
        "path": "/message/commentMes",
        "icon": "i-mdi-file-document-multiple-outline"
      },
      {
        "title": "系统通知",
        "path": "/message/systemMes",
        "icon": "i-mdi-file-document-multiple-outline"
      }
    ]
  }
}
</route>
