<script setup lang="ts">
import { type Editor } from "@tiptap/vue-3";
import { Icon } from "@iconify/vue";

const props = defineProps<{
  editor: Editor | undefined;
}>();

const addImage = () => {
  const url = window.prompt("URL");

  if (url) {
    props.editor?.chain().focus().setImage({ src: url }).run();
  }
};
</script>

<template>
  <div class="menu-bar">
    <ul class="menu-bar__list">
      <li
        class="menu-bar__item"
        :class="{ 'is-active': props.editor?.isActive('bold') }"
        @click="editor?.chain().focus().toggleBold().run()"
      >
        <Icon icon="solar:text-bold-bold-duotone"></Icon>
      </li>
      <li
        class="menu-bar__item"
        :class="{ 'is-active': props.editor?.isActive('bold') }"
        @click="editor?.chain().focus().toggleBold().run()"
      >
        <Icon icon="ph:text-italic-duotone"></Icon>
      </li>
      <li
        class="menu-bar__item"
        :class="{ 'is-active': props.editor?.isActive('bold') }"
        @click="editor?.chain().focus().toggleBold().run()"
      >
        <Icon icon="ph:text-underline-duotone"></Icon>
      </li>
      <li
        class="menu-bar__item"
        :class="{ 'is-active': props.editor?.isActive('bold') }"
        @click="
          editor
            ?.chain()
            .focus()
            .insertContent({
              type: 'appTable',
            })
            .run()
        "
      >
        <Icon icon="si:table-duotone"></Icon>
      </li>
      <li
        class="menu-bar__item"
        :class="{ 'is-active': props.editor?.isActive('bold') }"
        @click="addImage"
      >
        <Icon icon="ph:picture-in-picture-duotone"></Icon>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.menu-bar {
  display: flex;
  justify-content: center;
  align-items: center;

  &__list {
    height: 100%;
    margin: 1rem 0;
    padding: 0.5rem 1rem;
    background-color: #fff;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border-radius: 0.5rem;
    border: 0.125rem solid #eef0f2;
  }

  &__item {
    padding: 0.5rem;
    border: 1px solid #e8eaee;
    border-radius: 0.5rem;
    cursor: pointer;
    margin: 0 0.25rem;
  }
}

.is-active {
  background-color: #e2d929;
}
</style>
