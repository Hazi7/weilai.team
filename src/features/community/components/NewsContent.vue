<template>
  <div id="news" ref="scrollRef ">
    <div v-if="articleList.length > 0">
      <div class="news-item" v-for="item in articleList">
        <div class="news-writer">
          <div
            class="avatar"
            @click="skipPersonCenter(item.userId ? item.userId : 0)"
          >
            <UserAvatar :avatar="item.headPortrait" />
          </div>
          <div class="writer-info">
            <div class="name">{{ item.name }}</div>
            <div class="time">
              <span>{{ formatPostTime(item.postTime) }}</span>
            </div>
          </div>
        </div>
        <RouterLink
          :to="{ name: '/community/post/[id]', params: { id: item.id } }"
          target="_blank"
          class="news-content"
        >
          <div class="news-title">{{ item.title }}</div>
          <div class="news-details">
            <p>
              {{ item.postAbstract }}
            </p>
          </div>
        </RouterLink>
        <div class="news-label">
          <div class="type">{{ checkType(item.type) }}</div>
          <ul class="labels">
            <RouterLink
              class="label-item"
              v-for="tags in item.postTags"
              :to="`/community/${tagType}/label/${tags}`"
            >
              #{{ tags }}
            </RouterLink>
          </ul>
        </div>
        <NewsFooter
          :viewCount="item.viewCount"
          :likeCount="item.likeCount"
          :commentCount="item.commentCount"
        />
      </div>
    </div>

    <div v-else-if="loading" class="loading">
      <div class="news-item" v-for="item in loadinglen">
        <div class="news-writer">
          <div class="flex items-center space-x-4">
            <Skeleton class="h-12 w-12 rounded-full bg-[--muted]" />
            <div class="space-y-2">
              <Skeleton class="h-4 w-[250px] bg-[--muted]" />
              <Skeleton class="h-4 w-[200px] bg-[--muted]" />
            </div>
          </div>
        </div>
        <a class="news-content loading-content">
          <Skeleton class="h-12 w-full bg-[--muted]" />
        </a>
      </div>
    </div>
    <div v-else="!loading && !articleList.length">
      <NoData />
    </div>
    <!-- 到底了 -->
    <div v-if="isOver && articleList.length > 0" class="over">已经到底了</div>
  </div>

  <!-- <div v-if="loading">加载中</div> -->
</template>

<script setup lang="ts">
import { useTagStore } from "@/store/tagTypeStore";

