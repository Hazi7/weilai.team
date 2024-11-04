<script setup lang="ts">
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle, } from '@/components/ui/card';
</script>

<template>

    <Card class="Card">
    <CardHeader>
      <CardTitle>组件的基本导入使用</CardTitle>
      <CardDescription>卡片组件的描述</CardDescription>
    </CardHeader>
    <CardContent>
    卡片组件的内容填充区
    </CardContent>
    <CardFooter>
     卡片组件的表尾
        <Button class="absolute left-4">Button</Button>
    </CardFooter>
  </Card>
</template>

<style lang="scss" scoped>
.Card{
    width: 300px;
    height: 300px;
    background-color: #fff;
    margin: auto;
    border-radius: 10px;
}
</style>