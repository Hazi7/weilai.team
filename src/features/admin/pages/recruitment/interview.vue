<script setup lang="ts">
import {
  FilterConditionMoreSelect,
  FilterCondition,
  DataRangePicker,
  ToggleShow,
  MessageCard,
  AutoLongerInput,
} from "@/components/recruitment";

import { Icon } from "@iconify/vue";

import { ref } from "vue";

//切换框
const toggleItems = ref([
  {
    index: 0,
    title: "全部",
    isActive: true,
  },
  {
    index: 1,
    title: "待我面试",
    isActive: false,
  },
  {
    index: 2,
    title: "待反馈",
    isActive: false,
  },
  {
    index: 3,
    title: "已录取",
    isActive: false,
  },
  {
    index: 4,
    title: "未录取",
    isActive: false,
  },
]);

const dateRange = ref(null); // 初始化日期范围

// 获得子组件的日期参数
const handleDateRangeUpdate = (newDateRange: any) => {
  dateRange.value = newDateRange;
  // 在这里可以对日期范围进行处理，例如发送请求或更新其他组件的数据
  handleDateRange();
};
//对dateRange进行处理
const handleDateRange = () => {
  // 在这里处理日期范围，例如将日期范围转换为字符串格式
  if (!dateRange.value) {
    return;
  }
  const startDate = Reflect.get(dateRange.value, "start");
  const endDate = Reflect.get(dateRange.value, "end");
  const formattedRange = `${startDate} - ${endDate}`;
  console.log(formattedRange);
};

const searchValue = ref("");

const handleInput = (value: string) => {
  searchValue.value = value;
  console.log(searchValue);
};

const filterOneSeletedItems = ref([
  {
    title: "年级",
    label: "选择要筛选的年级",
    ref: "init",
    arr: [
      {
        condition: "24级",
      },
      {
        condition: "23级",
      },
      {
        condition: "22级",
      },
    ],
  },
  {
    title: "面试轮次",
    label: "选择要筛选的面试轮次",
    ref: "init",
    arr: [
      {
        condition: "一面",
      },
      {
        condition: "二面",
      },
      {
        condition: "三面",
      },
    ],
  },
]);
const handleFilterCondition = (value: string, title: string) => {
  console.log(value, title);
};

const filterMoreSeletedItem = ref(
  {
    title: "面试官",
    label: "选择面试官",
    drapdownItems: [
      {
        condition: "王科林",
        isSeleted: false,
      },
      {
        condition: "刘志文",
        isSeleted: false,
      },
      {
        condition: "贝利亚",
        isSeleted: false,
      },
      {
        condition: "张三",
        isSeleted: false,
      },
      {
        condition: "李四",
        isSeleted: false,
      },
      {
        condition: "王五",
        isSeleted: false,
      },
      {
        condition: "赵六",
        isSeleted: false,
      },
    ],
  },
);

const isReset = ref(false);
//重置筛选条件
const resetCondition = () => {
  // 在这里处理重置条件的逻辑，例如清空输入框或其他组件的数据
  filterOneSeletedItems.value.forEach((item) => {
    item.ref = "init";
  });
  filterMoreSeletedItem.value.drapdownItems.forEach((item) => {
    item.isSeleted = false;
  });
  dateRange.value = null;
  isReset.value = true;
  setTimeout(() => {
    isReset.value = false;
  }, 500);
};
</script>

<template>
  <div class="content">
    <div class="filter-items">
      <FilterCondition
        :itemsObjArr="filterOneSeletedItems"
        @filter_condition="handleFilterCondition"
      />
      <FilterConditionMoreSelect
        class="mr-4 min-w-[300px]"
        :filterMoreSeletedItem="filterMoreSeletedItem"
      />

      <div class="date-picker">
        <DataRangePicker
          @updateDateRange="handleDateRangeUpdate"
          :dateRange="dateRange"
          :isReset="isReset"
        />
      </div>
      <div class="reset" @click="resetCondition">
        重置
        <Icon icon="bitcoin-icons:cross-outline" />
      </div>

      <div class="search-input">
        <AutoLongerInput
          @input_src="handleInput"
          placeholderText="搜索候选人："
        />
      </div>
    </div>
    <div class="toggle-handle">
      <ToggleShow :toggleItems="toggleItems"></ToggleShow>
    </div>
    <div class="main-content-show">
      <MessageCard v-for="i in 3"></MessageCard>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/recruitment.scss";
</style>
