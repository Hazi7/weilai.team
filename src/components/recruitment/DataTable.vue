<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Checkbox } from "@/components/ui/checkbox"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {  defineProps,ref,computed } from 'vue';
import { Icon } from '@iconify/vue';

import type { IAllApplyUserVO,tableActionsVO,tableHeadersVO } from '@/types/recruitmentType';



const props = defineProps<{
    items: IAllApplyUserVO[];
    headers: tableHeadersVO[];
    actionItems: tableActionsVO[];
}>()


// 用于存储选中的 id
const selectedIds = ref<string[]>([]);
// 用于处理选中的 id
const handleSelect = (id: string) => {
  if (selectedIds.value.includes(id)) {
    selectedIds.value = selectedIds.value.filter((item) => item!== id);
  } else {
    selectedIds.value.push(id);
  }
};


// 用于处理全选的 id
const handleSelectAll = () => {

  if (selectedIds.value.length === props.items.length) {
    selectedIds.value = [];
  } else {
    selectedIds.value = props.items.map((item) => item.id);
  }
};


const isAllSelected = computed(() => selectedIds.value.length === props.items.length);
const isNotAllSelected = computed(() => selectedIds.value.length!== props.items.length&&selectedIds.value.length!== 0);

</script>

<template>
  <Table class="adaptive">
    <TableCaption></TableCaption>
    <TableHeader >
      <TableRow>
        <TableCell class="font-medium text-center min-w-120">
          <Checkbox @click="handleSelectAll"
          class="checkbox"
          :checked="isAllSelected"
          :checked-not-all="isNotAllSelected"
          />
        </TableCell>
        <TableCell
        class="font-medium  text-center  min-w-120"
        v-for="header in headers"
        :key="header.key"

        >
        {{ header.title }}
      </TableCell>

      </TableRow>
    </TableHeader>
    <TableBody>

      <TableRow v-show="items.length === 0" style="font-size: large;height: 40px;text-align: center;">
        <TableCell colspan="100%">
          暂无数据
        </TableCell>
      </TableRow>
      <TableRow  v-for="item in items" :key="item.id" class="hover-tr"  >

        <TableCell
        class="font-medium text-center"
        v-for="(obj,theKey) in item"
        :key="theKey"
        >
        <template v-if="theKey === 'id'">
          <Checkbox
            class="checkbox"
            @click="handleSelect(item.id)"
            :checked="selectedIds.includes(item.id)"
            :value="theKey"
          />
        </template>
        <template v-else>
          {{ obj }}
        </template>

        </TableCell>
        <!-- 操作框 -->
        <TableCell class="font-medium">
          <Popover>
            <PopoverTrigger>
              <Icon icon="tabler:dots" style="display: inline-block;font-size: 18px; cursor: pointer;"/>
            </PopoverTrigger>
            <PopoverContent class="popover-content"   >
              <div>
                <div
                  class="pop-content-item"
                  v-for="(i,index) in actionItems"
                  :key="index"
                  @click="i.onclick(item.id)"
                  >
                  <Icon :icon=i.icon
                  :key="index"
                  style="display: inline-block;font-size: 18px; cursor: pointer;"/>
                  <span class="pop-content-item-text">{{ i.title }}</span>
                </div>
              </div>

            </PopoverContent>
          </Popover>

        </TableCell>

      </TableRow>
    </TableBody>
  </Table>

</template>
<style lang="scss">
@use "@/assets/styles/recruitment.scss" ;
.adaptive table{
  width: 100%;
  height: auto;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 0 10px #ccc;
  overflow: auto;
}
.hover-tr{
  &:hover{
    background-color: var(--accent);
    cursor: pointer;
  }
}
.min-w-120{
  min-width: 120px;
}
.popover-content{
  width: 200px;
  height: auto;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 0 10px #ccc;
  position: relative;
  left: -80px;
  top: 0;
  z-index: 100;
 .pop-content-item{
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    cursor: pointer;

    &:hover{
      background-color:var(--accent);
    }

    .pop-content-item-text{

      font-size: 14px;
      margin-left: 10px;
    }
  }
}
</style>