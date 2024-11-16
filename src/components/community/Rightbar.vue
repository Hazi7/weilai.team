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
  margin-top: 80px;
  width: 350px;
  position: fixed;
  margin-left: 0px;
}
@media screen and (max-width: 768px) {
  .rightbar {
    display: none;
  }
}
</style>
