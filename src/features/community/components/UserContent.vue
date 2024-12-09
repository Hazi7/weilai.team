<template>
  <a class="news-item" v-for="item in userList">
    <div class="news-writer">
      <div class="avatar">
        <!-- <img v-if="item.headPortrait" :src="`${item.headPortrait}`" alt="" />
        <div v-else class="flex items-center space-x-4">
          <Skeleton class="bg-[--muted] h-12 w-12 rounded-full" />
        </div> -->

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
          <span class="like">点赞</span>
        </div>
        <div class="brief">{{ item.userDestination }}</div>
      </div>
    </div>
  </a>
  <a class="news-item">
    <div class="news-writer">
      <div class="avatar">
        <img src="@/assets/img/headImg.jpg" alt="" />
      </div>
      <div class="writer-info">
        <div class="work-info">
          <span class="origin">原创 400</span>
          <span class="read">阅读 123</span>
          <span class="like">点赞</span>
        </div>
        <div class="brief">致力于干饭</div>
      </div>
    </div>
  </a>
</template>

<script setup lang="ts">
import Avatar from "@/components/avatar/UserAvatar.vue";
import { useRequest } from "@/composables/useRequest";
import { useUserStore } from "@/store/userStore";
import type { UserData, UserInfo } from "@/types/Community";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
const userStore = useUserStore();
console.log(userStore.userId);

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
async function getUserList(content = "", pageNumber = 1) {
  await executeRequest({
    url: `/user/searchUser?content=${content}&pageNumber=${pageNumber}&pageSize=10 `,
    method: "get",
  });
  const res = data.value as UserData;
  userList.value = res.data.searchUsers;
}
getUserList(props.content);
// async function checkImageUrl(url: string) {
//   return new Promise((resolve, reject) => {
//     let img = new Image();
//     img.onload = () => {
//       resolve(true);
//     };
//     img.onerror = () => {
//       reject(false);
//     };
//     img.src = url;
//   });
// }

// 调用checkImageUrl函数并处理结果
// checkImageUrl(
//   "http://49.232.183.67:19000/wlgzs-official-website/user/2024-11-15/3b031693-7d54-40a0-9656-f72b01f7f662IDEAbackgroundImage.jpg",
// )
//   .then((result) => {
//     console.log(Boolean(result)); // 将结果转换为布尔值并打印
//   })
//   .catch((error) => {
//     console.log("检查图片链接时出错：", error);
//   });
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
