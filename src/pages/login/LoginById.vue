<script setup lang="ts">

</script>
<template>
    <div class="grid gap-4">
        <div class="grid gap-2">
            <Label for="stuId">ID</Label>
            <Input id="stuId" placeholder="ID" required />
        </div>
        <div class="grid gap-2">
            <div class="flex items-center">
                <Label for="password">Password</Label>
                <!-- <a href="#" class="ml-auto inline-block text-sm underline">
                            忘记密码？
                        </a> -->
                <ForgotPassword></ForgotPassword>
            </div>
            <Input id="password" type="password" required />
        </div>
        <Button type="submit" class="w-full">
            登录
        </Button>
        <router-link to="">
            <Button variant="outline" class="w-full">
                邮箱登录
            </Button>
        </router-link>
    </div>
</template>

<style scoped></style>