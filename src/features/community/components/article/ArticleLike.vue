<script lang="ts" setup>
const props = defineProps({
  isLike: {
    type: Boolean,
  },
});

// 点击事件处理函数
const toggleLike = () => {
  if (!props.isLike) {
    const button = document.querySelector(".like-btn") as HTMLElement;
    const icon = document.querySelector(".like-icon") as HTMLElement;
    const createClones = () => {
      let numberOfClones = randomNum(2, 4);
      for (let i = 1; i <= numberOfClones; i++) {
        let clone = icon.cloneNode(true) as HTMLElement;
        let size = randomNum(20, 30);
        button.appendChild(clone);
        clone.setAttribute("width", size.toString());
        clone.setAttribute("height", size.toString());
        clone.classList.add("clone");
        clone.style.transform =
          "translate(" +
          negativePositive() * randomNum(20, 30) +
          "px," +
          negativePositive() * randomNum(20, 30) +
          "px)";
        const path = clone.querySelector(".like-path") as HTMLElement;
        path.setAttribute(
          "stroke",
          props.isLike ? "var(--secondary-foreground)" : "#079fd7",
        );
        setTimeout(() => {
          button.removeChild(clone);
        }, 800);
      }
    };
    createClones();
  }
};

// 随机数字函数
const randomNum = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// 随机返回正负值
const negativePositive = (): number => {
  return Math.random() < 0.5 ? -1 : 1;
};
</script>

<template>
  <a href="#" :class="{ active: isLike }" class="like-btn" @click="toggleLike">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="like-icon"
      width="18"
      height="18"
      viewBox="0 0 24 24"
    >
      <g fill="none">
        <path
          d="m15 10l-.74-.123a.75.75 0 0 0 .74.873zM4 10v-.75a.75.75 0 0 0-.75.75zm16.522 2.392l.735.147zM6 20.75h11.36v-1.5H6zm12.56-11.5H15v1.5h3.56zm-2.82.873l.806-4.835l-1.48-.247l-.806 4.836zm-.92-6.873h-.214v1.5h.213zm-3.335 1.67L8.97 8.693l1.248.832l2.515-3.773zM7.93 9.25H4v1.5h3.93zM3.25 10v8h1.5v-8zm16.807 8.54l1.2-6l-1.47-.295l-1.2 6zM8.97 8.692a1.25 1.25 0 0 1-1.04.557v1.5c.92 0 1.778-.46 2.288-1.225zm7.576-3.405A1.75 1.75 0 0 0 14.82 3.25v1.5a.25.25 0 0 1 .246.291zm2.014 5.462c.79 0 1.38.722 1.226 1.495l1.471.294A2.75 2.75 0 0 0 18.56 9.25zm-1.2 10a2.75 2.75 0 0 0 2.697-2.21l-1.47-.295a1.25 1.25 0 0 1-1.227 1.005zm-2.754-17.5a3.75 3.75 0 0 0-3.12 1.67l1.247.832a2.25 2.25 0 0 1 1.873-1.002zM6 19.25c-.69 0-1.25-.56-1.25-1.25h-1.5A2.75 2.75 0 0 0 6 20.75z"
        />
        <path
          :class="{ active: isLike }"
          class="like-path"
          :stroke="isLike ? '#079fd7' : 'var(--secondary-foreground)'"
          stroke-width="1.5"
          d="M8 10v10"
        />
      </g>
    </svg>
  </a>
</template>

<style scoped>
.like-btn {
  display: flex;
  align-items: center;
  font-size: 13px;
  margin-right: 4px;
}

.like-btn:active {
  transform: scale(0.9, 0.9);
}

.like-btn.active {
  animation: pop 0.6s 1;
}

.like-btn path {
  fill: var(--secondary-foreground);
}
.like-path:active {
  fill: #079fd7;
}

.like-btn.active path {
  fill: #079fd7;
  filter: drop-shadow(0 0 18px rgba(0, 187, 255, 0.8));
}

@keyframes pop {
  0% {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(1.3, 0.7);
  }
  40% {
    transform: scale(0.8, 1.3);
  }
  55% {
    transform: scale(0.9, 1.1);
  }
  75% {
    transform: scale(1.1, 0.7);
  }
  100% {
    transform: scale(1, 1);
  }
}

.clone {
  position: absolute;
  animation: moveOutwards 0.9s 1;
  opacity: 0;
}

@keyframes moveOutwards {
  from {
    opacity: 1;
    transform: translate(0, 0);
  }
}
</style>
