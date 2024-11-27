<template>
  <div class="news-footer">
    <div class="news-view">
      <Icon icon="iconamoon:eye-light" class="news-footer-icon" /><span
        class=""
        >{{ viewCount }}</span
      >
    </div>
    <div class="news-like">
      <Icon icon="iconamoon:like-light" class="news-footer-icon" />{{
        likeCount == 0 ? "点赞" : likeCount
      }}
    </div>
    <div class="news-comment">
      <Icon
        icon="fontisto:comment"
        class="news-footer-icon"
        style="font-size: 13px"
      />
      {{ commentCount == 0 ? "评论" : commentCount }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
defineProps({
  viewCount: {
    type: Number,
    default: 0,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  commentCount: {
    type: Number,
    default: 0,
  },
});
</script>

<style scoped lang="scss">
.news-footer {
  display: flex;
  align-items: center;
  padding: 5px 55px;
  & > div {
    color: var(--secondary-foreground);
    display: flex;
    align-items: center;
    font-size: 13px;
    margin-right: 10px;
  }
  &-icon {
    color: var(--secondary-foreground);
    font-size: 17px;
    margin-right: 5px;
  }
  .already {
    color: red;
  }
}
</style>
