<script setup lang="ts">
import CommentList from "@/components/comment/CommentList.vue";
import { useRequest } from "vue-request";
import useAppEditor from "@/features/post/composables/useAppEditor";
import { EditorContent } from "@tiptap/vue-3";
import { useRoute } from "vue-router";
import ArticleHeader from "../../components/article/ArticleHeader.vue";
import { type AxiosResponse } from "axios";
import { ref, watch, watchEffect } from "vue";
import apiClient from "@/api/axios";

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

const { editor } = useAppEditor(false);

watch(
  () => data.value?.data.postTxt,
  () => {
    if (data.value?.data.postTxt) {
      editor.value?.commands.setContent(JSON.parse(data.value?.data.postTxt));
    }
  },
);
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
      :post-time="data?.data.postTime"
    ></ArticleHeader>
    <EditorContent
      class="article-detail__content"
      :editor="editor"
    ></EditorContent>
  </div>
  <!-- <CommentList></CommentList> -->
</template>

<style lang="scss">
@use "/src/assets/styles/markdown.scss";
.article-detail {
  background-color: #fff;
  min-height: 100%;
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
</style>
