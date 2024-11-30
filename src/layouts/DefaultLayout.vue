<script setup lang="ts">
import TheSidebar from "@/components/layouts/AppSidebar.vue";
import SidebarProvider from "@/components/ui/sidebar/SidebarProvider.vue";
import SidebarTrigger from "@/components/ui/sidebar/SidebarTrigger.vue";
</script>

<template>
  <div class="default-layout">
    <SidebarProvider
      class="w-auto h-full max-md:w-auto 2xl:w-[17%] sidebar-provider"
    >
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
.container {
  padding-top: 8vh;
  padding-right: 0;
  padding-left: 0;
  overflow: hidden;
}

@media screen and (max-width: 768px) {
  .sidebar-provider {
    width: 0;
  }
  .container {
    padding: 0;
  }
}
@media screen and (min-width: 1800px) {
  .container {
    // width: 75% !important;
    max-width: 80% !important;
    // padding-right: 2vw;
    // padding-left: 2vw;
  }
}
</style>
