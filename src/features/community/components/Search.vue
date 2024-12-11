<script setup lang="ts">
import { useRequest } from "@/composables/useRequest";
import type { ArticleList, Data, UserData, UserInfo } from "@/types/Community";
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
const searchUserList = ref<UserInfo[]>([]);
const filterUserList = ref<UserInfo[]>([]);
const route = useRoute();
const path = route.path;
// 接受父组件传来的函数
const props = defineProps({
  typeId: {
    type: Number,
    default: 0,
  },
  isUser: {
    type: Boolean,
    default: false,
  },
});

// 用于记录已经出现的标题
const titleMap = new Map<string, boolean>();
let body = document.body as HTMLElement;
body.addEventListener("click", handleClick);
// 监视输入框的输入
const debouncedSearchTitle = debounce((newValue) => searchTitle(newValue), 300);
const debouncedSearchUser = debounce((newValue) => searchUser(newValue), 300);
watch(searchValue, (newValue) => {
  if (!props.isUser) {
    if (newValue) {
      debouncedSearchTitle(newValue);
    } else {
      filterList.value = [];
    }
  } else {
    if (newValue) {
      debouncedSearchUser(newValue);
    } else {
      filterUserList.value = [];
    }
  }
});
// 获取搜索列表

async function searchUser(content = "", pageNumber = 1, pageSize = 10) {
  await executeRequest({
    url: `/user/searchUser?content=${content}&pageNumber=${pageNumber}&pageSize=10 `,
    method: "get",
  });
  let res = data.value as UserData;
  searchUserList.value = res.data.searchUsers;

  filterUserList.value = res.data.searchUsers;
  titleMap.clear();
  filterUserList.value = [];
  searchUserList.value.forEach((user) => {
    if (!titleMap.has(user.name)) {
      filterUserList.value.push(user);
      titleMap.set(user.name, true);
    }
  });
}
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
  if (searchValue.value) {
    router.push(`${path}/${searchValue.value}`);
  } else {
    router.push(`${path}`);
  }
}
</script>

<template>
  <div class="search_container">
    <div class="search">
      <div class="search_input_box">
        <span class="search-icon">
          <Icon
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

      <div class="search_list" v-show="searchValue && isVisible && !isUser">
        <div class="search_empty" v-if="!filterList.length">未找到搜索结果</div>
        <div class="search_item" v-for="item in filterList">
          <a @click="router.push(`/community/comprehensive/hot/${item.title}`)">
            <span>{{ item.title }}</span>
          </a>
        </div>
      </div>
      <div class="search_list" v-show="searchValue && isVisible && isUser">
        <div class="search_empty" v-if="!filterUserList.length">
          未找到搜索结果
        </div>
        <div class="search_item" v-for="item in filterUserList">
          <a @click="router.push(`/community/comprehensive/user/${item.name}`)">
            <span>{{ item.name }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
// .command_box {
//   background-color: white;
//   border: 1px solid rgb(208, 217, 228);
//   position: relative;
//   overflow: visible;
//   width: 250px;
//   float: right;
//   height: 45px;
//   border-radius: 25px;
// }
.search_container {
  margin-bottom: 10px;
  height: 45px;
}
.search {
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
