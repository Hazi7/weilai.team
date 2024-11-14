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
        "title": "社区管理",
        "icon": "mdi-home",
        "path": "/admin/community"
      },
      {
        "title": "招新管理",
        "icon": "mdi-home",
        "path": "/admin/recruitment"
      }
    ]
  }
}
</route>
