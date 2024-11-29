<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import Blockquote from "@tiptap/extension-blockquote";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Paragraph from "@tiptap/extension-paragraph";
import CodeBlock from "@tiptap/extension-code-block";
import Heading from "@tiptap/extension-heading";
import { onBeforeUnmount } from "vue";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Bold from "@tiptap/extension-bold";
import AppTableExtension from "../extensions/app-table";
import EditorMenuBar from "@post/components/editor-menu-bar/index.vue";

const editor = useEditor({
  content: `
      测试
      `,
  extensions: [
    Document,
    Paragraph,
    Text,
    Blockquote,
    CodeBlock,
    Heading.configure({
      levels: [1, 2, 3],
    }),
    HorizontalRule,
    Bold,
    AppTableExtension,
  ],
});

onBeforeUnmount(() => {
  editor.value?.destroy();
});
</script>

<template>
  <div v-if="editor" class="container">
    <EditorMenuBar :editor="editor"></EditorMenuBar>
    <div class="control-group">
      <div class="button-group">
        <button
          :class="{ 'is-active': editor.isActive('codeBlock') }"
          @click="
            editor
              .chain()
              .focus()
              .insertContent('<app-table></app-table>')
              .run()
          "
        >
          Toggle code block
        </button>
        <button :disabled="editor.isActive('codeBlock')">Set code block</button>
      </div>
    </div>
    <editor-content :editor="editor" />
  </div>
</template>

<style lang="scss">
blockquote {
  border-left: 3px solid red;
  margin: 1.5rem 0;
  padding-left: 1rem;
}

code {
  background: none;
  color: inherit;
  font-size: 0.8rem;
  padding: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  line-height: 1.1;
  margin-top: 2.5rem;
  text-wrap: pretty;
}

h1,
h2 {
  margin-top: 3.5rem;
  margin-bottom: 1.5rem;
}

h1 {
  font-size: 1.4rem;
}

h2 {
  font-size: 1.2rem;
}

h3 {
  font-size: 1.1rem;
}

h4,
h5,
h6 {
  font-size: 1rem;
}
</style>
