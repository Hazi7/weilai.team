<script setup lang="ts">
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { ref } from "vue";

const isVisible = ref(false);
interface Item {
  name: string;
  description: string;
}
// const inputRef = ref<HTMLInputElement | null>(null);
// nextTick(() => {
//   const inputElement = inputRef.value;
//   if (inputElement && document.activeElement === inputElement) {
//     inputElement.blur();
//   }
// });
const onInputFocus = () => {
  isVisible.value = true;
};

const onInputBlur = () => {
  isVisible.value = false;
};

const items: Item[] = [
  { name: "Item 1", description: "This is item 1" },
  { name: "Item 1", description: "This is item 1" },
];
</script>

<template>
  <div style="height: 45px">
    <Command class="command_box">
      <CommandInput
        placeholder="请输入关键词"
        class="search_input"
        ref="inputRef"
        @keydown.enter="
          () => {
            console.log('enter');
          }
        "
        @focus="onInputFocus"
        @blur="onInputBlur"
      />

      <CommandList class="search_list" v-show="items.length && isVisible">
        <CommandEmpty>未找到搜索结果</CommandEmpty>
        <CommandGroup heading="" class="p-0">
          <CommandItem
            :value="item.description"
            v-for="item in items"
            class="search_item"
          >
            <span>{{ item.name }}</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
      </CommandList>
    </Command>
  </div>
</template>
<style lang="scss">
.command_box {
  background-color: white;
  border: 1px solid #d0d9e4;
  position: relative;
  overflow: visible;
  width: 250px;
  float: right;
  height: 45px;
  border-radius: 25px;
}
.search {
  &_input {
    border-style: none !important;
  }
  &_list {
    box-shadow:
      0px 2px 5px rgba(0, 0, 0, 0.1),
      inset 0px 0.2px 0.5px rgba(0, 0, 0, 0.24);
    border: 1px solid var(--secondary-border);
    position: absolute;
    top: 50px;
    padding: 5px 0;
    border-radius: 2px;
    width: 100%;
    z-index: 5;
    background-color: white;
  }
  &_item {
    &:hover {
      background-color: #f8f8fa;
    }
  }
}
</style>
