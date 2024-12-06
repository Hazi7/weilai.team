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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { TeamUserList } from "@/types/Contacts";
import { ref, watch } from "vue";
import { getMemberInfo, updateInfo } from "../../composables/useContacts";
const group = ref("");
const groupNums = {
  "1": "一组",
  "2": "二组",
  "3": "三组",
  "4": "四组",
  "5": "五组",
  "6": "六组",
  "7": "七组",
  "8": "八组",
  "9": "九组",
  "10": "十组",
  "11": "十一组",
  "12": "十二组",
  "13": "十三组",
};

const handleDialog = (newValue: boolean) => {
  dialogVisible.value = newValue;
};
const userInfo = ref<TeamUserList>({
  clazz: "",
  grade: "",
  group: "",
  id: 0,
  name: "",
  studyId: "",
  allGroup: [],
  ladleUserId: 0,
  ladleName: "",
  ladleGrade: "",
});
watch(group, (newVal) => {});
const props = defineProps<{ userId?: number; sendUpdateInfo: Function }>();

watch(
  () => props.userId,
  (newVal) => {
    if (newVal) {
      getMemberInfo(newVal).then((res) => {
        console.log(res);

        userInfo.value = (res as TeamUserList) || "";
      });
    }
  },
  { deep: true, immediate: true },
);

function updateMemberInfo() {
  let updataInfo = {
    clazz: userInfo.value.clazz,
    grade: userInfo.value.grade,
    group: userInfo.value.group,
    id: userInfo.value.id,
    name: userInfo.value.name,
    studyId: userInfo.value.studyId,
  };
}
const showDialog = ref(false);
// 定义 EmitType 为 DialogRootEmits 类型，方便后续使用

const dialogVisible = ref(false); // 创建响应式变量控制 Dialog 组件的显示，初始化为打开状态，可按需调整

const dialogRef = ref<InstanceType<typeof Dialog> | null>(null); // 创建组件引用，初始化为 null

const handleDialogOpen = (newValue: boolean) => {
  dialogVisible.value = newValue;
};

const handleConfirm = () => {
  // 这里可以添加其他逻辑，比如保存输入框中的数据等操作
  let updateInfoObj = {
    name: userInfo.value.name,
    group: userInfo.value.group,
    grade: userInfo.value.grade,
    clazz: userInfo.value.clazz,
    studyId: userInfo.value.studyId,
    id: userInfo.value.id,
  };
  updateInfo(updateInfoObj).then((res) => {
    console.log(res);
    if (res.code == 200) {
      props.sendUpdateInfo(updateInfoObj);
    }
  });
  // 关闭对话框
  dialogVisible.value = false;
  if (dialogRef.value) {
    dialogRef.value.$emit("update:open", false); // 触发 'update:open' 事件通知 Dialog 组件更新状态
  }
};
</script>

<template>
  <Dialog :open="dialogVisible" @update:open="handleDialogOpen">
    <slot></slot>

    <DialogContent class="sm:max-w-[425px] bg-white">
      <DialogHeader>
        <span class="memberInfo-header"
          >{{ userInfo?.name }}
          <span class="info-id">( 组长:{{ userInfo.ladleName }})</span>
        </span>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-6 items-center gap-5">
          <Label for="name" class="text-right"> 姓名 :</Label>
          <Input id="name" class="col-span-4" v-model="userInfo.name" />
        </div>
        <div class="grid grid-cols-6 items-center gap-5">
          <Label for="username" class="text-right"> 学号 : </Label>
          <Input
            id="username"
            default-value="@peduarte"
            class="col-span-4"
            v-model="userInfo.studyId"
          />
        </div>
        <div class="grid grid-cols-6 items-center gap-5">
          <Label for="username" class="text-right"> 组织 : </Label>
          <Select v-model="userInfo.group">
            <SelectTrigger class="w-[250px]">
              <SelectValue placeholder="选择组织" class="select-text" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  :value="item + ''"
                  v-for="(item, index) in userInfo.allGroup"
                >
                  {{
                    groupNums[(item + "") as keyof typeof groupNums] ||
                    "选择组织"
                  }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <!-- <div class="grid grid-cols-6 items-center gap-5">
          <Label for="username" class="text-right"> 组长 : </Label>
          <Input
            id="username"
            class="col-span-4"
            v-model="userInfo.ladleName"
          />
        </div> -->
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
</style>
