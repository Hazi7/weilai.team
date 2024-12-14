<template>
  <a
    class="news-item"
    v-for="item in userList"
    @click="skipPersonCenter(item.userId)"
  >
    <div class="news-writer">
      <div class="avatar">
        <Avatar
          :avatar="item.headPortrait"
          :customClass="`w-[50px] h-[50px]`"
        />
      </div>
      <div class="writer-info">
        <h3 class="name">{{ item.name }}</h3>
        <div class="work-info">
          <span class="origin">原创 {{ item.postCount }}</span>
          <span class="read">阅读 {{ item.viewCount }}</span>
          <!-- <span class="like">点赞</span> -->
        </div>
        <div class="brief">{{ item.userDestination }}</div>
      </div>
    </div>
  </a>
  <div v-if="!userList.length">
    <NoData />
  </div>
  <div v-if="isOver && userList.length > 0" class="over">已经到底了</div>
</template>

<script setup lang="ts">
import Avatar from "@/components/avatar/UserAvatar.vue";
import NoData from "@/components/loading/NoData.vue";
import { useRequest } from "@/composables/useRequest";
import { useUserStore } from "@/store/userStore";
import type { UserData, UserInfo } from "@/types/Community";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const userStore = useUserStore();
const router = useRouter();
const current = ref<number>(1);
const pages = ref<number>(1);
const total = ref<number>(0);
const content = ref("");
const isOver = ref(false);
function skipPersonCenter(id: number) {
  userStore.setUserId(id);
  userStore.setIsSelf(false);
  router.push({
    path: `/personalCenter/userInfo`,
  });
}
const props = defineProps({
  content: {
    type: String,
    default: "",
  },
  pageNumber: {
    type: Number,
    default: 1,
  },
});
const route = useRoute();
watch(
  () => route.params,
  (newVal) => {
    console.log((newVal as any).user);
    let user = (newVal as any).user;
    getUserList(user);
  },
);

const { executeRequest, error, loading, data } = useRequest();
const userList = ref<UserInfo[]>([]);
async function getUserList(content = "", pageNumber = 1, pageSize = 30) {
  await executeRequest({
    url: `/user/searchUser?content=${content}&pageNumber=${pageNumber}&pageSize=${pageSize} `,
    method: "get",
  });
  const res = data.value as UserData;

  current.value = res.data.pageInfo.current;
  pages.value = res.data.pageInfo.pages;
  total.value = res.data.pageInfo.total;
  return res.data;
}
getUserList(props.content).then((res) => {
  userList.value = res.searchUsers;
});
onMounted(async () => {
  window.addEventListener("scroll", handleScroll, true);
});

const handleScroll = async (e: any) => {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const clientHeight =
    document.documentElement.clientHeight || document.body.clientHeight;
  let scrollHeight =
    document.documentElement.scrollHeight || document.body.scrollHeight;

  if (scrollTop + clientHeight > scrollHeight - 100) {
    console.log("到底了");
    if (current.value < pages.value) {
      current.value++;
      isOver.value = false;
      //数据为加载完，继续赋值
      getUserList(content.value, pages.value).then((res) => {
        if (res.searchUsers.length > 0) {
          res.searchUsers.forEach((record) => {
            userList.value.push(record);
          });
        }
      });
    } else {
      isOver.value = true;
    }
  }
};
</script>

<style scoped lang="scss">
.news-item {
  display: block;
  padding: 10px 15px;
  border-radius: 10px;
  cursor: pointer;
  min-height: 85px;
  background-color: var(--background);
  margin-bottom: 20px;
  .news-writer {
    display: flex;
    align-items: center;

    .avatar {
      width: 50px;
      height: 50px;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
      margin-right: 10px;
    }
    .name {
      font-weight: 500;
      font-size: 15px;
    }

    .work-info,
    .brief {
      font-size: 13px;
      font-weight: 400;
      color: #686570;
      span {
        margin-right: 12px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
  .news-content {
    padding: 10px 55px;
    display: block;
    &:hover {
      background-color: #f8f8fa;
      cursor: pointer;
    }
    .news-details {
      font-size: 14.5px;
      color: #a7a7a7;
      p {
        max-height: 40px;
        line-height: 20px;
        display: -webkit-box;
        -webkit-line-clamp: 2; //行数
        text-overflow: ellipsis; //省略号
        -webkit-box-orient: vertical;
        overflow: hidden;
        white-space: normal;
        word-break: break-all;
      }
    }
    .news-label {
      margin-top: 10px;
      display: flex;
      .type {
        width: 50px;
        font-size: 14px;
        color: #909ba6;
        text-align: center;
        border-radius: 15px;
        border: 2px solid #e1edf8;
        margin-right: 8px;
      }

      .labels {
        display: flex;
        color: #909ba6;
        font-size: 14px;
        .label-item {
          margin: 0 5px;
        }
      }
    }
  }
}
.over {
  text-align: center;
  font-size: 12px;
  color: var(--secondary-foreground);
  font-weight: 500;
}
@media screen and (max-width: 768px) {
  .news-item {
    padding: 5px;
    margin-bottom: 8px;
    .news-writer {
      padding-left: 10px;
      .avatar {
        width: 40px;
        height: 40px;
      }

      .work-info,
      .brief {
        font-size: 13px;
        font-weight: 400;
        color: #686570;
        span {
          margin-right: 12px;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
    .news-content {
      padding: 10px 55px;
      .news-title {
        font-weight: 540;
      }
      .news-details {
        font-size: 14.5px;
        color: #a7a7a7;
        p {
          max-height: 40px;
          line-height: 20px;
          display: -webkit-box;
          -webkit-line-clamp: 1; //行数
          text-overflow: ellipsis; //省略号
          -webkit-box-orient: vertical;
          overflow: hidden;
          white-space: normal;
          word-break: break-all;
        }
      }
      .news-label {
        margin-top: 10px;
        display: flex;
        .type {
          width: 50px;
          font-size: 14px;
          color: #909ba6;
          text-align: center;
          border-radius: 15px;
          border: 2px solid #e1edf8;
          margin-right: 8px;
        }

        .labels {
          display: flex;

          color: #909ba6;
          font-size: 14px;
          .label-item {
            margin: 0 5px;
          }
        }
      }
    }
  }
}
</style>
