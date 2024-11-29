<script setup lang="ts">
// 引入组件
import{ MessageCard,ToggleShow,QuickShowCard } from '@/components/recruitment'

// 引入vue函数
import { ref } from "vue";

// 定义切换组件的基本信息 传给子组件
const toggleItems = ref([
    {
        index: 0,
        title: '待我反馈',
        isActive: true,
    },
    {
        index: 1,
        title: '我录取的',
        isActive: false,
    },
    {
        index: 2,
        title: '我淘汰的',
        isActive: false,
    }
]);

//
const quickShowItems = ref([
    {
        label: '待安排',
        number: 8,
    },
    {
        label: '已录取',
        number: 8,
    }
]);

</script>

<template>
  <div class="main">
    <div class="left-side">

      <div class="quick-show" v-for="(item, index) in quickShowItems" :key="index">
        <QuickShowCard :quickShowItem="item"></QuickShowCard>
      </div>

      <div class="quick-control">

      </div>
    </div>

    <div class="content">
      <div class="content-container">
        <div class="toggle-outer long-dashed-border">
          <ToggleShow :toggleItems="toggleItems" ></ToggleShow>
        </div>
        <div class="main-content-show">
          <MessageCard></MessageCard>
          <MessageCard></MessageCard>
          <MessageCard></MessageCard>
          <MessageCard></MessageCard>
        </div>
      </div>

    </div>
  </div>
</template>
<style lang="scss" scoped>
@use '@/assets/styles';
@use '@/assets/styles/recruitment.scss';

.main {
  width: 100%;
  height: auto;
  background-color: #fff;
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  top: 20px;
  box-sizing: content-box;
}

//.region 左侧边栏
.left-side {
  width: 20%;
  height: auto;
  background-color: #fff;
  position: relative;
  margin-left: 2em;
  display: inline-block;
  margin-top: 10px;
  border: none;
}



//.endregion

//.region 中间内容区
.content {
  width: 70%;
  background-color:var(--background);
  position: relative;
  display: inline-block;
  top: 20px;
  left: 20px;
  border: none;
}
.content-container {
  width: 100%;
  height: auto;
  .toggle-outer {
    width: 100%;
    height: 80px;
    padding-left: 10px;
    display: flex;
    flex-direction: row;
    justify-content:flex-start;
    align-items: center;
  }

}
//.endregion
</style>
