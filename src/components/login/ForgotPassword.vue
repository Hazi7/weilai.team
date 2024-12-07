<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useLogin from "@/composables/useLogin";
import { ref } from "vue";
import { useLoginStore } from "@/store/useLoginStore";
import { useAlert } from '../../composables/alert'

const { showAlert } = useAlert();
const email = ref("");
const code = ref("");
const password = ref("");
const passwordAgin = ref("");
const { useGetCode, useResetPassword } = useLogin();
const loginStore = useLoginStore();
const noEmail = ref(false);
const noCode = ref(false);
const noPassWord = ref(false);
const noPassWordAgin = ref(false);
loginStore.isGetCode();

const getCode = () => {
    if (!email.value) {
        showAlert("请输入邮箱", "waring");
        noEmail.value = true;
    } else {
        useGetCode(email.value);
    }
};

function sendForm() {
    console.log(password.value);
    if (!email.value) {
        showAlert("请输入邮箱", "waring");
        noEmail.value = true;
    } else if (!code.value) {
        showAlert("请输入验证码", "waring");
        noCode.value = true;
    } else if (!password.value) {
        showAlert("请输入密码", "waring");
        noPassWord.value = true;
    } else if (!passwordAgin.value) {
        showAlert("请再次输入密码", "waring");
        noPassWordAgin.value = true;
    } else {
        useResetPassword(email.value, code.value, password.value, passwordAgin.value)
    }
}

</script>

<template>
    <Dialog>
        <DialogTrigger as-child>
            <Button class="fontPassBtn" variant="outline" style="border: none;box-shadow: none;"> 忘记密码 ？ </Button>
        </DialogTrigger>
        <DialogContent class="max-w-full sm:max-w-[425px] md:max-w-[400px] lg:max-w-[380px] xl:max-w-[425px]">
            <DialogHeader>
                <DialogTitle class="fontPassTitle">找回密码</DialogTitle>
                <DialogDescription> 忘记密码？输入邮箱找回密码吧 </DialogDescription>
            </DialogHeader>
            <div class="grid gap-4 py-4">
                <div class="fontPassFormInp grid grid-cols-4 items-center gap-4">
                    <Label for="name" class="inpTit text-right"> 邮箱 </Label>
                    <Input id="name" type="email" :class="{ 'noWrite': noEmail }" @click="noEmail = false"
                        placeholder="请输入邮箱" class="col-span-3" v-model="email" />
                </div>
                <div class="fontPassFormInp grid grid-cols-4 items-center gap-4">
                    <Label for="username" class="inpTit text-right"> 验证码 </Label>
                    <div class="flex w-full max-w-sm items-center gap-1.5">
                        <Input id="code" placeholder="请输入验证码" :class="{ 'noWrite': noCode }" @click="noCode = false"
                            style="width: 170px" v-model="code" />
                        <Button class="fontBtn" v-if="!loginStore.isRequesting" @click="getCode()">
                            获取验证码
                        </Button>
                        <Button v-if="loginStore.isRequesting" disabled>{{ loginStore.countdown }}s后重新发送</Button>
                    </div>
                </div>
                <div class="fontPassFormInp grid grid-cols-4 items-center gap-4">
                    <Label for="username" class="inpTit text-right"> 密码 </Label>
                    <Input id="password" type="password" :class="{ 'noWrite': noPassWord }" @click="noPassWord = false"
                        placeholder="请输入密码" class="col-span-3" v-model="password" />
                </div>
                <div class="fontPassFormInp grid grid-cols-4 items-center gap-4">
                    <Label for="username" class="inpTit text-right"> 确认密码 </Label>
                    <Input id="password" type="password" :class="{ 'noWrite': noPassWordAgin }"
                        @click="noPassWordAgin = false" placeholder="请再次输入密码" class="col-span-3"
                        v-model="passwordAgin" />
                </div>
            </div>
            <DialogFooter>
                <Button class="fontBtn trueBtn" @click="sendForm()">
                    确认
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
<style scoped lang="scss">
#radix-vue-dialog-content-v-0 {
    background-color: #fff;
}

.fontPassBtn {
    color: #529ee0;
    cursor: pointer;
    background: none;

    &:hover {
        color: #79bcf6;
    }
}

.fontPassFormInp {
    position: relative;
    left: -15px;
    margin: 7px 0;
}

.fontPassTitle {
    font-size: 22px;
    margin-bottom: 5px;
}

.fontBtn {
    box-shadow: none;
}

.noWrite {
    animation: slideIn 0.4s ease-in-out 1;
    border-color: rgb(255, 96, 96);
    background-color: #fbeceb;
}

.trueBtn {
    width: 100px;
    margin: 0 20px 20px 0;
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

@media screen and (max-width: 1400px) {

    .inpTit {
        font-size: 14px;
    }
}

@media screen and (max-width: 1200px) {
    .inpTit {
        font-size: 13px;
    }
}

@media screen and (min-width: 1024px) {}

@media screen and (max-width: 756px) {
    .fontPassBtn {
        font-size: 18px;
    }
}

@media screen and (max-width: 500px) {}
</style>
