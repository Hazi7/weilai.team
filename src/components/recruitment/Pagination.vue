<script lang="ts" setup>
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination'
import { Button } from '@/components/ui/button'
import { ref, computed } from 'vue';


const props = defineProps({
  totalItems: Number,
  pageSize: Number,
});

const emit = defineEmits(['update:page']);

const currentPage = ref(1);

const pageCount = computed(() => {
  const total = props.totalItems || 0;
  const size = props.pageSize || 1;
  return Math.ceil(total / size);
});
//计算属性
// const pages = computed(() => {
//   const startPage = Math.max(1, currentPage.value - 2);
//   const endPage = Math.min(pageCount.value, currentPage.value + 2);
//   const pages = [];
//   for (let number = startPage; number <= endPage; number++) {
//     pages.push(number);
//   }
//   return pages;
// });

function changePage(page: number) {
  currentPage.value = page;
  emit('update:page', page);
}

</script>


<template>
  <Pagination v-slot="{ page }" :total="totalItems" :sibling-count="1" show-edges :default-page="1">
    <PaginationList v-slot="{ items }" class="flex items-center gap-1">
      <PaginationFirst @click="changePage(1)" />
      <PaginationPrev @click="changePage(page - 1)" />

      <template v-for="(item, index) in items">
        <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
          <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'"
            @click="changePage(item.value)">
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>

      <PaginationNext @click="changePage(page + 1)" />
      <PaginationLast @click="changePage(pageCount)" />
    </PaginationList>
  </Pagination>
</template>
<style lang="scss" scoped>
@use '@/assets/styles';

.pagination-container {
  nav {
    display: inline-flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    margin-top: 20px;
    background-color: var(--background);

    [data-selected] {
      background-color: var(--foreground);
      color: var(--primary);
      border-radius: 4px;
    }
  }
}
</style>