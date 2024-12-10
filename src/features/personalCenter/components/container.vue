<template>
  <div class="default-layout__container">
    <myHeader></myHeader>
    <navBox></navBox>
    <router-view></router-view>
  </div>
</template>

<script setup>
import myHeader from "./myHeader.vue";
import navBox from "./navBox.vue";
</script>

<style lang="scss" scoped>
.default-layout__container {
  width: 100%;
  padding: 0px 100px 10px 100px;
}
/* 使用媒体查询为手机端修改padding */
@media (max-width: 768px) {
  .default-layout__container {
    padding: 80px 0 60px 0;
  }
}
</style>
