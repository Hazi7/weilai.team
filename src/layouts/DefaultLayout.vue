<script setup lang="ts">
import TheSidebar from "@/components/layouts/TheSidebar.vue";
</script>

<template>
  <div class="admin-layout flex">
    <TheSidebar> </TheSidebar>
    <div class="container">
      <RouterView></RouterView>
    </div>
  </div>
</template>
