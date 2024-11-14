<script setup lang="ts">
import TheTopNav from "@/components/layouts/AppThirdNav.vue";
</script>

<template>
  <TheTopNav></TheTopNav>
  <RouterView></RouterView>
</template>

<route lang="json">
{
  "meta": {
    "title": "文章管理",
    "thirdNavItems": [
      {
        "title": "文章管理",
        "path": "/admin/recruitment",
        "icon": "i-mdi-file-document-multiple-outline"
      },
      {
        "title": "测试",
        "path": "/admin/recruitment/test",
        "icon": "i-mdi-file-document-multiple-outline"
      }
    ]
  }
}
</route>
