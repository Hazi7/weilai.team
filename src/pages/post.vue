<script setup lang="ts">
import AppEditor from "@post/components/AppEditor.vue";
</script>

<template>
  <AppEditor></AppEditor>
  <button class="post">发布</button>
</template>

<style lang="scss" scoped>
.post {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
}
</style>
