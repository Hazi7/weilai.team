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
    "title": "考勤管理",
    "thirdNavItems": [
      {
        "title": "考勤管理",
        "path": "/admin/attendance",
        "icon": "i-mdi-file-document-multiple-outline"
      }
    ]
  }
}
</route>
