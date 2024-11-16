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
      <li><span class="ranking">1</span><span>零碎的岛会找到海。</span></li>
      <li>
        <span class="ranking">2</span
        >那些为了六便士努力的日子里，也常常有月光落在归路上
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
import { Icon } from "@iconify/vue";
</script>

<style scoped lang="scss">
.article-rank {
  background-color: white;
  border-radius: var(--radius);
}
.rank-top {
  height: 3rem;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    display: flex;
    align-items: center;
    color: var(--secondary-foreground);
    height: 100%;
    font-size: 13px;
    line-height: 4rem;
  }
}
.ranking {
  font-weight: bold;
  font-size: 17px;
  font-family: sans-serif;
  background-image: linear-gradient(#e9afa6, #eee0d4, #eadccc);
  -webkit-background-clip: text; /* Safari 和 Chrome 需要此属性 */
  color: transparent; /* 确保文字是透明的 */
  margin-right: 5px;
  display: inline-block;
  width: 30px;
  text-align: center;
}
ul {
  padding: 10px 15px;
  width: 100%;
  li {
    font-size: 15px;
    color: var(--secondary-foreground);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 8px;
  }
}
</style>
