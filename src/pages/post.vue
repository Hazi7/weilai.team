<script setup lang="ts">
import PrimarySidebar from "@/features/post/components/sidebar/PrimarySidebar.vue";
import SecondarySidebar from "@/features/post/components/sidebar/SecondarySidebar.vue";
import AppEditor from "@post/components/AppEditor.vue";
import PostHeader from "@post/components/header/index.vue";
import { onBeforeUnmount, ref, type Ref } from "vue";
import type { AcceptableInputValue } from "node_modules/radix-vue/dist/TagsInput/TagsInputRoot";
import useCreatePost from "@/features/post/composables/useCreatePost";
import useAppEditor from "@/features/post/composables/useAppEditor";
import type { JSONContent } from "@tiptap/core";

const { editor } = useAppEditor();

const postTitle: Ref<string | undefined> = ref();
const postTags: Ref<AcceptableInputValue[] | undefined> = ref();
const postCategories: Ref<string | undefined> = ref();
const postSummary: Ref<string | number | undefined> = ref("");
const postContent: Ref<JSONContent | undefined> = ref();

onBeforeUnmount(() => {
  editor.value?.destroy();
});

const handlePost = async () => {
  const { createPost } = useCreatePost();

  await createPost(
    postSummary.value,
    JSON.stringify(postContent.value),
    postTags.value,
    postTitle.value,
    postCategories.value,
  );
};
</script>

<template>
  <div class="post-layout">
    <div class="post-layout__wrapper">
      <PostHeader
        :post-title="postTitle"
        @published:post="handlePost"
        @update:post-title="
          (val) => {
            postTitle = val();
          }
        "
      ></PostHeader>
      <main class="post-layout__content">
        <PrimarySidebar></PrimarySidebar>
        <AppEditor
          :editor="editor"
          :post-content="postContent"
          @update:post-content="
            (val) => {
              postContent = val;
            }
          "
        />
        <SecondarySidebar
          :editor="editor"
          :post-tags="postTags"
          :post-categories="postCategories"
          :post-summary="postSummary"
          @update:post-tags="
            (value) => {
              postTags = value;
            }
          "
          @update:post-categories="
            (val) => {
              postCategories = val;
            }
          "
          @update:post-summary="
            (val) => {
              postSummary = val;
            }
          "
        ></SecondarySidebar>
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.post-layout {
  box-sizing: border-box;
  height: 100vh;
  padding: 1.5rem;
  background-image: url(/public/post_background.png);
  background-size: cover;

  &__wrapper {
    background-color: rgba(255, 255, 255, 0.5);
    height: 100%;
    border-radius: 1rem;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  &__content {
    display: flex;
    flex: 1 1 calc(100vh - 3rem);
    overflow: auto;
    box-sizing: border-box;
  }
}
</style>
