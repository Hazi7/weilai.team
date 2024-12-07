<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import { ref } from 'vue'
import UseApplication from '@/composables/useApplication'

interface Framework {
    value: string,
    label: string
}
const frameworks: Framework[] = []
const { getClass, classListData } = UseApplication()
getClass().then(res => {
    const classList = classListData.value
    classList.forEach(element => {
        frameworks.push({ value: element, label: element })
    });
})

const open = ref(false)
const value = ref('')
</script>

<template>
    <Popover v-model:open="open">
        <PopoverTrigger as-child>
            <Button variant="outline" role="combobox" :aria-expanded="open" class="w-[200px] justify-between">
                {{ value
                    ? frameworks.find((framework) => framework.value === value)?.label
                    : "请选择班级" }}
                <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
        </PopoverTrigger>
        <PopoverContent class="w-[200px] p-0">
            <Command>
                <CommandList class="commandList">
                    <CommandGroup>
                        <CommandItem v-for="framework in frameworks" :key="framework.value" :value="framework.value"
                            @select="(ev) => {
                                if (typeof ev.detail.value === 'string') {
                                    value = ev.detail.value
                                }
                                open = false
                            }">
                            {{ framework.label }}
                            <Check :class="cn(
                                'ml-auto h-4 w-4',
                                value === framework.value ? 'opacity-100' : 'opacity-0',
                            )" />
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        </PopoverContent>
    </Popover>
</template>
<style lang="scss">
.commandList {
    background-color: white;
    width: 200px;
}
</style>