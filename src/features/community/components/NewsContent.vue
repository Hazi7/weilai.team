<template>
  <div id="news">
    <div class="news-item" v-for="item in articleList" :id="`${item.id}` + ''">
      <div class="news-writer">
        <div class="avatar">
          <img v-if="item.headPortrait" :src="`${item.headPortrait}`" alt="" />
          <div v-else class="flex items-center space-x-4">
            <Skeleton class="bg-[--muted] h-12 w-12 rounded-full" />
          </div>
        </div>
        <div class="writer-info">
          <div class="name">{{ item.name }}</div>
          <div class="time">
            发布于 <span>{{ item.postTime }}</span>
          </div>
        </div>
      </div>
      <a class="news-content">
        <div class="news-title">{{ item.title }}</div>
        <div class="news-details">
          <p>
            {{ item.postAbstract }}
          </p>
        </div>
        <div class="news-label">
          <div class="type">{{ checkType(item.type) }}</div>
          <ul class="labels">
            <li class="label-item" v-for="tags in item.postTags">
              #{{ tags }}
            </li>
          </ul>
        </div>
      </a>
      <NewsFooter
        :viewCount="item.viewCount"
        :likeCount="item.likeCount"
        :commentCount="item.commentCount"
      />
    </div>
  </div>

  <!-- <div v-if="loading">加载中</div> -->
  <div v-if="loading" class="loading">
    <div class="news-item" v-for="item in articleList" :id="`${item.id}` + ''">
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
</template>

<script setup lang="ts">
import { Skeleton } from "@/components/ui/skeleton";
import type { ArticleList } from "@/types/Community";
import {
  articleList,
  checkType,
  getArticle,
  loading,
} from "@community/composables/search";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import NewsFooter from "./NewsFooter.vue";
const isTag = ref(false);
console.log(loading.value);

const props = defineProps<{
  type?: number;
  page?: number;
  condition?: string;
  tagPostList?: Array<ArticleList>;
  isTag?: boolean;
}>();
const route = useRoute();

if (!props.isTag) {
  // 搜索数据要用的
  watch(
    () => route.params,
    (newVal) => {
      console.log("params改变了");

      console.log((newVal as any).title);
      let title = (newVal as any).title;
      getArticle(props.type, title, props.page);
    },
  );

  // 传递数据
  checkType(props.type);
  watch(
    () => props.type,
    (newVal) => {
      console.log("type改变了", newVal);
      getArticle(newVal, props.condition, props.page);
    },
    { deep: true, immediate: true },
  );
} else {
  watch(
    () => props.tagPostList,
    (newVal) => {
      if (newVal) {
        articleList.value = newVal;
        isTag.value = true;
        console.log(newVal);
      } else {
        console.log("帖子数据为空");
        console.log(newVal);

        articleList.value = [];
      }
      console.log("tagPostList改变了", newVal);
    },
    { deep: true, immediate: true },
  );
}
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
      .news-label {
        margin-top: 10px;
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
          }
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
</style>