import UserAvatar from "@/components/avatar/UserAvatar.vue";
import NoData from "@/components/loading/NoData.vue";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserStore } from "@/store/userStore";
import type { ArticleList } from "@/types/Community";
import { formatPostTime } from "@/utils/formatPostTime";
import {
  // articleList,
  checkType,
  getArticle,
} from "@community/composables/search";
import { onMounted, provide, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import NewsFooter from "./NewsFooter.vue";
const loadinglen = ref(0);
const articleList = ref<ArticleList[]>([]);
const isTag = ref(false);
const loading = ref(true);
const tagStore = useTagStore();
const tagType = tagStore.tagType.tagType;
// 滚动容器
const scrollRef = ref<HTMLDivElement>();
const userStore = useUserStore();
const router = useRouter();
provide("scrollRefFromInner", scrollRef);
const props = defineProps<{
  type?: number | 0;
  page?: number;
  sort?: number | 0;
  condition?: string | "";
  tagPostList?: Array<ArticleList>;
  isTag?: boolean | false;
}>();
const route = useRoute();
const pages = ref<number>(1);
const total = ref<number>(0);
const current = ref<number>(1);
const isOver = ref<boolean>(false);
//跳转个人中心;
function skipPersonCenter(id: number) {
  userStore.setUserId(id);
  userStore.setIsSelf(false);

  router.push({
    path: `/personalCenter/userInfo`,
  });
}

if (!props.isTag) {
  // 搜索数据要用的
  watch(
    () => route.params,
    (newVal) => {
      let title = (newVal as any).title;
      getArticle(props.type, title, props.page, undefined, props.sort).then(
        (res) => {
          loading.value = true;
          console.log(res);
          pages.value = res.pages;
          total.value = res.total;
          loadinglen.value = res.records.length;
          current.value = res.current;
          setTimeout(() => {
            loading.value = false;
            articleList.value = res.records;
          }, 400);
        },
      );
    },
  );
  // 传递数据
  checkType(props.type);
  watch(
    () => props.type,
    (newVal) => {
      loading.value = true;
      console.log("sort", props.sort);
      getArticle(
        newVal,
        props.condition,
        props.page,
        undefined,
        props.sort ? props.sort : 0,
      ).then((res) => {
        pages.value = res.pages;
        total.value = res.total;
        loadinglen.value = res.records.length;
        current.value = res.current;
        setTimeout(() => {
          loading.value = false;
          articleList.value = res.records;
        }, 400);
      });
    },
    { deep: true, immediate: true },
  );
} else {
  watch(
    () => props.tagPostList,
    (newVal) => {
      if (newVal) {
        if (newVal.length > 0) {
          articleList.value = newVal;
          isTag.value = true;
        } else {
          loadinglen.value = 0;
          loading.value = false;
          articleList.value = [];
        }
      }
    },
    { deep: true, immediate: true },
  );
}
onMounted(async () => {
  window.addEventListener("scroll", handleScroll, true);
});

const handleScroll = async (e: any) => {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const clientHeight =
    document.documentElement.clientHeight || document.body.clientHeight;
  let scrollHeight =
    document.documentElement.scrollHeight || document.body.scrollHeight;
  if (scrollTop + clientHeight > scrollHeight) {
    if (current.value < pages.value) {
      current.value++;
      //数据为加载完，继续赋值
      getArticle(props.type, props.condition, current.value).then((res) => {
        loading.value = true;
        if (res.records.length > 0) {
          loadinglen.value = res.records.length;

          res.records.forEach((record) => {
            articleList.value.push(record);
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
#news,
.loading {
  width: 100%;
  .news-item {
    padding: 15px;
    border-radius: 10px;
    min-height: 100px;

    background-color: var(--background);
    margin-bottom: 25px;
    .news-writer {
      display: flex;
      align-items: center;
      .avatar {
        cursor: pointer;
        width: 50px;
        height: 50px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
        margin-right: 5px;
      }

      .time {
        font-size: 13px;
        color: #909ba6;
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
    }
    .news-label {
      padding: 5px 55px;

      display: flex;
      .type {
        min-width: 50px;
        width: max-content;
        padding: 0 8px;
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
          cursor: pointer;
        }
      }
    }
    .news-footer {
      display: flex;
      align-items: center;
      padding: 5px 55px;
      & > div {
        color: var(--secondary-foreground);
        display: flex;
        align-items: center;
        font-size: 13px;
        margin-right: 10px;
      }
      &-icon {
        color: var(--secondary-foreground);
        font-size: 17px;
        margin-right: 5px;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  #news {
    margin-top: 150px;
    .news-item {
      padding: 5px;
      margin-bottom: 8px;
      .news-writer {
        padding-left: 10px;
        .avatar {
          width: 40px;
          height: 40px;
        }
        .writer-info {
          .name {
            color: var(--secondary-foreground);
            font-size: 0.9em;
            margin-left: 5px;
          }
          .time {
            display: none;
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
            padding: 0;
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
}
.over {
  text-align: center;
  font-size: 12px;
  color: var(--secondary-foreground);
  font-weight: 500;
}
@media screen and (min-width: 900px) and (max-width: 1300px) {
  #news,
  .loading {
    .news-item {
      padding: 10px;
      border-radius: 10px;
      min-height: 100px;

      background-color: var(--background);
      margin-bottom: 25px;
      .news-writer {
        .name {
          font-size: 1vw;
        }
        .avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
        }

        .time {
          font-size: 10px;
          color: #909ba6;
        }
      }
      .news-content {
        padding: 5px 35px;

        font-size: 1vw;

        .news-details {
          font-size: 0.9vw;

          p {
            max-height: 30px;
            line-height: 15px;
            font-size: 0.95vw;
            display: -webkit-box;
            -webkit-line-clamp: 2; //行数
            text-overflow: ellipsis; //省略号
            -webkit-box-orient: vertical;
            overflow: hidden;
            white-space: normal;
            word-break: break-all;
          }
        }
      }
      .news-label {
        padding: 5px 35px;

        display: flex;
        .type {
          min-width: 30px;
          width: max-content;
          padding: 0 8px;
          font-size: 10px;
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
            display: flex;
            align-items: center;

            margin: 0 5px;
            font-size: 0.8vw;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
