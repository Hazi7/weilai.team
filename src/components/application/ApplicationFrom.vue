<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import ComboBox from './ComboBox.vue'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import UseApplication from '@/composables/UseApplication'
import { applicationStore } from '@/store/applicationStore'
import { reactive, ref } from 'vue'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useAlert } from '@/composables/alert'

const useApplicationStore = applicationStore()
useApplicationStore.isGetCode()
const { showAlert } = useAlert()

interface Data {
    data: ApplicationFrom;
}

interface ApplicationFrom {
    clazz: string;
    code: string;
    email: string;
    name: string;
    qqNumber: string;
    sex: string;
    studentId: string;
    file: File;
}
interface Framework {
    value: string,
    item: string
}
const frameworks: Framework[] = []
const { getClass, classListData, getCode, sentStuInfo } = UseApplication()
getClass()

const stuInform = ref<ApplicationFrom>({
    clazz: '计科241',
    code: '',
    email: '',
    name: '',
    qqNumber: '',
    sex: '男',
    studentId: '',
    file: null as unknown as File
})

function handleFileChange(event: any) {
    const file = event.target.files[0]
    if (file) {
        convertToBinary(file)
    }
}

function convertToBinary(file: File) {
    const reader = new FileReader()
    reader.onload = (e) => {
        const binaryData = e.target?.result
        if (binaryData) {
            // stuInform.value.file = e.target.result;
            const newFile = new File([binaryData], file.name, { type: file.type });
            stuInform.value.file = newFile;
        } else {
            console.error('Failed to read file as binary data')
        }
    }
    reader.readAsArrayBuffer(file)
}

const appStore = applicationStore()

const applicationGetCode = (email: string) => {
    getCode(email).then((res) => {
        console.log(res);
    })
}

function submitForm() {
    console.log(stuInform);
    // const infoInput = document.getElementsByTagName("input");
    // for (let i = 0; i < infoInput.length; i++) {
    //     if (infoInput[i].value === "") {
    //         infoInput[i].className += ' noWrite'
    //     }
    // }
    // stuInform.forEach((input) => {
    // });

    let isValid = true;
    // 判断输入框是否为空，并添加 'noWrite' 类
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach((input) => {
        const element = input as HTMLInputElement;
        if (!element.value && element.type !== 'file') {
            element.classList.add('noWrite');
            isValid = false;
            element.addEventListener('focusin', function (event) {
                element.classList.remove('noWrite');
            })
        } else {
            element.classList.remove('noWrite');
        }
    });

    if (!isValid) {
        showAlert('请填写所有必填项', 'waring');
        return;
    }
    if (stuInform.value.file == null) {
        showAlert('请上传您的简介', 'waring');
        return;
    }
    const formData = new FormData();
    formData.append('clazz', stuInform.value.clazz);
    formData.append('code', stuInform.value.code);
    formData.append('email', stuInform.value.email);
    formData.append('name', stuInform.value.name);
    formData.append('qqNumber', stuInform.value.qqNumber);
    formData.append('sex', stuInform.value.sex);
    formData.append('studentId', stuInform.value.studentId);
    formData.append('file', stuInform.value.file);
    sentStuInfo(formData)
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
                                    <SelectItem v-for="item, index in classListData" :key="index" :value="item">{{ item
                                        }}</SelectItem>
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
                            <Button v-if="!appStore.isRequesting" type="submit"
                                @click="applicationGetCode(stuInform.email)">
                                获取验证码
                            </Button>
                            <Button v-if="appStore.isRequesting" disabled>
                                {{ useApplicationStore.countdown }}s后重新发送
                            </Button>
                        </div>
                    </div>
                    <div class="grid gap-2">
                        <div class="grid w-full max-w-sm items-center gap-1.5">
                            <Label for="tabular">报名表</Label>
                            <Input id="picture" type="file" accept=".docx" multiple @change="handleFileChange" />
                        </div>
                        <!-- <input type="file" accept=".doc,.docx" multiple></input> -->
                    </div>
                    <!-- <Button type="submit" class="w-full" @click="sentStuInfo(Object.assign({}, stuInform))"> -->
                    <Button type="submit" class="w-full" @click="submitForm">
                        提交
                    </Button>
                </div>
            </CardContent>
        </Card>
    </div>
</template>
<style scoped lang="scss">
.recruitment-form {
    margin-top: 50px;

    .noWrite {
        animation: slideIn 0.4s ease-in-out 1;
        border-color: rgb(255, 96, 96);
        background-color: #fbeceb;
    }
}

@keyframes slideIn {
    0% {
        transform: translateX(0);
    }

    25% {
        transform: translateX(-10px);
    }

    50% {
        transform: translateX(10px);
    }

    75% {
        transform: translateX(-10px);
    }

    100% {
        transform: translateX(0);
    }
}
</style>