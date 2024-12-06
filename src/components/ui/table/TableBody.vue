<script setup lang="ts">
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "vue";
import { ref } from "vue";
const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
const tbody = ref<HTMLTableSectionElement>();
defineExpose({
  tbody,
});
</script>

<template>
  <tbody :class="cn('', props.class)" ref="tbody">
    <slot />
  </tbody>
</template>
