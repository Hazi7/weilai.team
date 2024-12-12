<script setup lang="ts">
import CommentList from "@/components/comment/CommentList.vue";
import { useRequest } from "vue-request";
import useAppEditor from "@/features/post/composables/useAppEditor";
import { EditorContent } from "@tiptap/vue-3";
import { useRoute } from "vue-router";
import ArticleHeader from "../../components/article/ArticleHeader.vue";
import { type AxiosResponse } from "axios";
import { computed, watch } from "vue";
import apiClient from "@/api/axios";
import { formatPostTime } from "@/utils/formatPostTime";
import { handleLikeClick } from "../../composables/Like";
import { handleCollect } from "../../composables/Collect";

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
//点赞
const handleLike = () => {
  handleLikeClick(postId);
};
//收藏
const handleCollectClick = () => {
  handleCollect(postId);
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
      :is-collect="data?.data.isCollect"
      :handle-like-click="handleLike"
      :handle-collect="handleCollectClick"
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
@use "/src/assets/styles/editor/index.scss";
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
