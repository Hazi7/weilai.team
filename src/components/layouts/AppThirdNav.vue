<script setup lang="ts" name="TopNav">
import {
  Breadcrumb,
  BreadcrumbItem,
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
  top: 0;
  z-index: 30;
  margin-right: 5px;
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

  .top {
    &-ol {
      width: 100%;
      height: 100%;
      font-size: 0.9vw;
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      color: var(--secondary-foreground);
    }
    &-title {
      box-sizing: content-box;
      width: 80%;
      height: 60%;
      border: 0.1vw solid #e0f1f6;
      border-radius: 15px;
      margin: 0 10px;
      padding: 0 0.7vw;
      text-align: center;
      color: $font;
      display: flex;
      align-items: center;
      span {
        display: inline-block;
        width: max-content;
        box-sizing: border-box;
        // line-height: 0.9vh;
        font-size: 0.9vw;
        text-align: center;
      }
    }
    &-item {
      text-align: center;
      // width: 80%;
      width: max-content;
      height: 100%;
      display: flex;
      align-items: center;
      margin-left: 10px;
    }
    &-label {
      width: 80%;
      height: 50px;
      display: flex;
    }
    &-link {
      // line-height: 50px;
      position: relative;
      width: max-content;
      height: 100%;
      display: flex;
      align-items: center;
    }
    &-label {
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
}
.active::after {
  content: "";
  display: block;
  width: 100%;
  height: 2px;
  bottom: 0;
  background-color: var(--primary-foreground);
  position: absolute;
}

@media screen and (max-width: 768px) {
  .topNav {
    padding-top: 8px;
    display: flex;
    box-sizing: border-box;
    background-image: linear-gradient(#dfe9f3, #ffffff00 100%);
    height: 70px;
    .top-title {
      display: none;
    }
    .top-item {
      font-size: 20px;
    }
  }
}
@media screen and (min-width: 900px) and (max-width: 1400px) {
  .topNav {
    display: flex;
    box-sizing: border-box;
    height: 35px;
    .top-link {
      font-size: 11px;
      // line-height: 50px;
      width: max-content;
      height: 100%;
      display: flex;

      align-items: center;
    }
  }
}
</style>
