<script setup lang="ts">
import { SearchInput } from '@/components/recruitment';
import { FilterCondition } from '@/components/recruitment';
import { DataRangePicker } from '@/components/recruitment';



import { ref } from 'vue';

const searchValue = ref('');

const handleInput = (value: string) => {
    searchValue.value = value;
};

//下拉过滤框
const itemsObjArr = ref([
    {
        id: 0,
        title: '年级',
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
        ]
    },
    {
        id: 1,
        title: '性别',
        label: "选择要筛选的性别",
        ref: "init",
        arr: [
            {
                condition: "男",
            },
            {
                condition: "女",
            },
        ]
    },
    {
        id: 2,
        title: '班级',
        label: "选择要筛选的班级",
        ref: "init",
        arr: [
            {
                condition: "计科233",
            },
            {
                condition: "物联233",
            },
            {
                condition: "数据233",
            },
        ]
    }
]);


const handleFilterCondition = (value: string, title: string) => {
    console.log(value, title);

};
</script>

<template>
    <DataRangePicker/>

    <SearchInput @input_src="handleInput"></SearchInput>
    <p>输入的内容: {{ searchValue }}</p>
    <FilterCondition :items-obj-arr="itemsObjArr" @filter_condition="handleFilterCondition"></FilterCondition>
</template>

<style lang="scss" scoped></style>