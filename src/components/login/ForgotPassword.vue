<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import GetPin from './GetPin.vue'
import UseLogin from '@/composables/UseLogin'
import { ref } from 'vue'

const email = ref('')
const code = ref('')
const password = ref('')
const passwordAgin = ref('')
const { useGetCode, useResetPassword } = UseLogin()
</script>

<template>
    <Dialog>
        <DialogTrigger as-child>
            <Button variant="outline" style="border: none;">
                忘记密码
            </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>找回密码</DialogTitle>
                <DialogDescription>
                    忘记密码？输入邮箱找回密码吧。
                </DialogDescription>
            </DialogHeader>
            <div class="grid gap-4 py-4">
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="name" class="text-right">
                        邮箱
                    </Label>
                    <Input id="name" type="email" placeholder="请输入邮箱" class="col-span-3" v-model="email" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="username" class="text-right">
                        验证码
                    </Label>
                    <div class="flex w-full max-w-sm items-center gap-1.5">
                        <Input id="code" placeholder="请输入验证码" style="width: 170px;" v-model="code" />
                        <Button type="submit" @click="useGetCode(email)">
                            获取验证码
                        </Button>
                    </div>
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="username" class="text-right">
                        密码
                    </Label>
                    <Input id="password" type="password" placeholder="请输入密码" class="col-span-3"
                        v-model="passwordAgin" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="username" class="text-right">
                        确认密码
                    </Label>
                    <Input id="password" type="password" placeholder="请再次输入密码" class="col-span-3" v-model="password" />
                </div>
            </div>
            <DialogFooter>
                <Button type="submit" @click="useResetPassword(email, code, password, passwordAgin)">
                    确认
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
<style>
#radix-vue-dialog-content-v-0{
    background-color: #fff;
}
</style>