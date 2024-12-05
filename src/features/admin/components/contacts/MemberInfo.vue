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
import type { TeamUserList } from "@/types/Contacts";
import { ref, watch } from "vue";
import { getMemberInfo } from "../../composables/useContacts";
console.log(11);
const userInfo = ref<TeamUserList>({
  clazz: "",
  grade: "",
  group: "",
  id: 0,
  name: "",
  studyId: "",
  ladleUserId: 0,
  ladleName: "",
  ladleGrade: "",
});
// const userInfo = ref<TeamUserList>();
const props = defineProps<{ userId?: number }>();
console.log(props);
watch(
  () => props.userId,
  (newVal) => {
    console.log("id信息改变");
    if (newVal) {
      getMemberInfo(newVal).then((res) => {
        userInfo.value = (res as TeamUserList) || "";
      });
    }
  },
  { deep: true, immediate: true },
);
</script>

<template>
  <Dialog>
    <!-- <Button variant="outline"> Edit Profile </Button> -->
    <slot></slot>

    <DialogContent class="sm:max-w-[425px] bg-white">
      <DialogHeader>
        <span>{{ userInfo?.name }}(用户ID:{{ userInfo.id }})</span>
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
          <Input
            id="username"
            default-value="@peduarte"
            class="col-span-4"
            v-model="userInfo.group"
          />
        </div>
        <div class="grid grid-cols-6 items-center gap-5">
          <Label for="username" class="text-right"> 组长 : </Label>
          <Input
            id="username"
            class="col-span-4"
            v-model="userInfo.ladleName"
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit"> 确定 </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<style lang="scss" scoped>
input {
  color: var(--secondary-foreground);
}
</style>
