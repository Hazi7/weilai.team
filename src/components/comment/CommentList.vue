<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRequest } from '@/composables/useRequest';
import CommentItem from './CommentItem.vue';

const { data, error, executeRequest } = useRequest();
const postId = ref<number>(1);
const pageSize = ref<number>(5);
const pageNumber = ref<number>(1);
const comments = ref<any[]>([]);

// 获取一级评论
const getFirstComment = async () => {
  try {
    await executeRequest({
      url: `/comment/getCommentOne?postId=${postId.value}&pageSize=${pageSize.value}&pageNumber=${pageNumber.value}`,
      method: 'get',
    });
    if (data.value.code === 200) {
      //评论数据
      comments.value = data.value.data.postCommentOne;
      console.log(data.value.data);
    } else {
      console.log(error);
    }
  } catch (error) {
    console.error('Request failed', error);
  }
};

onMounted(getFirstComment);
</script>

<template>
  <div class="comment-list">
    <CommentItem
      v-for="comment in comments"
      :key="comment.commentId"
      :comment="comment"
    />
  </div>
</template>

<style scoped lang="scss">
.comment-list {
  width: 100%;
  background-color: white;
}
</style>
