<script setup lang="ts">
import TheSidebar from "@/components/layouts/AppSidebar.vue";
import SidebarProvider from "@/components/ui/sidebar/SidebarProvider.vue";
import SidebarTrigger from "@/components/ui/sidebar/SidebarTrigger.vue";
</script>

<template>
  <div class="default-layout">
    <SidebarProvider class="w-auto">
      <TheSidebar style="background-color: white">
        <main>
          <SidebarTrigger></SidebarTrigger>
        </main>
      </TheSidebar>
    </SidebarProvider>
    <div class="container">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.default-layout {
  display: flex;
  background-color: #fafafa;
}
@media screen and (max-width: 768px) {
  .container {
    padding: 0 0.5rem;
  }
}
</style>
