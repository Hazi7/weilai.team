<template>
  <div class="default-layout__container">
    <div class="loader"></div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
* {
  /* 初始化 */
  margin: 0;
  padding: 0;
}

body {
  overflow: hidden;
}

.default-layout__container {
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 10000;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 外圈 */
.loader {
  width: 200px;
  height: 200px;
  /* 相对定位 */
  position: relative;
  border-radius: 50%;
  border: 4px solid transparent;
  border-top-color: #4bc0c8;
  /* 执行动画：动画名 时长 线性的 无限次播放 */
  animation: spin 2s linear infinite;
}

/* 中圈 */
.loader::before {
  content: "";
  /* 绝对定位 */
  position: absolute;
  left: 5px;
  top: 5px;
  right: 5px;
  bottom: 5px;
  border-radius: 50%;
  border: 4px solid transparent;
  border-top-color: #c779d0;
  /* 执行动画：动画名 时长 线性的 无限次播放 */
  animation: spin 3s linear infinite;
}

/* 内圈 */
.loader::after {
  content: "";
  position: absolute;
  left: 15px;
  top: 15px;
  right: 15px;
  bottom: 15px;
  border-radius: 50%;
  border: 4px solid transparent;
  border-top-color: #feac5e;
  /* 执行动画：动画名 时长 线性的 无限次播放 */
  animation: spin 1.5s linear infinite;
}

/* 定义动画 */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
