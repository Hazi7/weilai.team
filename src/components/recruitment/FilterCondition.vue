<script lang="ts" setup>
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { ref , defineProps,defineEmits, computed} from 'vue';




type ItemObj= {
    id: number;
    title: string;
    label:string;
    ref:string;
    arr:Array<{
        condition:string;
    }>;
}
const emit = defineEmits(['filter_condition']);
// const props = defineProps<{
//     itemsObjArr : ItemObj[]
// }>()

const props = defineProps( {itemsObjArr : Array<ItemObj>})



// const getFilterCondition = (e:Event) => {
//     const title = (e.target as HTMLElement).getAttribute("title");
//     const value = (e.target as HTMLElement).getAttribute("value");
//     console.log(title,value);
// }
//     @click="getFilterCondition($event)"

const filter_condition = (e:Event) => {
    if(e){
        emit('filter_condition',(e.target as HTMLInputElement).getAttribute("value"), (e.target as HTMLInputElement).getAttribute("title"));
    }
    return;
}

</script>
<template>
    <div class="filter-condition">
        <DropdownMenu v-for="i in itemsObjArr " :key="i.id">
            <DropdownMenuTrigger>
                {{ i.title }}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{{ i.label }}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem v-for="j in i.arr">
                    <DropdownMenuRadioGroup
                        v-model="i.ref"
                    >
                        <DropdownMenuRadioItem
                        :value="j.condition"
                        :title="i.title"
                        @click="filter_condition($event)"
                        >
                            {{ j.condition }}
                        </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                    <DropdownMenuSeparator />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
</template>
<style lang="scss" scoped>

</style>