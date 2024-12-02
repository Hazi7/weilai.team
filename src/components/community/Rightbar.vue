<template>
  <div class="rightbar">
    <div class="details"><HotTag /><ArticleList /></div>
  </div>
</template>

<script setup lang="ts" name="Rightbar">
import ArticleList from "@/components/community/ArticleList.vue";
import HotTag from "@/features/community/components/tag/HotTag.vue";
</script>

<style scoped lang="scss">
.rightbar {
  width: 500px;
  position: relative;
}
.details {
  width: 350px;
  position: fixed;
  margin-left: 0px;
  display: flex;
  flex-direction: column;
  gap: 50px; /* 设置上下间距为10px */
}
@media screen and (max-width: 768px) {
  .rightbar {
    display: none;
  }
}
@media screen and (max-width: 1280px) {
  .content {
    padding: 0 50px;
  }
  .rightbar {
    display: none;
  }
}
</style>
