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
        "title": "概况",
        "icon": "mdi-home",
        "path": "/admin/profile"
      },
      {
        "title": "通讯录",
        "icon": "mdi-home",
        "path": "/admin/contacts"
      },
      {
        "title": "社区管理",
        "icon": "mdi-home",
        "path": "/admin/community"
      },
      {
        "title": "招新管理",
        "icon": "mdi-home",
        "path": "/admin/recruitment"
      },
      {
        "title": "考勤管理",
        "icon": "mdi-home",
        "path": "/admin/attendance"
      },
      {
        "title": "权限管理",
        "icon": "mdi-home",
        "path": "/admin/limits"
      }
    ]
  }
}
</route>
