<script setup lang="ts">
import type { DateRange } from "radix-vue";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RangeCalendar } from "@/components/ui/range-calendar";
import { cn } from "@/lib/utils";
import { DateFormatter, getLocalTimeZone } from "@internationalized/date";
import { CalendarIcon } from "@radix-icons/vue";
import { type Ref, ref, watch } from "vue";
import { Icon } from "@iconify/vue";
const df = new DateFormatter("zh-CN", {
  dateStyle: "short",
});

const props = defineProps<{
  isReset: boolean;
}>();

const emit = defineEmits(["updateDateRange", "resetCondition"]);

const value = ref({
  start: undefined,
  end: undefined,
}) as Ref<DateRange>;

watch(value, (newVal) => {
  if (!newVal.start && !newVal.end) {
    return;
  }
  emit("updateDateRange", newVal);
});
watch(props, (newVal) => {
  if (newVal.isReset) {
    resetCondition();
  }

  return;
});
const resetCondition = () => {
  value.value = {
    start: undefined,
    end: undefined,
  };
};
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="
          cn(
            'w-[280px] justify-start text-left font-normal',
            !value && 'text-muted-foreground',
          )
        "
        style="position: relative"
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        <template v-if="value.start">
          <template v-if="value.end">
            {{ df.format(value.start.toDate(getLocalTimeZone())) }} -
            {{ df.format(value.end.toDate(getLocalTimeZone())) }}
          </template>

          <template v-else>
            {{ df.format(value.start.toDate(getLocalTimeZone())) }}
          </template>
        </template>
        <template v-else> 请选择时间段 </template>
        <Icon
          icon="pepicons-pencil:triangle-down"
          style="position: absolute; right: 13%"
        />
      </Button>
    </PopoverTrigger>
    <PopoverContent
      class="w-auto p-0"
      style="background-color: white; color: black"
    >
      <RangeCalendar
        v-model="value"
        initial-focus
        :number-of-months="2"
        @update:start-value="(startDate) => (value.start = startDate)"
        locale="zh-CN"
      >
      </RangeCalendar>
    </PopoverContent>
  </Popover>
</template>
<style lang="scss">
//为时间选择组件 设置选中特效
@use "@/assets/styles";

[data-radix-popper-content-wrapper] {
  [data-selected="true"] {
    background-color: var(--accent);
  }
  [data-selection-end="true"],
  [data-selection-start="true"] {
    background-color: var(--accent-foreground);
    color: white;
  }
}
</style>
