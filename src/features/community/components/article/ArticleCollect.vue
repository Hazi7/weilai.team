<script lang="ts" setup>
import { ref, watch } from "vue";
const starClass = ref("");
const props = defineProps({
  isCollect: {
    type: Boolean,
  },
});
const handleClick = () => {
  console.log(props.isCollect);
  if (props.isCollect) {
    starClass.value = "";
  } else {
    starClass.value = "fill";
  }
};
console.log(props.isCollect);
watch(
  () => props.isCollect,
  (newIsCollect) => {
    starClass.value = newIsCollect ? "fill" : "";
  },
);
</script>

<template>
  <div class="wrap">
    <div id="star" :class="starClass" @click="handleClick"></div>
  </div>
</template>

<style scoped>
@keyframes banuce {
  0% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1.35);
  }
}

@keyframes circle {
  0% {
    transform: scale(0.2);
    opacity: 0.8;
  }
  100% {
    transform: scale(1.5);
    opacity: 1;
  }
}

@keyframes show {
  0% {
    opacity: 1;
  }
}

#star {
  display: inline-block;
  width: 17px;
  height: 17px;
  margin-top: 4px;
  background-image: url(../../../../assets/img/iconoir--star.png);
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  cursor: pointer;
}

.fill {
  position: relative;
  animation: banuce 0.2s ease 0s 2 alternate;
  background-image: url(../../../../assets/img/iconoir--star-solid.png) !important;
}

.fill::before {
  opacity: 0;
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 15%;
  height: 15%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: transparent;
  box-shadow:
    15px -15px 0 #fed001,
    15px 15px 0 #fed001,
    -15px -15px 0 #fed001,
    -15px 15px 0 #fed001;
  animation: show 0.2s steps(1, end) 0s 1;
}

.fill::after {
  opacity: 0;
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  animation: circle 0.3s ease 0.02s 1 alternate;
  border-radius: 50%;
  background: rgba(254, 208, 1, 0.1);
}
</style>
