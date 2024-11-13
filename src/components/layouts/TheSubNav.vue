<script setup lang="ts" name="SubNav">
import SidebarGroup from "@/components/ui/sidebar/SidebarGroup.vue";
import SidebarGroupContent from "@/components/ui/sidebar/SidebarGroupContent.vue";
import SidebarMenu from "@/components/ui/sidebar/SidebarMenu.vue";
import SidebarMenuButton from "@/components/ui/sidebar/SidebarMenuButton.vue";
import SidebarMenuItem from "@/components/ui/sidebar/SidebarMenuItem.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const subNavItems = route.meta.subNavItems as SubItemInterface[] | undefined;

interface SubItemInterface {
  title: string;
  icon: string;
  path: string;
}
</script>

<template>
  <SidebarGroupContent>
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            v-for="(item, index) in subNavItems"
            :key="index"
            class="btn"
          >
            <RouterLink
              :to="item.path"
              active-class="active"
              class="subnav-link"
            >
              <span>{{ item.title }}</span>
            </RouterLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  </SidebarGroupContent>
</template>

<style lang="scss" scoped>
.active {
  background-color: #f7f7f8;
}
.btn {
  height: 48px;
}
.subnav-link {
  line-height: 40px;
  display: block;
  width: 100%;
  height: 100%;
}
</style>
