<script setup lang="ts">
import { defineProps, computed } from "vue";

defineProps<{
  name: string | number;
  loading?: boolean;
}>();
</script>

<template>
  <Skeleton class="h-4 w-[32px]" v-if="loading" />
  <RouterLink
    v-else
    class="tag"
    :to="{ name: '/community/blog/label/[tag]', params: { tag: name } }"
  >
    <span class="tag__prefix" :style="{ color: '#2A0798' }">#</span>
    <span class="tag__name">{{ name }}</span>
  </RouterLink>
</template>

<style lang="scss" scoped>
.tag {
  padding: 0.2rem 0.75rem;
  border-radius: calc(var(--radius) * 2);
  border: 1px solid transparent;
  font-size: 0.75rem;
  background-color: rgba(42, 7, 152, 0.1);
  box-shadow:
    inset 0 0 0 1px rgba(86, 39, 101, 0.1),
    inset 0 0 0 1px rgba(86, 39, 101, 0.1),
    inset 0 0 0 1px rgba(86, 39, 101, 0.1);
  color: var(--muted-foreground);
  transition: all 0.5s ease;

  &:hover {
    background-color: rgba(41, 7, 152, 0.05);
  }

  &__prefix {
    opacity: 0.7;
  }

  &__name {
    font-weight: bold;
  }
}
</style>
