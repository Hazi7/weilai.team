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
          @keydown.enter="() => {}"
          v-model="searchValue"
          @focus="isVisible = true"
        />
      </div>

      <div class="search_list" v-show="searchValue && isVisible">
        <div class="search_empty" v-if="!searchList.length">未找到搜索结果</div>
        <div class="search_item" v-for="item in searchList">
          <MemberInfo :userId="item.id">
            <DialogTrigger as-child>
              <span class="search-item"
                ><Icon icon="bi:person-fill" />{{ item.name }}</span
              >
            </DialogTrigger>
          </MemberInfo>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DialogTrigger } from "@/components/ui/dialog";
import { useRequest } from "@/composables/useRequest";
import type { ArticleList, UserInfo } from "@/types/Community";
import type { searchData, TeamUserList } from "@/types/Contacts";
import { debounce } from "@community/composables/search";
import { Icon } from "@iconify/vue";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import MemberInfo from "./MemberInfo.vue";
// import { searchMember } from "../../composables/useContacts";
const isVisible = ref(false);
const router = useRouter();
const searchValue = ref();
const { executeRequest, error, loading, data } = useRequest();
const searchList = ref<TeamUserList[]>([]);
const filterList = ref<ArticleList[]>([]);
const searchUserList = ref<UserInfo[]>([]);
const filterUserList = ref<UserInfo[]>([]);
const route = useRoute();
const path = route.path;
// 接受父组件传来的函数
const props = defineProps({
  content: {
    type: String,
    default: "",
  },
});
async function searchMember(content = "") {
  await executeRequest({
    url: `/userManager/teamInfo/searchTeamUser?content=${content}`,
    method: "get",
  });
  const res = data.value as searchData;
  console.log(res);

  searchList.value = res.data;
}

// 用于记录已经出现的标题
const titleMap = new Map<string, boolean>();
let body = document.body as HTMLElement;
body.addEventListener("click", handleClick);
// 监视输入框的输入

const debouncedSearchMember = debounce(
  (newValue) => searchMember(newValue),
  300,
);
watch(searchValue, (newValue) => {
  if (newValue) {
    debouncedSearchMember(newValue);
  } else {
    searchUserList.value = [];
  }
});
// 获取搜索列表

// async function searchUser(content = "", pageNumber = 1, pageSize = 10) {
//   await executeRequest({
//     url: `/user/searchUser?content=${content}&pageNumber=${pageNumber}&pageSize=10 `,
//     method: "get",
//   });
//   let res = data.value as UserData;
//   searchUserList.value = res.data.searchUsers;

//   filterUserList.value = res.data.searchUsers;
//   //   titleMap.clear();
//   //   filterUserList.value = [];
//   //   searchUserList.value.forEach((user) => {
//   //     if (!titleMap.has(user.name)) {
//   //       filterUserList.value.push(user);
//   //       titleMap.set(user.name, true);
//   //     }
//   //   });
// }
// async function searchTitle(condition = "", type = 0) {
//   await executeRequest({
//     url: `/post/selectAll?condition=${condition}&type=${props.typeId || type}`,
//     method: "get",
//   });
//   let res = data.value as Data;
//   console.log(res);
//   searchList.value = res.data.records;
//   titleMap.clear();
//   filterList.value = [];
//   searchList.value.forEach((title) => {
//     if (!titleMap.has(title.title)) {
//       filterList.value.push(title);
//       titleMap.set(title.title, true);
//     }
//   });
// }
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
// function skip(e: Event) {
//   if (searchValue.value) {
//     router.push(`${path}/${searchValue.value}`);
//   } else {
//     router.push(`${path}`);
//   }
// }
</script>

<style scoped lang="scss">
.search_container {
  margin-bottom: 10px;
  height: 45px;
}
.search {
  position: relative;
  &_input_box {
    position: relative;
  }
  input {
    text-decoration: none;
    list-style: none;
    outline-style: none;
    width: 100%;
    height: 40px;
    border: 1px solid #d0d9e4;
    border-radius: 8px;
    padding: 5px 10px;
    padding-left: 30px;
    font-size: 14px;
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
    position: relative;
    z-index: 15;
    padding: 5px 5px;
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
    padding: 5px 10px;
    font-size: 15px;
    color: var(--secondary-foreground);
    a {
      width: 100%;
      display: inline-block;
    }
    &:hover {
      background-color: #f8f8fa;
    }
    span {
      display: flex;
      align-items: center;
      font-size: 14px;

      svg {
        color: #cfdff1;
        margin-right: 5px;
        font-size: 15px;
      }
    }
  }
}
</style>
