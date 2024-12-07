<script lang="ts" setup>
import {  ref ,defineProps, watch,defineEmits} from 'vue';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const emit = defineEmits(["close"]);


const props = defineProps({
  visible: Boolean
});


const selectStatus = ref("");

const close = (event: Event) => {
  // 阻止冒泡
  event.stopPropagation();
  // 阻止默认事件
  event.preventDefault();
  console.log("close");
  // 点击遮罩层关闭
  if (event.target === event.currentTarget) {
    emit("close");
  }
  return;

};
</script>

<template>
  <div class="outer" v-if="props.visible"  @click="close($event)">

    <Form  class="form-container">
      <FormField name="status" control="selectStatus" class="bg-white">
        <div class="form-label">修改状态框</div>
        <FormItem class="form-item">

          <Select v-model="selectStatus" placeholder="请选择状态">
            <FormControl>
              <SelectTrigger>
                <SelectValue :value="selectStatus" class="outline" placeholder="请选择状态" />
              </SelectTrigger>
            </FormControl>
            <SelectContent class="select-content">
              <SelectItem  value="0" >待安排</SelectItem>
              <SelectItem  value="1">待面试</SelectItem>
              <SelectItem  value="2">已录取</SelectItem>
              <SelectItem  value="3">已淘汰</SelectItem>
            </SelectContent>
          </Select>
          <FormDescription class="form-description">请选择你想要修改的状态</FormDescription>
          <FormMessage />
        </FormItem>
      <Button type="submit" class="button btn-style w-[80%]">提交</Button>

    </FormField>
  </Form>

  </div>
</template>


<style lang="scss" scoped>

@use "@/assets/styles/recruitment.scss";

.form-container{
  position: relative;
  background-color: aliceblue;
  width: 400px;
  height: 300px;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 41;
  gap: 20px;
}
.form-label{
  font-size: 16px;
  text-align: center;
  position: absolute;
  top: 20px;
}

.form-item{
  width: 80%;
  height: 40px;
  outline: none;
  position: relative;
  top: -30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}
.button{
  position: absolute;
  bottom: 20px;
}
</style>