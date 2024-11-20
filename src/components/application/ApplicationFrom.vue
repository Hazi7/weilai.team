<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import ComboBox from './ComboBox.vue'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import UseApplication from '@/composables/UseApplication'
import { reactive, ref } from 'vue'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'


interface Framework {
    value: string,
    item: string
}
const frameworks: Framework[] = []
const { getClass, classListData, getCode, sentStuInfo } = UseApplication()
getClass().then(res => {
    const classList = classListData.value
    classList.forEach((element, item) => {
        frameworks.push({ index: item, value: element })
    });
})

const stuInform = reactive({
    name: '',
    clazz: '',
    studentId: '',
    sex: '',
    qqNumber: '',
    email: '',
    code: '',
    file: File
})

function handleFileChange(event: any) {
    const file = event.target.files[0]
    if(file){
        convertToBinary(file)
    }
}

function convertToBinary (file: File){
    const reader = new FileReader()
    reader.onload = (e) => {
        const binaryData = e.target?.result
        stuInform.file = new Blob([binaryData])
    }
    reader.readAsArrayBuffer(file)
}
</script>

<template>
    <div class="recruitment-form">
        <Card class="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle class="text-xl">
                    立即报名
                </CardTitle>
                <CardDescription>
                    请输入您的信息填写报名表
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div class="grid gap-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div class="grid gap-2">
                            <Label for="first-name">姓名</Label>
                            <Input id="first-name" placeholder="姓名" required v-model="stuInform.name" />
                        </div>
                        <div class="grid gap-2">
                            <Label for="last-name">班级</Label>
                            <Select v-model="stuInform.clazz">
                                <SelectTrigger id=" category" aria-label="Select category">
                                    <SelectValue placeholder="请选择班级" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem v-for="framework in frameworks" :key="framework.index"
                                        :value="framework.value">{{ framework.value }}</SelectItem>
                                </SelectContent>
                            </Select>
                            <!-- <Input id="last-name" placeholder="班级" required /> -->
                            <!-- <ComboBox v-model="stuInform.clazz" @change="handleSelectionChange"></ComboBox> -->
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <Label for="sex">性别</Label>
                        <RadioGroup default-value="option-one" style="display: flex;" v-model="stuInform.sex">
                            <div class="flex items-center space-x-2">
                                <RadioGroupItem id="option-one" value="男" />
                                <Label for="男">男</Label>
                            </div>
                            <div class="flex items-center space-x-2">
                                <RadioGroupItem id="option-two" value="女" />
                                <Label for="女">女</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div class="grid gap-2">
                        <Label for="student-id">学号</Label>
                        <Input id="student-id" placeholder="学号" required v-model="stuInform.studentId" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="qq-num">QQ</Label>
                        <Input id="qq-num" placeholder="QQ" v-model="stuInform.qqNumber" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="email">邮箱</Label>
                        <Input id="email" type="email" v-model="stuInform.email" placeholder="邮箱" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="email">验证码</Label>
                        <div class="flex w-full max-w-sm items-center gap-1.5">
                            <Input id="code" placeholder="请输入验证码" v-model="stuInform.code" />
                            <Button type="submit" @click="getCode(stuInform.email)">
                                获取验证码
                            </Button>
                        </div>
                    </div>
                    <div class="grid gap-2">
                        <div class="grid w-full max-w-sm items-center gap-1.5">
                            <Label for="tabular">报名表</Label>
                            <Input id="picture" type="file" accept=".doc,.docx" multiple
                            @change="handleFileChange" />
                        </div>
                        <!-- <input type="file" accept=".doc,.docx" multiple></input> -->
                    </div>
                    <Button type="submit" class="w-full" @click="sentStuInfo(Object.assign({}, stuInform))">
                        提交
                    </Button>
                </div>
            </CardContent>
        </Card>
    </div>
</template>
<style scoped>
.recruitment-form {
    margin-top: 50px;
}
</style>