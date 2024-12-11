<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { useRequest } from "@/composables/useRequest";
import { useAlert } from "@/composables/useAlert";
import { Icon } from "@iconify/vue";
import { ref, watch } from "vue";
import { useRequest } from "vue-request";
import { z } from "zod";
import { addMember } from "../../composables/useContacts";
// 定义input样式
const inputContainerStyle = "grid grid-cols-6 grod-rows-2 items-center gap-1";
const { showAlert } = useAlert();
const props = defineProps<{
  group: string;
  grade: string;
  updateData: Function;
}>();
const group = ref(props.group);
const grade = ref(props.grade);
const userInfo = ref<addUser>({
  clazz: "计科xxx",
  grade: grade.value,
  group: group.value,
  name: "",
  studyId: "",
  qq: "",
  phone: "",
  sex: "男",
  email: "",
});
interface addUser {
  clazz: string;
  grade: string;
  group: string;
  name: "";
  studyId: "";
  qq: "";
  phone: "";
  sex: string;
  email: "";
}
const dialogVisible = ref(false); // 创建响应式变量控制 Dialog 组件的显示，初始化为打开状态，可按需调整
const dialogRef = ref<InstanceType<typeof Dialog> | null>(null); // 创建组件引用，初始化为 null

const errors = ref<{ [key: string]: string }>({}); //存储错误信息
const handleDialogOpen = (newValue: boolean) => {
  dialogVisible.value = newValue;
  if (newValue == false) {
    errors.value = {};
  }
};
const { data, run, loading } = useRequest(addMember, { manual: true });
// 定义表单验证格式
const formSchema = z.object({
  name: z.string().min(2, { message: "名字至少需要2个字符" }),
  studyId: z
    .string()
    .min(1, { message: "学号格式错误" })
    .max(5, { message: "学号格式错误" }),
  email: z.string().email({ message: "邮箱格式错误" }),
  clazz: z.string().superRefine((value, ctx) => {
    const match = value.match(/^[\u4e00-\u9fa5]{2}[a-zA-Z0-9]{3}$/);
    if (!match) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "格式错误",
        path: [],
      });
    }
  }),
});
// 定义用于pick方法的类型别名

// 存储验证错误信息的响应式对象

// 实时验证单个字段的函数
// const validateField = (field: string) => {
//   const fieldValue = userInfo.value[field as keyof addUser];
//   const pickObj = { field: true } as const; // 使用 as const 确保类型是确切的
//   const result = formSchema.pick(pickObj).safeParse({ [field]: fieldValue });
//   if (!result.success) {
//     const validationErrors: { [key: string]: string } = {};
//     result.error.issues.forEach((issue) => {
//       validationErrors[issue.path[0]] = issue.message;
//     });
//     errors.value[field] = validationErrors[field];
//   } else {
//     delete errors.value[field];
//   }
// };

const handleConfirm = () => {
  // 这里可以添加其他逻辑，比如保存输入框中的数据等操作
  const result = formSchema.safeParse(userInfo.value);
  if (!result.success) {
    const validationErrors: { [key: string]: string } = {};
    result.error.issues.forEach((issue) => {
      validationErrors[issue.path[0]] = issue.message;
    });
    errors.value = validationErrors;
    return;
  } else {
    let addInfoObj = { ...userInfo.value };
    console.log(addInfoObj);
    run(addInfoObj);
    // 关闭对话框
    dialogVisible.value = false;
    if (dialogRef.value) {
      dialogRef.value.$emit("update:open", false); // 触发 'update:open' 事件通知 Dialog 组件更新状态
    }
    errors.value = {};
  }
};
watch(
  () => data.value,
  () => {
    if (data.value) {
      if ((data.value as any).code == 200) {
        showAlert("添加成功", "pass");
        props.updateData(grade.value, group.value);
      }
    }
  },
);
</script>

