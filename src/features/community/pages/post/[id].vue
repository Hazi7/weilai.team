<script setup lang="ts">
import CommentList from "@/components/comment/CommentList.vue";
import { useRequest } from "vue-request";
import useAppEditor from "@/features/post/composables/useAppEditor";
import { EditorContent } from "@tiptap/vue-3";
import { useRoute } from "vue-router";
import ArticleHeader from "../../components/article/ArticleHeader.vue";
import { type AxiosResponse } from "axios";
import { computed, onMounted, ref, watch, watchEffect } from "vue";
import apiClient from "@/api/axios";
import { formatPostTime } from "@/utils/formatPostTime";
import { useAlert } from "@/composables/useAlert";

export interface PostDetailResponse {
  userId: number;
  name: string;
  headPortrait: any;
  collectCount: number;
  likeCount: number;
  commentCount: number;
  viewCount: number;
  postTime: string;
  title: string;
  postTxt: string;
  postTags: string[];
  isLike: boolean;
  isCollect: boolean;
}

// 从路由获取参数
const route = useRoute<"/community/post/[id]">();
const postId = route.params.id;
const { showAlert } = useAlert();

const getPost = () => {
  return apiClient.get(`/post/selectOne/${postId}`);
};
const { data, loading, run } =
  useRequest<AxiosResponse<PostDetailResponse>>(getPost);
const formattedPostTime = computed(() => {
  if (data.value?.data.postTime) {
    return formatPostTime(data.value?.data.postTime);
  }
});

const { editor } = useAppEditor(false);

watch(
  () => data.value,
  () => {
    if (data.value?.data.postTxt) {
      editor.value?.commands.setContent(JSON.parse(data.value?.data.postTxt));
    }
  },
);
const {
  data: likeData,
  run: likeRun,
  loading: likeLoading,
} = useRequest(() => likeArticle(), {
  manual: true,
});
const likeArticle = () => {
  return apiClient.put(`/post/like/${postId}`);
};
console.log(likeData);

watch(
  () => likeData.value,
  (newLikeData) => {
    console.log("点赞请求的响应数据:", newLikeData);
    run();
    if (newLikeData.code === 2009) {
      showAlert("点赞成功", "pass");
    } else if (newLikeData.code === 2011) {
      showAlert("取消点赞成功", "pass");
    } else {
      showAlert("点赞失败", "error");
    }
  },
);

const handleLikeClick = () => {
  likeRun();
};
</script>

<template>
  <div class="article-detail">
    <ArticleHeader
      :tags="data?.data.postTags"
      :title="data?.data.title"
      :view-count="data?.data.viewCount"
      :like-count="data?.data.likeCount"
      :comment-count="data?.data.commentCount"
      :is-loading="loading"
      :author="data?.data.name"
      :avatar="data?.data.headPortrait"
      :post-time="formattedPostTime"
      :is-like="data?.data.isLike"
      :handle-like-click="handleLikeClick"
    ></ArticleHeader>
    <EditorContent
      class="article-detail__content"
      :editor="editor"
    ></EditorContent>
  </div>
  <div class="article-Form">
    <CommentList :post-id="postId"></CommentList>
  </div>
</template>

<style lang="scss">
@use "/src/assets/styles/markdown.scss";
.article-detail {
  background-color: #fff;
  box-sizing: border-box;
  padding: 1rem 3rem;
  &__content {
    margin-top: 2rem;
  }
}

.news-footer {
  display: flex;
  align-items: center;
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
  .already {
    color: red;
  }
}
.article-Form {
  width: 100%;
  background-color: white;
  margin-top: 20px;
}
</style>
