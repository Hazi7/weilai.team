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
import { onMounted, onUnmounted } from 'vue'
import { useAlert } from '../../composables/alert'
// import { error } from 'node_modules/handsontable/helpers'

const { showAlert } = useAlert();
const account = ref<string>('')
const password = ref<string>('')
const { loading, getLogin } = UseLogin()

// 防抖处理的提交方法
const submitForm = debounce(() => {
    getLogin(account.value, password.value)
    // 在这里处理实际的表单提交逻辑，例如发送请求
}, 500); // 设置防抖时间为 500ms

// 控制动画显示的状态
const isVisible = ref(false)
const noId = ref(false)
const noPassWord = ref(false)
// 监听点击事件，触发动画
const handleClick = (event: MouseEvent) => {
    console.log('页面被点击了');
    if (!isVisible.value) {
        isVisible.value = true
    }
};
onMounted(() => {
    document.addEventListener('click', handleClick);
});
onUnmounted(() => {
    document.removeEventListener('click', handleClick);
});

function sendLogin() {
    if (account.value && password.value) {
        submitForm()
    } else if (!account.value) {
        showAlert('请输入账户！', 'waring')
        noId.value = true
    } else if (!password.value) {
        showAlert('请输入密码！', 'waring')
        noPassWord.value = true
    }
}
</script>

<template>
    <div class="loginOut" :class="{ 'animate-fadeIn': isVisible }">
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
                        <Input class="formInput" :class="{ 'noWrite': noId }" @click="noId = false" id="stuId"
                            placeholder="请输入学号或邮箱" required v-model="account" />
                    </div>
                    <div class="grid gap-2">
                        <div class="flex items-center justify-between">
                            <Label class="inputTitle" for="password">密码</Label>
                        </div>
                        <Input class="formInput" :class="{ 'noWrite': noPassWord }" @click="noPassWord = false"
                            id="password" type="password" placeholder="请输入密码" required v-model="password" />
                    </div>
                    <div class="forgotPass grid gap-2">
                        <div class="flex items-center justify-end">
                            <ForgotPassword></ForgotPassword>
                        </div>
                    </div>

                    <Button type="submit" class="loginButton w-full" @click="sendLogin" v-if="!loading">
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
    animation: fadeIn 2s linear forwards;
    animation-delay: 2.4s;

    .loginTitle {
        text-align: center;
        font-size: 34px;
        margin: 15px 0 10px 0;
    }

    .inputTitle {
        font-size: 16px;
        margin: 15px 0 8px 0;
    }

    .forgotPass {
        position: relative;
        top: -15px;
    }

    .loginButton {
        margin-bottom: 40px;
        height: 40px;
        font-size: 16px;
        border: none;
        box-shadow: none;
        border-radius: 20px;
        background-color: #e1f2fd;
    }

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
            margin: 10px 0 6px 0;
        }

        .formInput {
            height: 36px;
            font-size: 12px;
        }

        .loginButton {
            height: 35px;
            font-size: 14px;
            margin-bottom: 30px;
        }
    }
}

@media screen and (max-width: 1200px) {
    .loginOut {
        width: 300px;
    }

    .loginContent {
        margin-top: 70px;

        .loginTitle {
            text-align: center;
            font-size: 28px;
            margin: 8px 0 5px 0;
        }

        .inputTitle {
            font-size: 13px;
            margin: 2px 0 5px 0;
        }

        .formInput {
            height: 32px;
            font-size: 10px;
        }

        .loginButton {
            height: 30px;
            font-size: 13px;
            margin-bottom: 15px;
        }
    }
}

@media screen and (min-width: 1024px) {}

@media screen and (max-width: 500px) {
    .loginOut {
        width: 100%;
        margin: 0;
    }

    .loginContent {
        background: none;
        margin-top: 90px;
        border: none;
        box-shadow: none;

        .loginTitle {
            // display: none;
            width: 70px;
            text-align: start;
            font-size: 32px;
            margin: 8px 0 5px 0;
            padding: 2px 3px;
            border-bottom: #5abaf9 3px solid;
        }

        .inputTitle {
            display: none;
            font-size: 18px;
            margin: 2px 0 5px 0;
        }

        .formInput {
            height: 60px;
            font-size: 20px;
            border-radius: 40px;
            padding: 0 20px;
            margin: 10px 0;
        }

        .loginButton {
            height: 50px;
            font-size: 24px;
            border-radius: 25px;
            margin-bottom: 15px;
        }
    }
}
</style>
