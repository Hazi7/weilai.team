<script setup lang="ts">
import { useRequest } from "@/composables/useRequest";
import type { ArticleList, Data } from "@/types/Community";
import { debounce } from "@community/composables/search";
import { Icon } from "@iconify/vue";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const isVisible = ref(false);
const router = useRouter();
const searchValue = ref();
const { executeRequest, error, loading, data } = useRequest();
const searchList = ref<ArticleList[]>([]);
const filterList = ref<ArticleList[]>([]);
let debounceTimer: number | null = null;
const route = useRoute();
const path = route.path;
// 接受父组件传来的函数
const props = defineProps(["typeId"]);

// 用于记录已经出现的标题
const titleMap = new Map<string, boolean>();
let body = document.body as HTMLElement;
body.addEventListener("click", handleClick);
// 监视输入框的输入
const debouncedSearchTitle = debounce((newValue) => searchTitle(newValue), 300);
watch(searchValue, (newValue) => {
  if (newValue) {
    debouncedSearchTitle(newValue);
  } else {
    filterList.value = [];
  }
});
// 获取搜索列表
async function searchTitle(condition = "", type = 0) {
  await executeRequest({
    url: `/post/selectAll?condition=${condition}&type=${props.typeId || type}`,
    method: "get",
  });

  let res = data.value as Data;
  console.log(res);

  searchList.value = res.data.records;
  titleMap.clear();
  filterList.value = [];
  searchList.value.forEach((title) => {
    if (!titleMap.has(title.title)) {
      filterList.value.push(title);
      titleMap.set(title.title, true);
    }
  });
}

// 防止input框失去焦点时搜索列表消失
function handleClick(e: Event) {
  let target = e.target as HTMLElement;
  if (
    target.classList.contains("search_input") ||
    target.classList.contains("search_item")
  ) {
    isVisible.value = true;
  } else {
    isVisible.value = false;
  }
}
function skip(e: Event) {
  console.log(path);

  router.push(`${path}/${searchValue.value}`);
}
</script>

<template>
  <div class="search_container">
    <!-- <Command
      class="command_box w-64 bg-white float-right rounded-3xl border border-slate-300 relative overflow-visible"
    > -->
    <div class="search">
      <div class="search_input_box">
        <span class="search-icon"
          ><Icon
            icon="bitcoin-icons:search-filled"
            color="#b9c2d0"
            font-size="26px"
          />
        </span>
        <input
          placeholder="请输入关键词"
          class="search_input"
          ref="inputRef"
          @keydown.enter="
            () => {
              skip(searchValue);
            }
          "
          v-model="searchValue"
          @focus="isVisible = true"
        />
      </div>

      <div class="search_list" v-show="searchValue && isVisible">
        <div class="search_empty" v-if="!filterList.length">未找到搜索结果</div>
        <div class="search_item" v-for="item in filterList">
          <a @click="router.push(`/community/comprehensive/${item.title}`)">
            <span>{{ item.title }}</span></a
          >
        </div>
      </div>
    </div>
  </div>

  <!-- @click="handleClick($event)"
        @focus="onInputFocus" -->
  <!-- @blur="onInputBlur" -->
  <!-- <CommandList class="search_list" v-show="items.length && isVisible">
        <CommandEmpty>未找到搜索结果</CommandEmpty>
        <CommandGroup heading="" class="p-0">
          <CommandItem
            :value="item.title"
            v-for="item in items"
            class="search_item"
          >
            <a @click.stop="SearchTitle($event)">
              <span>{{ item.title }}</span></a
            >
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
      </CommandList>
    </Command> -->
</template>
<style lang="scss" scoped>
.command_box {
  background-color: white;
  border: 1px solid rgb(208, 217, 228);
  position: relative;
  overflow: visible;
  width: 250px;
  float: right;
  height: 45px;
  border-radius: 25px;
}
.search_container {
  margin-bottom: 10px;
  height: 45px;
}
.search {
  // &_input {
  //   border-style: none !important;
  // }
  // &_list {
  //   box-shadow:
  //     0px 2px 5px rgba(0, 0, 0, 0.1),
  //     inset 0px 0.2px 0.5px rgba(0, 0, 0, 0.24);
  //   border: 1px solid var(--secondary-border);
  //   position: absolute;
  //   top: 50px;
  //   padding: 5px 0;
  //   border-radius: 2px;
  //   width: 250px;
  //   z-index: 5;
  //   background-color: white;
  // }

  float: right;
  position: relative;
  &_input_box {
    position: relative;
  }
  input {
    text-decoration: none;
    list-style: none;
    outline-style: none;
    width: 250px;
    height: 45px;
    border: 1px solid #d0d9e4;
    border-radius: 25px;
    padding: 5px 10px;
    padding-left: 30px;
  }
  .search-icon {
    position: absolute;
    top: 50%;
    left: 2%;
    transform: translateY(-50%);
  }
  &_list {
    border-radius: var(--radius);
    background-color: white;
    box-shadow:
      0px 2px 5px rgba(0, 0, 0, 0.1),
      inset 0px 0.2px 0.5px rgba(0, 0, 0, 0.24);
  }
  &_empty {
    width: 100%;
    height: 150px;
    text-align: center;
    line-height: 150px;
    font-size: 15px;
    color: var(--secondary-foreground);
    cursor: default;
  }
  &_item {
    padding: 5px 6px;
    font-size: 15px;
    color: var(--secondary-foreground);
    a {
      width: 100%;
      display: inline-block;
    }
    &:hover {
      background-color: #f8f8fa;
    }
  }
}

@media screen and (max-width: 768px) {
  .search_container {
    align-items: center;
    justify-content: center;
    background-color: #fafafa;
    display: flex;
    position: fixed;
    z-index: 5;
    top: 80px;
    height: 60px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
  }
  .search {
    // &_input {
    //   border-style: none !important;
    // }
    // &_list {
    //   box-shadow:
    //     0px 2px 5px rgba(0, 0, 0, 0.1),
    //     inset 0px 0.2px 0.5px rgba(0, 0, 0, 0.24);
    //   border: 1px solid var(--secondary-border);
    //   position: absolute;
    //   top: 50px;
    //   padding: 5px 0;
    //   border-radius: 2px;
    //   width: 250px;
    //   z-index: 5;
    //   background-color: white;
    // }
    width: 90%;
    float: right;
    background-color: #fafafa;
    position: relative;
    &_input_box {
      position: relative;
      width: 100%;
    }
    input {
      text-decoration: none;
      list-style: none;
      outline-style: none;
      width: 100%;
      height: 45px;
      border: 1px solid #d0d9e4;
      border-radius: 25px;
      padding: 5px 10px;
      padding-left: 30px;
    }
    .search-icon {
      position: absolute;
      top: 50%;
      left: 2%;
      transform: translateY(-50%);
    }
    &_list {
      border-radius: var(--radius);
      background-color: white;
      box-shadow:
        0px 2px 5px rgba(0, 0, 0, 0.1),
        inset 0px 0.2px 0.5px rgba(0, 0, 0, 0.24);
    }
    &_empty {
      width: 100%;
      height: 150px;
      text-align: center;
      line-height: 150px;
      font-size: 15px;
      color: var(--secondary-foreground);
      cursor: default;
    }
    &_item {
      padding: 5px 6px;
      font-size: 15px;
      color: var(--secondary-foreground);
      a {
        width: 100%;
      }
      &:hover {
        background-color: #f8f8fa;
      }
    }
  }
}
</style>
