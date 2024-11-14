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
                    <Input id="name" type="email" value="Pedro Duarte" class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="username" class="text-right">
                        验证码
                    </Label>
                    <Input id="username" value="@peduarte" class="col-span-3" />
                    <!-- <GetPin /> -->
                    <Button>获取验证码</Button>
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="username" class="text-right">
                        密码
                    </Label>
                    <Input id="username" value="@peduarte" class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="username" class="text-right">
                        确认密码
                    </Label>
                    <Input id="username" value="@peduarte" class="col-span-3" />
                </div>
            </div>
            <DialogFooter>
                <Button type="submit">
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