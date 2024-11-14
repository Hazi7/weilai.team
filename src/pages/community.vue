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
        "icon": "mdi-home",
        "path": "/community/comprehensive"
      },
      {
        "title": "交流",
        "icon": "mdi-home",
        "path": "/community/discussion"
      },
      {
        "title": "头脑风暴",
        "icon": "mdi-home",
        "path": "/community/brainstorm"
      },
      {
        "title": "博客",
        "icon": "mdi-home",
        "path": "/community/blog"
      }
    ]
  }
}
</route>
