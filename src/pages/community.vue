<script setup lang="ts">
import DefaultLayout from "@/layouts/DefaultLayout.vue";
</script>

<template>
  <DefaultLayout></DefaultLayout>
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
  "meta": {
    "subNavItems": [
      {
        "title": "综合",
        "icon": "material-symbols-light:overview-key-outline",
        "path": "/community/comprehensive",
        "redirect": "/community/comprehensive/hot"
      },
      {
        "title": "博客",
        "icon": "material-symbols:article-outline",
        "path": "/community/blog",
        "redirect": "/community/blog/hot"
      },
      {
        "title": "公告",
        "icon": "material-symbols:article-outline",
        "path": "/community/notice"
      },
      {
        "title": "交流",
        "icon": "weui:time-outlined",
        "path": "/community/discussion",
        "redirect": "/community/discussion/recommend"
      },
      {
        "title": "头脑风暴",
        "icon": "weui:time-outlined",
        "path": "/community/brainstorm"
      }
    ]
  }
}
</route>
