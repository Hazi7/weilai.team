<script setup lang="ts">
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "vue";
import { ref } from "vue";
const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
const table = ref<any>();
defineExpose({ table });
</script>

<template>
  <div class="relative w-full overflow-auto">
    <table
      :class="cn('w-full caption-bottom text-sm', props.class)"
      ref="table"
    >
      <slot />
    </table>
  </div>
</template>
