<template>
  <div class="article-rank">
    <div class="rank-top">
      <p>
        <Icon icon="lucide:scroll" font-size="20px" /> &nbsp;<span
          style="width: 5em"
          >文章榜
        </span>
      </p>
      <Icon
        icon="material-symbols-light:navigate-next"
        style="font-size: 25px; float: right; font-weight: bold"
      />
    </div>
    <hr />
    <ul>
      <li>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <a href="/community/comprehensive"
                ><span class="ranking">1</span
                ><span
                  >那些为了六便士努力的日子里，也常常有月光落在归路上。</span
                ></a
              ></TooltipTrigger
            >
            <TooltipContent class="bg-white font-[0.9vw]">
              <a href=""
                ><span
                  >那些为了六便士努力的日子里，也常常有月光落在归路上。</span
                >
              </a></TooltipContent
            >
          </Tooltip>
        </TooltipProvider>
      </li>
      <li>
        <span class="ranking">2</span>
        <span title="零碎的岛会找到海。">零碎的岛会找到海。</span>
      </li>
      <li><span class="ranking">3</span>渐入佳境，生以悦己。</li>
      <li><span class="ranking">4</span>桂花酒，少年游，大风吹散小忧愁</li>
      <li><span class="ranking">5</span>我与世界就是帧帧瞬间</li>

      <li>
        <span class="ranking">6</span>要在不愉快的日子里搜刮生活藏起来的温柔
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icon } from "@iconify/vue";
</script>

<style scoped lang="scss">
.article-rank {
  background-color: white;
  border-radius: var(--radius);
}
.rank-top {
  height: 6vh;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    display: flex;
    align-items: center;
    color: var(--secondary-foreground);
    height: 100%;
    font-size: 0.9vw;
    line-height: 4rem;
  }
  svg {
    font-size: 1rem !important;
  }
}
.ranking {
  font-weight: bold;
  font-size: 1vw;
  font-family: sans-serif;
  background-image: linear-gradient(#e9afa6, #eee0d4, #eadccc);
  -webkit-background-clip: text; /* Safari 和 Chrome 需要此属性 */
  color: transparent; /* 确保文字是透明的 */
  margin-right: 5px;
  display: inline-block;
  width: 1vw;
  text-align: center;
}
ul {
  padding: 10px 15px;
  width: 100%;
  li {
    font-size: 0.9vw;
    color: var(--secondary-foreground);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 1.4vh;
    button {
      width: 100%;
    }
    &:hover {
      cursor: pointer;
    }
    a {
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
    }
  }
}
// @media screen and (max-width: 1280px) {
//   .rank-top {
//     height: 2rem;
//     padding: 5px 10px;

//     p {
//       font-size: 0.7rem;
//       line-height: 4rem;
//     }
//     svg {
//       font-size: 1rem !important;
//     }
//   }
//   .ranking {
//     font-size: 14px;

//     margin-right: 5px;
//     display: inline-block;
//     width: 20px;
//   }
//   ul {
//     padding: 6px 12px;
//     width: 100%;
//     li {
//       font-size: 11px;
//       color: var(--secondary-foreground);
//       white-space: nowrap;
//       overflow: hidden;
//       text-overflow: ellipsis;
//       margin-bottom: 4px;
//       button {
//         width: 100%;
//       }
//       &:hover {
//         cursor: pointer;
//       }
//       a {
//         display: inline-block;
//         white-space: nowrap;
//         overflow: hidden;
//         text-overflow: ellipsis;

//         width: 100%;
//       }
//     }
//   }
// }
</style>
