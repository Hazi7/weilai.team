<script setup lang="ts">

const props = defineProps<{
  message: string;
  isOpen: boolean;
}>();

const emit = defineEmits(["close"]);
const close = (event: Event) => {
  // 点击遮罩层关闭
  if (event.target === event.currentTarget) {
    emit("close");
  }
  return;
};

</script>
<!-- <InterviewEvaluationShow /> -->
<template>
  <Teleport to="body">
    <div class="outer" v-if="isOpen" @click="close($event)">
      <div class="interview-evaluation-container">
        <div class="title">
          <h2>面试评价展示页</h2>
        </div>
        <div class="content">
          <p>
            {{ message }}
          </p>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<style scoped lang="scss">
@use "@/assets/styles/recruitment.scss";
.interview-evaluation-container {
  width: 400px;
  height: 300px;
  background-color:var(--popover);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 30px;
  top: 20px;
  box-sizing: content-box;
  margin-bottom: 40px;
  border-radius: var(--radius);
  .title {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    top: 20px;
  }
  .content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
