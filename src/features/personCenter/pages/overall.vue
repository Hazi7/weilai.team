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
    "title": "资料",
    "thirdNavItems": [
      {
        "title": "资料",
        "path": "/person/overall",
        "icon": "i-mdi-file-document-multiple-outline"
      }
    ]
  }
}
</route>
