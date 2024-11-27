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
type Item= {
    id: string;
    name: string;
    session: string;
    clazz: string;
    studentId: string;
    gender: string;
    QQ: string;
    email: string;
    state: string;
}

type headers= {
    title: string;
    key: string;
}

type actionItems= {
    title: string;
    icon: string;
}
const props = defineProps<{
    items: Item[];
    headers: headers[];
    actionItems: actionItems[];
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
  <Table>
    <TableCaption></TableCaption>
    <TableHeader >
      <TableRow>
        <TableCell class="font-medium text-center">
          <Checkbox @click="handleSelectAll"
          class="checkbox"
          :checked="isAllSelected"
          :checked-not-all="isNotAllSelected"
          />
        </TableCell>
        <TableCell
        class="font-medium  text-center"
        v-for="header in headers"
        :key="header.key"

        >
        {{ header.title }}
      </TableCell>

      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="item in items" :key="item.id" >

        <TableCell class="font-medium text-center" v-for="(obj,theKey) in item" :key="theKey"
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
                <div class="pop-content-item" v-for="(item,index) in actionItems">
                  <Icon :icon=item.icon
                  :key="index"
                  style="display: inline-block;font-size: 18px; cursor: pointer;"/>
                  <span class="pop-content-item-text">{{ item.title }}</span>
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

.popover-content{
  width: 200px;
  height: auto;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 0 10px #ccc;
  position: absolute;
  top: 0;
  left: -150px;
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