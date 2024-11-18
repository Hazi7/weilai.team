<script setup lang="ts" name="TopNav">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { useRoute } from "vue-router";
const route = useRoute();
const thirdNavItems = route.meta.thirdNavItems as ThirdItemInterface[];
console.log(thirdNavItems);

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
          <RouterLink :to="item.path" active-class="active" class="top-link">
            {{ item.title }}
          </RouterLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  </div>
</template>

<style lang="scss" scoped>
$font: #8c9296;
.topNav {
  position: fixed;
  z-index: 100;
  margin: 0px 10px;
  box-sizing: border-box;
  width: 100%;
  background-color: #fafafa;
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
    width: 100%;
    height: 100%;
    color: var(--secondary-foreground);
  }
  .top-title {
    width: 100px;
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
    width: 80px;
    display: inline-block;
    margin-left: 10px;
  }

  .top-label {
    width: 80%;
    height: 50px;
    display: flex;
  }
  .top-link {
    line-height: 50px;
  }
  .top-label {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    .icon {
      font-size: 1.2rem;
      margin-right: 8px;
    }
  }
}
.active {
  border-bottom: 2px solid var(--primary-foreground);
}
</style>