<template>
  <Dialog :open="dialogVisible" @update:open="handleDialogOpen">
    <slot></slot>

    <DialogContent class="sm:max-w-[425px] bg-white">
      <DialogHeader> 成员信息 </DialogHeader>
      <div class="grid gap-4 py-4">
        <div :class="inputContainerStyle">
          <Label for="name" class="text-center"> 姓名 :</Label>
          <Input
            id="name"
            class="col-span-4 focus:outline-none"
            :error="errors.name ? true : false"
            v-model="userInfo.name"
            placeholder="请输入姓名"
            @input="
              () => {
                const parseResult = formSchema.pick({ name: true }).safeParse({
                  name: userInfo.name,
                });
                if (parseResult.error) {
                  errors.name = parseResult.error.format().name
                    ? parseResult.error.format()._errors.join(', ')
                    : '';
                }
                // else {
                //   errors.name = '';
                // }
              }
            "
          />
          <div class="grid grid-cols-subgrid gap-4 col-span-3">
            <div class="col-start-2 error flex" v-if="errors.name">
              <Icon icon="material-symbols:error-outline" /> {{ errors.name }}
            </div>
          </div>
        </div>
        <div :class="inputContainerStyle">
          <Label for="username" class="text-center"> 学号 : </Label>
          <Input
            id="username"
            class="col-span-4"
            v-model="userInfo.studyId"
            placeholder="请输入学号"
            :error="errors.studyId ? true : false"
            @input="
              () => {
                const parseResult = formSchema
                  .pick({ studyId: true })
                  .safeParse({
                    studyId: userInfo.studyId,
                  });
                if (parseResult.error) {
                  errors.studyId = parseResult.error.format().studyId
                    ? parseResult.error.format()._errors.join(', ')
                    : '';
                }
              }
            "
          />
          <div class="grid grid-cols-subgrid gap-4 col-span-3">
            <div class="col-start-2 error flex" v-if="errors.studyId">
              <Icon icon="material-symbols:error-outline" />
              {{ errors.studyId }}
            </div>
          </div>
        </div>
        <div class="grid grid-cols-6 items-center gap-5">
          <Label for="sex" class="text-right"> 性别 :</Label>
          <RadioGroup class="flex" v-model="userInfo.sex">
            <div class="flex items-center space-x-2">
              <RadioGroupItem id="r1" value="男" />
              <Label for="r1">男</Label>
            </div>
            <div class="flex items-center space-x-2">
              <RadioGroupItem id="r2" value="女" />
              <Label for="r2">女</Label>
            </div>
          </RadioGroup>
        </div>
        <div :class="inputContainerStyle">
          <Label for="username" class="text-center"> 邮箱 : </Label>
          <Input
            default-value="@peduarte"
            class="col-span-4"
            v-model="userInfo.email"
            :error="errors.email ? true : false"
            @input="
              () => {
                const parseResult = formSchema.pick({ email: true }).safeParse({
                  email: userInfo.email,
                });
                if (parseResult.error) {
                  errors.email = parseResult.error.format().email
                    ? parseResult.error.format()._errors.join(', ')
                    : '';
                }
              }
            "
          />
          <div class="grid grid-cols-subgrid gap-4 col-span-3">
            <div class="col-start-2 error flex" v-if="errors.email">
              <Icon icon="material-symbols:error-outline" /> {{ errors.email }}
            </div>
          </div>
        </div>
        <div :class="inputContainerStyle">
          <Label for="username" class="text-center"> QQ : </Label>
          <Input
            default-value="@peduarte"
            class="col-span-4"
            v-model="userInfo.qq"
          />
        </div>
        <div :class="inputContainerStyle">
          <Label for="username" class="text-right"> 电话 : </Label>
          <Input
            default-value="@peduarte"
            class="col-span-4"
            v-model="userInfo.phone"
          />
        </div>
        <div :class="inputContainerStyle">
          <Label for="username" class="text-right"> 班级 : </Label>
          <Input
            default-value="计科XXX"
            class="col-span-4"
            v-model="userInfo.clazz"
          />
        </div>
      </div>
      <DialogFooter>
        <Button @click="handleConfirm"> 确定 </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<style lang="scss" scoped>
input,
.select-text {
  color: var(--secondary-foreground);
}
.memberInfo-header {
  .info-id {
    font-size: 12px;
    color: var(--secondary-foreground);
  }
}
.error {
  color: var(--destructive-foreground);
  display: flex;
  align-items: center;
  width: max-content;
  font-size: 11px;
}
.errorInput {
  &:focus {
    outline: none;
  }
}
</style>
