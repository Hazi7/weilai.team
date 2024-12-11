<script setup lang="ts">
import { type Editor } from "@tiptap/vue-3";
import { onMounted, ref, type Ref } from "vue";

interface TocItem {
  text: string;
  level: number;
  offset: number;
  children?: TocItem[];
}

const props = defineProps<{
  editor: Editor | undefined;
}>();

const tocList: Ref<TocItem[]> = ref([]);
const scrollDOM = ref<HTMLElement | null>(null);

const getToc = () => {
  if (!props.editor) return;

  let baseIndex: number = 0;
  let maxLevel: number | null = null;
  let stack: TocItem[] = [];

  props.editor?.state.doc.forEach((node, offset) => {
    if (node.type.name === "heading") {
      const headingText = node.textContent;
      const headingLevel = node.attrs.level;

      if (maxLevel === null || headingLevel > maxLevel) {
        maxLevel = headingLevel;
        baseIndex++;
      }

      const newItem: TocItem = {
        text: headingText,
        level: baseIndex,
        offset: offset,
      };

      stack.push(newItem);
    }
  });

  tocList.value = stack;
};

props.editor?.on("transaction", () => {
  getToc();
});

const scrollToHeading = (top: number) => {
  if (scrollDOM.value) {
    scrollDOM.value.scrollTo({
      top,
      left: 0,
      behavior: "smooth",
    });
  }
};

onMounted(() => {
  getToc();
  scrollDOM.value = document.querySelector(
    ".app-editor__scroll",
  ) as HTMLElement;
});
</script>

<template>
  <div v-if="tocList.length" class="toc">
    <ul
      class="toc__list"
      @click="
        (event) => {
          const target = event.target as HTMLElement;
          const link = target.closest('li');
          if (link) {
            const offset = link.dataset.offset;
            if (offset) scrollToHeading(+offset);
          }
        }
      "
    >
      <li
        v-for="item in tocList"
        :key="item.offset"
        class="toc__item"
        :class="`toc__item--level${item.level}`"
        :data-offset="item.offset"
        :data-level="item.level"
      >
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.toc {
  &__list {
    position: relative;
    display: flex;
    flex-direction: column;
    max-height: calc(70vh - 58px);
    gap: 0.5rem;

    --main-color: #425aef;
    --main-color-bg: #4259ef0d;
  }

  &__item {
    cursor: pointer;
    padding-left: 0;
    list-style: none;
    padding: 0.5rem 1rem;
    border-radius: var(--radius);
    color: var(--secondary-foreground);

    &--level1 {
      font-size: 1rem;
    }

    &--level2 {
      font-size: 1rem;
      padding-left: 1.5rem;
    }

    &--level3 {
      font-size: 0.8rem;
      padding-left: 2rem;
    }

    &--level4 {
      font-size: 0.75rem;
      padding-left: 2.45rem;
    }

    &--active {
      color: var(--main-color);
      background-color: var(--main-color-bg);
    }
  }
}
</style>
