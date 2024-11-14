<script setup lang="ts" name="TopNav">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { useRoute } from "vue-router";

const route = useRoute();
const thirdNavItems = route.meta.thirdNavItems as ThirdItemInterface[];

interface ThirdItemInterface {
  title: string;
  icon: string;
  path: string;
}
</script>

<template>
  <div class="topNav">
    <Breadcrumb class="breadcrumb">
      <div class="top-title">
        <span>{{ route.meta.title }}</span>
      </div>
      <BreadcrumbList class="top-ol">
        <BreadcrumbItem
          v-for="(item, index) in thirdNavItems"
          :key="index"
          class="top-item"
        >
          <BreadcrumbLink :href="item.path" active-class="active">
            {{ item.title }}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  </div>
</template>

<style lang="scss" scoped>
$font: #8c9296;
.topNav {
  margin: 10px 10px;
  box-sizing: border-box;
  width: 100%;
  border-bottom: 2px solid #eff1f1;
  display: flex;
  align-content: center;
  flex-wrap: nowrap;
  height: 50px;
  .breadcrumb {
    display: flex;
    align-items: center;
  }
  .top-ol {
    height: 100%;
  }
  .top-title {
    width: 80px;
    height: 30px;
    border: 2px solid #e0f1f6;
    border-radius: 15px;
    margin: 0 10px;
    text-align: center;
    color: $font;
  }
  .top-item {
    height: 100%;
    text-align: center;
    width: 60px;
    justify-content: center;
  }

  .top-label {
    width: 80%;
    height: 50px;
    display: flex;
  }
  .top-link {
    line-height: 50px;
  }
}
.active {
  border-bottom: 2px solid #e7f3f9;
}
</style>
