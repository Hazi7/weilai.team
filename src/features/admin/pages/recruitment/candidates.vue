
<script setup lang="ts">
import { FilterCondition,DataRangePicker,ToggleShow ,DataTable,Pagination,AutoLongerInput } from '@/components/recruitment';
import { Icon, loadIcon } from '@iconify/vue';
import { Button } from '@/components/ui/button';
import { ref, watch ,watchEffect} from 'vue';
import {getAllApplyUser,getAllGrade} from "@/composables/useRecruitmentRequest";
import type {IAllApplyUserVO,IGetAllApplyUserDTO ,IResponseDataApplyUser,IAllApplyUserDTO } from '@/types/recruitmentType';
import {interviewStatusMap} from '@/types/recruitmentType';
const searchValue = ref('');

const handleInput = (value: string) => {
    searchValue.value = value;
    console.log(searchValue);
};

//下拉过滤框
const candidates_itemsObjArr = ref([
    {
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

    getAllGrade({pageNo:1,pageSize:100})
        .then(({data,error,loading})=>{
            console.log(data,error,loading);
        })


//获得子组件的过滤条件
const handleFilterCondition = (value: string, title: string) => {
    console.log(value, title);
};

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
    const startDate = Reflect.get(dateRange.value, 'start');
    const endDate = Reflect.get(dateRange.value, 'end');
    const formattedRange = `${startDate} - ${endDate}`;
    console.log(formattedRange);

};

const isReset = ref(false);
//重置筛选条件
const resetCondition = () => {
    // 在这里处理重置条件的逻辑，例如清空输入框或其他组件的数据
    candidates_itemsObjArr.value.forEach((item) => {
        item.ref = 'init';
    });
    dateRange.value = null;
    isReset.value = true;
    setTimeout(() => {
        isReset.value = false;
    }, 500);
}


//切换框
const toggleItems = ref([
    {
        index: 0,
        title: '待安排',
        isActive: true,
    },
    {
        index: 1,
        title: '待面试',
        isActive: false,
    },
    {
        index: 2,
        title: '已录取',
        isActive: false,
    },
    {
        index: 3,
        title: '已淘汰',
        isActive: false,
    }
]);


const tableData = ref(<IAllApplyUserVO[]>[]);
//分页
const pageSize = ref(10);
const pageNo = ref(1);
const total = ref(0);
const getApplyUserData=ref<IResponseDataApplyUser|null>(null);
const status = ref(0);
//从分页组件拿到页码信息并更新
const changePage = (newPage: number) => {
    pageNo.value = newPage;
};
//筛选状态
const handleToggleShowStatus = (newStatus: number) => {
    status.value = newStatus;
};



const headers = ref([
    {
        title: '姓名',
        key: 'name',
    },
    {
        title: '年级',
        key: 'session',
    },
    {
        title: '性别',
        key: 'gender',
    },
    {
        title: '班级',
        key: 'clazz',
    },
    {
        title: '学号',
        key: 'studentId',
    },
    {
        title: 'QQ',
        key: 'QQ',
    },
    {
        title: '邮箱',
        key: 'email',
    },
    {
        title: '状态',
        key: 'state',
    },
]);
//表格操作事件

// 查看简历
const viewResume = (id: string) => {
    console.log(id,'查看简历');
}

// 编辑
const tableEdit = (id: string) => {
    console.log(id,'编辑');
}

// 安排面试
const arrangeInterview = (id: string) => {
    console.log(id,'安排面试');
}

// 淘汰
const eliminateCandidate = (id: string) => {
    console.log(id,'淘汰');
}

// 删除候选人
const DeleteCandidate = (id: string) => {
    console.log(id,'删除候选人');
}


const actionItems = ref([
    {
        title: '查看简历',
        icon: 'tabler:eye',
        onclick: viewResume,
    },
    {
        title: '编辑',
        icon: 'tabler:pencil',
        onclick: tableEdit,
    },
    {
        title: '安排面试',
        icon: 'tabler:calendar-check',
        onclick: arrangeInterview,
    },
    {
        title: '淘汰',
        icon: 'tabler:cross',
        onclick: eliminateCandidate,
    },
    {
        title: '删除候选人',
        icon: 'tabler:trash',
        onclick: DeleteCandidate,
    },
]);

watchEffect(()=>{
    getAllApplyUser({ pageNo: pageNo.value, pageSize: 10, condition:searchValue.value, status: status.value  })
  .then(( {data,error,loading } ) => {
        console.log(data,error,loading);
        getApplyUserData.value = data.value as IResponseDataApplyUser;
        total.value = getApplyUserData.value.data.total;
        console.log(getApplyUserData.value.data);
        if (getApplyUserData.value && getApplyUserData.value.data && getApplyUserData.value.data.data) {
            tableData.value = getApplyUserData.value.data.data.map((item: IAllApplyUserDTO) => {
                return {
                    id: item.id.toString(),
                    name: item.name,
                    session: item.grade,
                    gender: item.sex,
                    clazz: item.clazz,
                    studentId: item.studentId,
                    QQ: item.qqNumber,
                    email: item.email,
                    state:interviewStatusMap[item.status],
                };
            });
        } else {
            tableData.value = [];
        }

})
})

</script>

<template>
    <div class="content">
        <div class="filter-items">
            <FilterCondition :items-obj-arr="candidates_itemsObjArr" @filter_condition="handleFilterCondition"></FilterCondition>
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
                placeholderText ="搜索候选人："
                />
            </div>
        </div>
        <div class="toggle-handle">
            <ToggleShow :toggleItems="toggleItems" @transferToggleShowStatus="handleToggleShowStatus"></ToggleShow>

            <div class="handle-btns">
                <Button type="primary" class="btn-style">安排面试</Button>
                <Button type="primary" class="btn-style">修改状态</Button>
                <Button type="primary" class="btn-style">结果导出</Button>
            </div>
        </div>

        <div class="data-table">
            <DataTable :items="tableData" :headers="headers" :actionItems="actionItems"></DataTable>
            <div class="pagination-container">
                <Pagination
                :totalItems="total"
                :pageSize="pageSize"
                @update:page="changePage"
                >
            </Pagination>
            </div>
        </div>
    </div>

</template>

<style lang="scss" scoped>
@use "@/assets/styles/recruitment.scss";
</style>