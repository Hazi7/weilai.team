<script setup lang="ts">
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-vue-next'
import ForgotPassword from './ForgotPassword.vue'
import UseLogin from '../../composables/UseLogin'
import { debounce } from "@community/composables/search";
import { ref } from 'vue'

const account = ref<string>('')
const password = ref<string>('')
const { loading, getLogin } = UseLogin()

// 防抖处理的提交方法
const submitForm = debounce(() => {
    console.log('登录提交');
    getLogin(account.value, password.value)
    // 在这里处理实际的表单提交逻辑，例如发送请求
}, 1000); // 设置防抖时间为 1000ms
</script>

<template>
    <div class="loginOut">
        <Card class="loginContent mx-auto max-w-sm">
            <CardHeader>
                <CardTitle class="loginTitle text-2xl">
                    登录
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div class="grid gap-4">
                    <div class="grid gap-2">
                        <Label class="inputTitle" for="stuId">账号</Label>
                        <Input class="formInput" id="stuId" placeholder="请输入学号或邮箱" required v-model="account" />
                    </div>
                    <div class="grid gap-2">
                        <div class="flex items-center justify-between">
                            <Label class="inputTitle" for="password">密码</Label>
                        </div>
                        <Input class="formInput" id="password" type="password" placeholder="请输入密码" required
                            v-model="password" />
                    </div>
                    <div class="forgotPass grid gap-2">
                        <div class="flex items-center justify-end">
                            <ForgotPassword></ForgotPassword>
                        </div>
                    </div>

                    <Button type="submit" class="loginButton w-full" @click="submitForm" v-if="!loading">
                        登录
                    </Button>
                    <Button class="loginButton" disabled v-if="loading">
                        <Loader2 class="w-4 h-4 mr-2 animate-spin" />
                        登录中...
                    </Button>
                </div>
            </CardContent>
        </Card>
    </div>
</template>

<style scoped lang="scss">
.loginOut {
    width: 400px;
}

.loginContent {
    margin-top: 80px;
    background-color: #ffffff;
    border: none;
    border-radius: 20px;
    opacity: 0;
    height: 0;
    overflow: hidden;
    // transform: scale(0);
    animation: fadeIn 2s linear forwards;
    animation-delay: 2.4s;

    .loginTitle {
        text-align: center;
        font-size: 34px;
        margin: 15px 0 10px 0;
    }

    .inputTitle {
        font-size: 16px;
        margin: 20px 0 8px 0;
    }

    .forgotPass {
        position: relative;
        top: -15px;
    }

    .loginButton {
        margin-bottom: 40px;
        border: none;
        box-shadow: none;
        border-radius: 20px;
        background-color: #e1f2fd;
    }
}

@keyframes fadeIn {
    0% {
        opacity: 0;
        height: 0%;
        // transform: scale(0);
    }

    100% {
        opacity: 1;
        height: 100%;
        // transform: scale(1);
    }
}

@keyframes fadeIn2 {
    0% {
        height: 0%;
    }

    100% {
        height: 100%;
    }
}

@media screen and (max-width: 1400px) {
    .loginOut {
        width: 350px;
    }

    .loginContent {
        margin-top: 80px;

        .loginTitle {
            text-align: center;
            font-size: 32px;
            margin: 12px 0 5px 0;
        }

        .inputTitle {
            font-size: 15px;
            margin: 5px 0 6px 0;
        }

        .formInput {
            font-size: 12px;
        }
    }
}

@media screen and (max-width: 1140px) {
    .loginOut {
        width: 320px;
    }

    .loginContent {
        margin-top: 70px;

        .loginTitle {
            text-align: center;
            font-size: 32px;
            margin: 12px 0 5px 0;
        }

        .inputTitle {
            font-size: 15px;
            margin: 5px 0 6px 0;
        }

        .formInput {
            font-size: 12px;
        }
    }
}

@media screen and (min-width: 768px) {}
</style>
