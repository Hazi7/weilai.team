<script setup lang="ts">
import { Icon } from "@iconify/vue/dist/iconify.js";

defineProps<{
  postTitle: string | undefined;
}>();

defineEmits<{
  (e: "update:postTitle", value: () => string): void;
  (e: "published:post", value: () => void): void;
}>();
</script>

<template>
  <header class="post-header">
    <div class="post-header__profile">头像</div>
    <div class="post-header__message">消息</div>
    <input
      type="text"
      placeholder="🎉  输入文章标题"
      class="post-header__title"
      :value="postTitle"
      @input="
        (event: Event) =>
          $emit('update:postTitle', () => {
            return (event.target as HTMLInputElement).value;
          })
      "
    />
    <button
      class="post-header__publish"
      @click="
        () => {
          $emit('published:post', () => {});
        }
      "
    >
      <Icon
        icon="lets-icons:circle-right-light"
        width="1.6rem"
        height="1.6rem"
      ></Icon>
      <span>发布</span>
    </button>
  </header>
  <hr />
</template>

<style lang="scss" scoped>
.post-header {
  width: 100%;
  flex: 1 0 3rem;
  backdrop-filter: blur(16px);
  border-radius: 1rem 1rem 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 1rem;
  box-shadow: rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.1);

  &__title {
    height: 100%;
    background-color: transparent;

    &:focus {
      outline: none;
    }
  }

  &__publish {
    span {
      font-size: 0.85rem;
    }
  }

  &__title {
    margin: 0 auto;
  }

  button {
    color: var(--secondary-foreground);
    border-radius: 1rem;
    padding: 0.25rem 0.75rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
}
</style>
