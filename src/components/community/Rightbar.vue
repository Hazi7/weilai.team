<template>
  <div class="rightbar">
    <div class="details"><ArticleList /></div>
  </div>
</template>

<script setup lang="ts" name="Rightbar">
import ArticleList from "@/components/community/ArticleList.vue";
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
