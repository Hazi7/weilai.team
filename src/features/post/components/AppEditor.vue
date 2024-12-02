<script setup lang="ts">
import EditorMenuBar from "@post/components/editor-menu-bar/index.vue";
import { EditorContent } from "@tiptap/vue-3";
import type { Editor, JSONContent } from "@tiptap/vue-3";
import { watch } from "vue";

const props = defineProps<{
  editor: Editor | undefined;
  postContent: JSONContent | undefined;
}>();

watch(
  () => props.editor?.getJSON(),
  () => {
    emits("update:postContent", props.editor?.getJSON());
  },
);
const emits = defineEmits<{
  (e: "update:postContent", value: JSONContent | undefined): void;
}>();
</script>

<template>
  <div v-if="editor" class="app-editor">
    <EditorMenuBar :editor="editor"></EditorMenuBar>
    <div class="app-editor__scroll">
      <EditorContent :editor="editor" class="app-editor__content" />
    </div>
  </div>
</template>

<style lang="scss">
@use "../styles/markdown.scss";

.app-editor {
  flex: 1 1 70%;
  height: 100%;
  overflow: hidden;

  &__scroll {
    height: 100%;
    box-sizing: border-box;
    border: 1px solid #e6e5e5;
    background-color: #f8f9fa;
    overflow-y: scroll;
  }

  &__content {
    margin: 0 auto;
    min-height: 100%;
    display: flex;
    box-sizing: border-box;
  }

  .tiptap {
    margin: 1rem 4rem;
    flex: 1;

    &:focus {
      outline: none;
    }
  }
}
</style>
