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
import {  defineProps,ref} from 'vue';
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

const props = defineProps<{
    items: Item[];
    headers: headers[];
}>()


// 用于存储选中的 id
const selectedIds = ref<string[]>([]);
</script>

<template>
  <Table>
    <TableCaption></TableCaption>
    <TableHeader >
      <TableRow>
        <TableCell class="font-medium text-center">
          <Checkbox v-model="selectedIds" />
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
            v-model="selectedIds"
            :value="theKey"
          />
        </template>
        <template v-else>
          {{ obj }}
        </template>

        </TableCell>
        <TableCell class="font-medium">
          <Icon icon="tabler:dots" style="display: inline-block;font-size: 18px; cursor: pointer;"/>
        </TableCell>

      </TableRow>
    </TableBody>
  </Table>

</template>