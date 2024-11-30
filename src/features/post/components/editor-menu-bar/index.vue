<script setup lang="ts">
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bold, Italic, Underline } from "lucide-vue-next";
import { type Editor } from "@tiptap/vue-3";

defineProps<{
  editor: Editor | undefined;
}>();
</script>

<template>
  <ToggleGroup type="multiple">
    <ToggleGroupItem
      value="bold"
      aria-label="切换粗体"
      @click="editor?.chain().toggleBold().run()"
    >
      <Bold class="h-4 w-4" />
    </ToggleGroupItem>
    <ToggleGroupItem value="italic" aria-label="切换斜体">
      <Italic class="h-4 w-4" />
    </ToggleGroupItem>
    <ToggleGroupItem value="underline" aria-label="切换下划线">
      <Underline class="h-4 w-4" />
    </ToggleGroupItem>
  </ToggleGroup>
</template>
