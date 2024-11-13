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
        "path": "/"
      },
      {
        "title": "交流",
        "icon": "mdi-home",
        "path": "/"
      },
      {
        "title": "头脑风暴",
        "icon": "mdi-home",
        "path": "/admin/community"
      },
      {
        "title": "博客",
        "icon": "mdi-home",
        "path": "/admin/recruitment"
      }
    ]
  }
}
</route>
