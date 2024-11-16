<script setup lang="ts" name="TopNav">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { useRoute } from "vue-router";
import { Icon } from '@iconify/vue';
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
          <BreadcrumbLink :href="item.path" active-class="active">
            <div class="top-label">
              <Icon class="icon" :icon="item.icon" v-if="item.icon"/>   {{ item.title }}
            </div>

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
    width: 100%;
    height: 100%;
    position: relative;
    left: 10px;
    display: flex;
    align-items: left;
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
    position:relative ;
    .icon {
    font-size: 1.2rem;
    margin-right: 8px;
  }
  }

}
.active {
  border-bottom: 2px solid #e7f3f9;
}
</style>
