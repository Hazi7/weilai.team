<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import Blockquote from "@tiptap/extension-blockquote";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Paragraph from "@tiptap/extension-paragraph";
import CodeBlock from "@tiptap/extension-code-block";
import Heading from "@tiptap/extension-heading";
import { onBeforeUnmount, onMounted } from "vue";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Bold from "@tiptap/extension-bold";
import AppTableExtension from "../extensions/app-table";
import EditorMenuBar from "@post/components/editor-menu-bar/index.vue";
import Image from "@tiptap/extension-image";

const jsonData = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "哈哈哈",
        },
      ],
    },
    {
      type: "appTable",
      attrs: {
        tableData: [
          [null, null, null, null, null],
          [null, null, null, "32", "32"],
          [null, null, "", null, "32"],
          [null, null, "32", "32", "32"],
          [null, null, null, "32", "32"],
        ],
      },
    },
  ],
};

const editor = useEditor({
  content: jsonData,
  extensions: [
    Document,
    Paragraph,
    Text,
    Blockquote,
    CodeBlock,
    Heading.configure({
      levels: [1, 2, 3, 4, 5],
    }),
    HorizontalRule,
    Bold,
    Image.configure({
      allowBase64: true,
    }),
    AppTableExtension,
  ],
});

const handleClick = () => {
  console.log("tiptap 数据:", editor?.value?.getJSON());
};

onMounted(() => {});

onBeforeUnmount(() => {
  editor.value?.destroy();
});
</script>

<template>
  <div v-if="editor" class="app-editor">
    <EditorMenuBar :editor="editor"></EditorMenuBar>
    <editor-content :editor="editor" class="app-editor__content" />
    <button class="test" @click="handleClick">查看json</button>
  </div>
</template>

<style lang="scss">
@use "../styles/markdown.scss";

.app-editor {
  height: 100vh;
  background-color: #eee;

  &__content {
    width: 80%;
    margin: 0 auto;

    box-sizing: border-box;
    border: 1px solid #999;
    border-radius: var(--border);

    p {
      height: 100%;
    }
  }
}

.test {
  position: absolute;
}
</style>
