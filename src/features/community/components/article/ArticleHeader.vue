<script setup lang="ts">
import Avatar from "@/components/ui/avatar/Avatar.vue";
import AvatarImage from "@/components/ui/avatar/AvatarImage.vue";
import { Skeleton } from "@/components/ui/skeleton";
import NewsFooter from "../NewsFooter.vue";
import { Icon } from "@iconify/vue/dist/iconify.js";
import TagItem from "../tag/TagItem.vue";

defineProps<{
  isLoading: boolean;
  avatar: string | undefined;
  postTime: string | undefined;
  author: string | undefined;
  viewCount: number | undefined;
  likeCount: number | undefined;
  commentCount: number | undefined;
  title: string | undefined;
  tags: string[] | undefined;
}>();
</script>

<template>
  <div class="article-header">
    <div v-if="isLoading" class="flex items-center space-x-4">
      <Skeleton class="h-12 w-12 rounded-full" />
      <div class="space-y-2">
        <Skeleton class="h-4 w-[250px]" />
        <Skeleton class="h-4 w-[200px]" />
      </div>
    </div>

    <div v-else class="article-header__avatar">
      <Avatar>
        <AvatarImage :src="avatar ? avatar : ''"></AvatarImage>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div class="article-header__info">
        <p class="article-header__info-author">{{ author }}</p>
        <p class="article-header__info-postTime">{{ postTime }}</p>
      </div>
    </div>

    <div class="article-header__meta">
      <div class="news-footer">
        <div class="news-view">
          <Icon icon="iconamoon:eye-light" class="news-footer-icon" /><span
            class=""
            >{{ viewCount }}</span
          >
        </div>
        <div class="news-like">
          <Icon icon="iconamoon:like-light" class="news-footer-icon" />{{
            likeCount
          }}
        </div>
        <div class="news-comment">
          <Icon
            icon="fontisto:comment"
            class="news-footer-icon"
            style="font-size: 13px"
          />
          {{ commentCount }}
        </div>
      </div>
    </div>
    <div class="article-header__title">
      <p>{{ title }}</p>
    </div>

    <div class="article-header__tags">
      <ul class="article-header__tags-list">
        <li v-for="tag in tags" class="article-header__tags-item">
          <TagItem :name="tag"></TagItem>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.article-header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &__avatar {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__info {
    display: flex;
    flex-direction: column;

    &-author {
      font-size: 0.85rem;
    }

    &-postTime {
      font-size: 0.75rem;
      color: var(--muted-foreground);
    }
  }

  &__meta {
    flex: 1;
  }

  &__title {
    font-size: 1.75rem;
    font-weight: 600;
    margin: 1rem 0;
  }

  &__tags {
    &-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    &-item {
      display: flex;
      align-items: center;
      border-radius: var(--radius);
      color: var(--muted-foreground);
      font-size: 0.75rem;
      font-weight: 500;
      border: 1px solid transparent;
    }
  }
}
</style>
