<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/vue";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRequest } from "@/composables/useRequest";
import { cn } from "@/lib/utils";
import type { TeamUserList } from "@/types/Contacts";
import { Check, ChevronsUpDown } from "lucide-vue-next";
import { ref, watch } from "vue";
import {
  getMembersByGroupAndGrade,
  setLeader,
} from "../../composables/useContacts";
const leader = ref<TeamUserList>();
const { executeRequest, error, loading, data } = useRequest();
const frameworks = ref<TeamUserList[]>([]);
const open = ref(false);
const value = ref("");
const props = defineProps(["group", "grade"]);
const grade = ref(props.grade);
const group = ref(props.group);

watch(
  () => props,
  (newVal) => {
    console.log("传过来的数据变了", 1111);
    console.log(newVal);
    console.log(grade.value, group.value);
    grade.value = newVal.grade;
    group.value = newVal.group;
    getMembersByGroupAndGrade(grade.value, group.value).then((res) => {
      console.log(res);
      leader.value = res.userGroupLeader;
      frameworks.value = res.teamUserList;
    });
    value.value = "";
  },
  {
    immediate: true,
    deep: true,
  },
);

function setGroupLeader() {
  let info = {
    group: `${grade.value}` + "$" + `${group.value}`,
    userId: parseInt(value.value),
  };
  setLeader(info).then((res) => {
    console.log(res);
  });
}
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline" size="sm" class="h-7 gap-1 header-btn">
        <Icon icon="proicons:person-2" />
        <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
          设置组长
        </span>
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px] bg-white">
      <DialogHeader>
        <DialogTitle>设置组长</DialogTitle>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-6 items-center">
          <Label for="name" class="text-right w-[50px]"> 姓名 :</Label>
          <Popover v-model:open="open">
            <PopoverTrigger as-child class="bg-white">
              <Button
                variant="outline"
                role="combobox"
                :aria-expanded="open"
                class="w-[260px] justify-between"
              >
                {{
                  value
                    ? frameworks.find(
                        (framework) => framework.id.toString() === value,
                      )?.name
                    : "请选择组长"
                }}
                <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-[260px] p-0 bg-white">
              <Command>
                <CommandInput class="h-9" placeholder="请选择..." />
                <CommandEmpty>未找到结果</CommandEmpty>
                <CommandList>
                  <CommandGroup>
                    <CommandItem
                      v-for="framework in frameworks"
                      :key="framework.id"
                      :value="framework.id.toString()"
                      @select="
                        (ev) => {
                          if (typeof ev.detail.value === 'string') {
                            value = ev.detail.value;
                          }
                          open = false;
                        }
                      "
                    >
                      {{ framework.name }}
                      <Check
                        :class="
                          cn(
                            'ml-auto h-4 w-4',
                            value === framework.id.toString()
                              ? 'opacity-100'
                              : 'opacity-0',
                          )
                        "
                      />
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" @click="setGroupLeader()"> 确定</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<style lang="scss" scoped>
.header-btn {
  color: var(--primary-foreground);
  border: none;
  box-shadow: none;
}
</style>
