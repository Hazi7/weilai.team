<template>
  <div class="address">
    <div class="sidebar">
      <SidebarProvider class="provider">
        <SidebarContent class="content">
          <SidebarMenu>
            <Collapsible defaultOpen className="group/collapsible">
              <SidebarMenuItem>
                <!-- 一级 -->
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>2023未来软件工作室</SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <!-- 二级内容 -->
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <a href="#">222</a>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                  <!--  -->
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
          <!-- 一级菜单 -->
          <SidebarMenu>
            <Collapsible defaultOpen class="group/collapsible">
              <SidebarMenuItem>
                <!-- 一级按钮 -->
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    >2024未来软件工作室
                    <ChevronRight
                      class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <!-- 二级内容 -->
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <a href="#"></a>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <a href="#">222</a>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                  <!--  -->
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarContent>
      </SidebarProvider>
    </div>
  </div>
</template>

<script setup lang="ts" name="Address">
import Collapsible from "@/components/ui/collapsible/Collapsible.vue";
import CollapsibleContent from "@/components/ui/collapsible/CollapsibleContent.vue";
import CollapsibleTrigger from "@/components/ui/collapsible/CollapsibleTrigger.vue";
import SidebarContent from "@/components/ui/sidebar/SidebarContent.vue";
import SidebarMenu from "@/components/ui/sidebar/SidebarMenu.vue";
import SidebarMenuButton from "@/components/ui/sidebar/SidebarMenuButton.vue";
import SidebarMenuItem from "@/components/ui/sidebar/SidebarMenuItem.vue";
import SidebarMenuSub from "@/components/ui/sidebar/SidebarMenuSub.vue";
import SidebarMenuSubItem from "@/components/ui/sidebar/SidebarMenuSubItem.vue";
import SidebarProvider from "@/components/ui/sidebar/SidebarProvider.vue";
import { ChevronRight } from "lucide-vue-next";
</script>

<style scoped lang="scss">
.address {
  width: 100%;
  height: 80vh;
  background-color: white;
}
.sidebar {
  height: 80vh;
  overflow: hidden;
}
</style>
