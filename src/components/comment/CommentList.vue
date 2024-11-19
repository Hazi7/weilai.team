<script setup lang="ts">
import { ref } from 'vue';
import type { CommentProps } from './index';
import CommentItem from './CommentItem.vue';


const comments = ref<CommentProps[]>([
  {
    id: 1,
    nickname: "John",
    time: "Yesterday 15:20",
    comment: "这产品的设计很新颖，给人眼前一亮的感觉。",
    likeCount: 18,
    commentCount: 5,
    isReply: false,
    replyToNickname: undefined
  },
  {
    id: 2,
    nickname: "Emma",
    time: "Yesterday 16:30",
    comment: "功能上还有些小瑕疵，不过整体还是不错的。",
    likeCount: 12,
    commentCount: 3,
    isReply: true,
    replyToNickname: 'John'
  },
  {
    id: 3,
    nickname: "Michael",
    time: "Today 09:10",
    comment: "价格方面要是能再优惠点就更好了。",
    likeCount: 9,
    commentCount: 2,
    isReply: true,
    replyToNickname: "Emma"
  },
  {
    id: 4,
    nickname: "Olivia",
    time: "Today 11:05",
    comment: "使用起来很便捷，容易上手。",
    likeCount: 15,
    commentCount: 4,
    isReply: true,
    replyToNickname: "Michael"
  }
]);

</script>

<template>
  <div class="comment-list">
    <CommentItem
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
    />
  </div>
</template>

