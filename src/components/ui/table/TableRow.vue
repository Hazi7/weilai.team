<script setup lang="ts">
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "vue";
import { ref } from "vue";
const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
const tr = ref<any>();
defineExpose({ tr });
</script>

<template>
  <tr
    :class="
      cn(
        'border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
        props.class,
      )
    "
    ref="tr"
  >
    <slot />
  </tr>
</template>
