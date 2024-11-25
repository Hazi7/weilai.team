<template>
    <div class="mySchedule">

    </div>
</template>
<script setup>
import { useRequest } from '@/composables/useRequest'
const { data, error, loading, executeRequest } = useRequest()
import { useLocalStorageWithExpire } from '@/composables/useLocalStorage';
const { getLocalStorageWithExpire, setLocalStorageWithExpire } = useLocalStorageWithExpire()
import { useDateFormatter } from '@/composables/useDateFormatter'
const { formatDateToYYYYMMDD } = useDateFormatter()

// 获取userId
const userId = getLocalStorageWithExpire('userId')
async function getSchedule() {
    await executeRequest({ url: `/user/getUserCourse/${userId}` })
    if (data.value && data.value.code == 200) {
        
    }
    console.log('课表：',data.value);

}
//打开页面立刻调用一次获取文章
getSchedule()
</script>
<style lang="scss" scoped>
.mySchedule {
    margin-top: 20px;
    width: 100%;
    background-color: white;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 5px 5px 5px #ccc;
    
}
</style>