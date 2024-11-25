<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-vue-next'
import Alert from './Alert.vue'
import ForgotPassword from './ForgotPassword.vue'
import UseLogin from '@/composables/UseLogin'
import { reactive, ref } from 'vue'

const account = ref('')
const password = ref('')
const { data, error, loading, getLogin } = UseLogin()
</script>

<template>
    <Card class="mx-auto max-w-sm">
        <CardHeader>
            <CardTitle class="text-2xl">
                登录
            </CardTitle>
            <CardDescription>
                在下方输入学号或邮箱以登录账户
            </CardDescription>
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
</template>