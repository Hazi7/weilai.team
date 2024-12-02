<script setup lang="ts">
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-vue-next'
import ForgotPassword from './ForgotPassword.vue'
import UseLogin from '../../composables/UseLogin'
import { ref } from 'vue'

const account = ref<string>('')
const password = ref<string>('')
const { loading, getLogin } = UseLogin()
</script>

<template>
    <div class="loginOut">
        <Card class="loginContent mx-auto max-w-sm">
            <CardHeader>
                <CardTitle class="text-2xl">
                    Login
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div class="grid gap-4">
                    <div class="grid gap-2">
                        <Label for="stuId">学号 / 邮箱</Label>
                        <Input id="stuId" placeholder="ID/Emile" required v-model="account" />
                    </div>
                    <div class="grid gap-2">
                        <div class="flex items-center">
                            <Label for="password">Password</Label>
                            <!-- <a href="#" class="ml-auto inline-block text-sm underline">
                            忘记密码？
                        </a> -->
                            <ForgotPassword></ForgotPassword>
                        </div>
                        <Input id="password" type="password" required v-model="password" />
                    </div>
                    <Button type="submit" class="w-full" @click="getLogin(account, password)" v-if="!loading">
                        登录
                    </Button>
                    <Button disabled v-if="loading">
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
    position: relative;
    top: 150px;
}

.loginContent {
    // position: absolute;
    // top: 50%;
    // left: 50%;
    // transform: translateX(50%);
    // transform: translateY(-50%);
    opacity: 0;
    transform: scale(0);
    animation: fadeIn 1.5s linear forwards;
    animation-delay: 1s;
}

@keyframes fadeIn {
    0% {
        opacity: 0;
        transform: scale(0);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
}
</style>