<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
</script>

<template>
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
                        <Input id="first-name" placeholder="姓名" required />
                    </div>
                    <div class="grid gap-2">
                        <Label for="last-name">班级</Label>
                        <Input id="last-name" placeholder="班级" required />
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <Label for="sex">性别</Label>
                    <RadioGroup default-value="option-one">
                        <div class="flex items-center space-x-2">
                            <RadioGroupItem id="option-one" value="option-one" />
                            <Label for="option-one">男</Label>
                        </div>
                        <div class="flex items-center space-x-2">
                            <RadioGroupItem id="option-two" value="option-two" />
                            <Label for="option-two">女</Label>
                        </div>
                    </RadioGroup>
                </div>
                <div class="grid gap-2">
                    <Label for="student-id">学号</Label>
                    <Input id="student-id" placeholder="学号" required />
                </div>
                <div class="grid gap-2">
                    <Label for="qq-num">QQ</Label>
                    <Input id="qq-num" placeholder="QQ" />
                </div>
                <div class="grid gap-2">
                    <Label for="email">邮箱</Label>
                    <Input id="email" type="email" placeholder="邮箱" />
                </div>
                <div class="grid gap-2">
                    <Label for="tabular">报名表</Label>
                    <input type="file" accept=".doc,.docx" multiple></input>
                </div>
                <Button type="submit" class="w-full">
                    提交
                </Button>
            </div>
        </CardContent>
    </Card>
</template>