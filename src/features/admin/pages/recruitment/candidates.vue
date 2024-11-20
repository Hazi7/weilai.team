<script setup lang="ts">
import { SearchInput } from '@/components/recruitment';
import { FilterCondition } from '@/components/recruitment';
import { DataRangePicker } from '@/components/recruitment';
import { Icon } from '@iconify/vue';
import { ToggleShow } from '@/components/recruitment';
import  {Button} from '@/components/ui/button';
import { ref, type ObjectDirective, } from 'vue';
import { DataTable } from '@/components/recruitment';
import { Pagination } from '@/components/recruitment';



const searchValue = ref('');

const handleInput = (value: string) => {
    searchValue.value = value;
    console.log(searchValue);
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

const message = ref('搜索候选人');

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
    const endDate =Reflect.get(dateRange.value, 'end');
    const formattedRange = `${startDate} - ${endDate}`;
    console.log(formattedRange);

};
//重置筛选条件
const resetCondition = () => {
  // 在这里处理重置条件的逻辑，例如清空输入框或其他组件的数据
  itemsObjArr.value.forEach((item) => {
    item.ref = 'init';
  });
  dateRange.value = null;
}


//切换框
const toggleItems= ref([
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

const data = ref([
    {
        id: "1",
        name: '张三',
        session: '24级',
        gender: '男',
        clazz: '计科233',
        studentId: '20230000001',
        QQ: '123456789',
        email: '123456789@qq.com',
        state: '待安排',
    },
    {
        id: "2",
        name: '李四',
        session: '24级',
        gender: '女',
       clazz:"计科233",
        studentId: '20230000001',
        QQ: '123456789',
        email: '123456789@qq.com',
        state: '待安排',
    },
    {
        id: "3",
        name: '王五',
        session: '24级',
        gender: '男',
       clazz:"计科233",
        studentId: '20230000001',
        QQ: '123456789',
        email: '123456789@qq.com',
        state: '待安排',
    },
    {
        id: "4",
        name: '赵六',
        session: '24级',
        gender: '女',
       clazz:"计科233",
        studentId: '20230000001',
        QQ: '123456789',
        email: '123456789@qq.com',
        state: '待安排',
    },
    {
        id: "5",
        name: '田七',
        session: '24级',
        gender: '男',
       clazz:"计科233",
        studentId: '20230000001',
        QQ: '123456789',
        email: '123456789@qq.com',
        state: '待安排',
    },
]);
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
</script>

<template>
    <div class="content">
        <div class="filter-items">
                <FilterCondition
                    :items-obj-arr="itemsObjArr"
                    @filter_condition="handleFilterCondition"
                    ></FilterCondition>
                <div class="date-picker">
                    <DataRangePicker
                    @updateDateRange="handleDateRangeUpdate"
                    :dateRange="dateRange"
                    />
                </div>

                <div class="reset"
                    @click="resetCondition">
                    重置<Icon icon="bitcoin-icons:cross-outline" />
                </div>
                    <!-- <p>输入的内容: {{ searchValue }}</p> -->
                    <div class="search-input">
                        <SearchInput
                        @input_src="handleInput"
                        style="width: 400px;height: 40px;"
                        :message="message"
                        >
                    </SearchInput>
                    </div>
        </div>
        <div class="toggle-handle">
            <ToggleShow :items="toggleItems"></ToggleShow>

            <div class="handle-btns">
                <Button type="primary" class="handle-btn arrangeResume">安排简历</Button>
                <Button type="primary" class="handle-btn" >修改状态</Button>
                <Button type="primary" class="handle-btn" >结果导出</Button>
            </div>
        </div>

        <div class="data-table">
            <DataTable :items="data" :headers="headers"></DataTable>
            <div class="pagination-container"  >
                <Pagination ></Pagination>
            </div>
        </div>
    </div>

</template>

<style lang="scss" scoped>
@use '@/assets/styles';
.content{
    padding: 20px;
    width: 100%;
    background-color:var(--background);
    position: relative;
    top: 60px;
}

.filter-items{
    width: 100%;
    display: inline-flex;
    height: 80px;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    gap: 20px;
    .search-input{
        position: absolute;
        right: 0;
    }
}
.reset{
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 14px;
    cursor: pointer;
}

.toggle-handle{
    width: 100%;
    height: 80px;
    position: relative;
    top: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    .toggle-button{
        width: 100px;
        height: 40px;
        background-color: var(--primary);
    }
   .handle-btns{
        position: absolute;
        right: 0;
        display: flex;
        gap: 20px;
       .handle-btn{
            width: 100px;
            height: 40px;
            background-color: var(--primary);
            cursor: pointer;
            border: var(--border) 1px solid ;
            &:hover,&:active{
            color: var(--primary-foreground);
            border: var(--primary-foreground) 1px solid;
            }
        }
    }
}
.data-table{
    width: 100%;
    height: auto;
    background-color: var(--background);
    position: relative;
    top: 80px;
}


</style>