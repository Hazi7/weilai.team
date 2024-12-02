<script setup lang="ts">
import { type Editor } from "@tiptap/vue-3";
import { onMounted, ref, type Ref } from "vue";

interface TocItem {
  text: string;
  level: number;
  id: string;
  children?: TocItem[];
}

const props = defineProps<{
  editor: Editor | undefined;
}>();

const tocItem: Ref<TocItem[]> = ref([]);

const getToc = () => {
  if (!props.editor) return;

  const headingsList: TocItem[] = [];
  const stack: TocItem[] = [];

  props.editor?.state.doc.forEach((node, pos) => {
    if (node.type.name === "heading") {
      const headingText = node.textContent;
      const headingLevel = node.attrs.level;
      const headingId = `heading-${pos}`;

      const newItem: TocItem = {
        text: headingText,
        level: headingLevel,
        id: headingId,
        children: [],
      };

      // 处理树形结构
      while (
        stack.length > 0 &&
        stack[stack.length - 1].level >= headingLevel
      ) {
        stack.pop();
      }

      if (stack.length === 0) {
        headingsList.push(newItem);
      } else {
        const parent = stack[stack.length - 1];
        if (!parent.children) parent.children = [];
        parent.children.push(newItem);
      }

      stack.push(newItem);
    }
  });

  tocItem.value = headingsList;
};

props.editor?.on("transaction", () => {
  getToc();
});

const scrollToHeading = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const renderTocTree = (items: TocItem[]) => {
  return items
    .map(
      (item) =>
        `<li class="toc__item" style="padding-left: ${item.level * 12}px">
      <a href="#${item.id}">${item.text}</a>
      ${
        item.children && item.children.length > 0
          ? `<ul class="toc__sublist">${renderTocTree(item.children)}</ul>`
          : ""
      }
    </li>`,
    )
    .join("");
};

onMounted(() => {
  getToc();
});
</script>

<template>
  <div v-if="tocItem.length" class="toc">
    <ul
      class="toc__list"
      v-html="renderTocTree(tocItem)"
      @click="
        (event) => {
          const target = event.target as HTMLElement;
          const link = target.closest('a');
          if (link) {
            const id = link.getAttribute('href')?.replace('#', '');
            if (id) scrollToHeading(id);
          }
        }
      "
    ></ul>
  </div>
</template>

<style lang="scss" scoped>
.toc {
  &__list,
  &__sublist {
    list-style-type: none;
    padding-left: 0;
  }

  &__sublist {
    margin-left: 12px;
  }

  &__item {
    cursor: pointer;
    padding: 4px 0;

    a {
      text-decoration: none;
      color: #333;
      display: block;

      &:hover {
        color: #0066cc;
      }
    }
  }
}
</style>
