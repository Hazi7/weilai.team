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
import useLogin from "@/composables/useLoginAll";
import FontFrom from "./FontFrom.vue";
import * as z from "zod";
import { ref, reactive, onBeforeUnmount, watch } from "vue";
import { useRequest } from "@/composables/useRequest";
import useAppEditor from "@/features/post/composables/useAppEditor";
const { editor } = useAppEditor();

const { useGetCode, useResetPassword } = useLogin();

const fontData = reactive({
    email: "" as string | number | undefined,
    code: "" as string | number | undefined,
    password: "" as string | number | undefined,
    passwordAgin: "" as string | number | undefined,
})

interface FontErrors {
    email: string,
    code: string,
    password: string,
    passwordAgin: string
}

const filedErrors = ref<z.ZodFormattedError<FontErrors> | undefined>();
const { loading } = useRequest();

onBeforeUnmount(() => {
    editor.value?.destroy();
});

const fontSchema = z.object({
    email: z.string().email("请输入正确的邮箱"),
    code: z.string().min(1, "请输入验证码"),
    password: z.string().min(1, "请输入密码"),
    passwordAgin: z.string().min(1, "请再次输入密码"),
});

const fontPassSchema = fontSchema.refine(data => data.password === data.passwordAgin, {
    message: "密码和确认密码不一致",
    path: ["passwordAgin"], // 错误信息会被放到 passwordAgin 字段
})

const emailOnlySchema = fontSchema.pick({
    email: true,
});

const validateFont = () => {
    const result = fontPassSchema.safeParse({
        email: fontData.email,
        code: fontData.code,
        password: fontData.password,
        passwordAgin: fontData.passwordAgin,
    });
    if (!result.success) {
        filedErrors.value = result.error.format();
    }
    return result.success;
}


const validateCode = () => {
    const result = emailOnlySchema.safeParse({
        email: fontData.email
    });
    console.log(result.error);
    if (!result.success) {
        filedErrors.value = result.error.format();
    }
    return result.success;
}

const handleCode = async () => {
    if (!validateCode()) {
        return;
    }

    watch(
        () => loading,
        () => {
            console.log(loading);
        },
    );
    useGetCode(fontData.email);
};


const handleFont = async () => {
    if (!validateFont()) {
        return;
    }

    watch(
        () => loading,
        () => {
            console.log(loading);
        },
    );
    useResetPassword(fontData.email, fontData.code, fontData.password)
};

// const getCode = () => {
//     if (!email.value) {
//         showAlert("请输入邮箱", "waring");
//         noEmail.value = true;
//     } else {
//         useGetCode(email.value);
//     }
// };

// function sendForm() {
//     console.log(password.value);
//     if (!email.value) {
//         showAlert("请输入邮箱", "waring");
//         noEmail.value = true;
//     } else if (!code.value) {
//         showAlert("请输入验证码", "waring");
//         noCode.value = true;
//     } else if (!password.value) {
//         showAlert("请输入密码", "waring");
//         noPassWord.value = true;
//     } else if (!passwordAgin.value) {
//         showAlert("请再次输入密码", "waring");
//         noPassWordAgin.value = true;
//     } else {
//         useResetPassword(email.value, code.value, password.value, passwordAgin.value)
//     }
// }

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
            <!-- <div class="fontPassConcent grid gap-4 py-4">
                <div class="fontPassFormInp grid grid-cols-4 items-center gap-4">
                    <Label for="name" class="inpTit text-right"> 邮箱 </Label>
                    <Input id="name" type="email" placeholder="请输入邮箱" v-model="email" :class="{ 'noWrite': noEmail }"
                        class="col-span-3" @click="noEmail = false" />
                </div>
                <div class="fontPassFormInp grid grid-cols-4 items-center gap-4">
                    <Label for="username" class="inpTit text-right"> 验证码 </Label>
                    <div class="flex w-full max-w-sm items-center gap-1.5">
                        <Input id="code" placeholder="请输入验证码" :class="{ 'noWrite': noCode }" @click="noCode = false"
                            style="width: 170px" v-model="code" />
                        <Button class="fontBtn" v-if="!loginStore.isRequesting" @click="getCode()">
                            获取验证码
                        </Button>
                        <Button v-if="loginStore.isRequesting" disabled>已发送({{ loginStore.countdown }}s)</Button>
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
            </div> -->
            <FontFrom :editor="editor" :errors="filedErrors" :email="fontData.email" :code="fontData.code"
                :password="fontData.password" :passwordAgin="fontData.passwordAgin" :handle-code="handleCode"
                @update:font-email="(val: string | number | undefined) => {
                    fontData.email = val;
                    const result = fontSchema
                        .pick({ email: true })
                        .safeParse({
                            email: val,
                        });
                    if (filedErrors) {
                        filedErrors.email = result.error?.format().email;
                    }
                }" @update:font-code="(val: string | number | undefined) => {
                    fontData.code = val;
                    const result = fontSchema
                        .pick({ code: true })
                        .safeParse({
                            code: val,
                        });
                    if (filedErrors) {
                        filedErrors.code = result.error?.format().code;
                    }
                }" @update:font-password="(val: string | number | undefined) => {
                    fontData.password = val;
                    const result = fontSchema
                        .pick({ password: true })
                        .safeParse({
                            password: val,
                        });
                    if (filedErrors) {
                        filedErrors.password = result.error?.format().password;
                    }
                }" @update:font-password-agin="(val: string | number | undefined) => {
                    fontData.passwordAgin = val;
                    const result = fontSchema
                        .pick({ passwordAgin: true })
                        .safeParse({
                            passwordAgin: val,
                        });
                    if (filedErrors) {
                        filedErrors.passwordAgin = result.error?.format().passwordAgin;
                    }
                }
                    "></FontFrom>
            <DialogFooter class="fontBtnOut">
                <Button class="fontBtn trueBtn" @click="handleFont">
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

    .fontPassBtn {
        font-size: 14px;
    }
}

@media screen and (max-width: 1200px) {
    .inpTit {
        font-size: 13px;
    }

    .fontPassBtn {
        font-size: 12px;
    }
}

@media screen and (min-width: 1024px) {}

@media screen and (max-width: 756px) {
    .fontBtnOut {
        align-items: end;
    }

    .fontPassBtn {
        font-size: 18px;
    }
}

@media screen and (max-width: 400px) {
    .fontPassConcent {
        .fontPassFormInp {
            left: -32px;
        }
    }
}
</style>
