<script setup lang="ts">
import { ref,computed } from 'vue';
import { Icon } from '@iconify/vue';
import { useRequest } from '@/composables/useRequest';
import CommentForm from './CommentForm.vue';

const props = defineProps({
  comment: {
    type: Object,
    required: true
  },
  isReply: {
      type: Boolean,
      default: false
  }
});
const { data, executeRequest } = useRequest();
const isFormVisible = ref(false);
const isForm = ref(false);
const pageSize = ref<number>(5);
const pageNumber = ref<number>(1);
const sonComment = ref([]);
const isRepliesVisible = ref(false)


const formattedTime = computed(() => {
  const commentTime = new Date(props.comment.commentTime);
  // 获取年月日时分
  const year = commentTime.getFullYear();
  const month = (commentTime.getMonth() + 1).toString().padStart(2, '0');
  const day = commentTime.getDate().toString().padStart(2, '0');
  const hours = commentTime.getHours().toString().padStart(2, '0');
  const minutes = commentTime.getMinutes().toString().padStart(2, '0');
  // 格式化为 2024.10.11 11:30
  return `${year}.${month}.${day} ${hours}:${minutes}`;
});
// 切换回复表单的显示
const toggleForm = () => {
  isFormVisible.value = !isFormVisible.value;
}
const toggle = () => {
  isForm.value = !isForm.value;
}

// 获取多级评论并返回数据
const getSecondComment = async (commentId: number) => {
  try {
    await executeRequest({
      url: `/comment/getCommentTwo?commentId=${commentId}&pageSize=${pageSize.value}&pageNumber=${pageNumber.value}`,
      method: 'get',
    });
    if (data.value.data.postCommentAll) {
      sonComment.value = data.value.data.postCommentAll;
      return sonComment.value
    }
  } catch (error) {
    console.error('Request failed', error);
  }

  return []; 
};

// 切换显示回复列表
const toggleReplies = async () => {
  isRepliesVisible.value = !isRepliesVisible.value;

  if (isRepliesVisible.value && sonComment.value.length === 0) {
    sonComment.value = await getSecondComment(props.comment.commentId);
  }
};


</script>


<template>
  <div class="comment-item" :class="{'is-reply':isReply }">
    <div class="avatar">
      <img :src="comment.avatar " />
    </div>
    <div class="content-box">
      <div class="user-info">
        <span class="nickname">{{ comment.nickname }}</span>
        <span class="time">{{ formattedTime }}</span>
      </div>
      <div class="comment-text">
        <span v-if="isReply" class="reply-to">{{ `@${comment.replyToNickname}` }}</span>
        {{ comment.commentTxt }}
      </div>
      <div class="action-box">
        <div v-if="!isReply" class="lookComment" @click="toggleReplies">
          查看全部{{ comment.commentCount }}条回复
          <Icon icon="weui:arrow-outlined" class="arrowIcon" />
        </div>
        <div class="btnBox">
          <span class="reply-btn" @click="toggleForm"><Icon icon="fontisto:comment" class="replyIcon"/>回复</span>
          <span class="delete-btn" ><Icon icon="fluent:delete-24-regular" class="deleteIcon"/>删除</span>
          <span class="like-btn" ><Icon icon="uiw:like-o" class="likeIcon" />{{ comment.likeCount }}</span>
        </div>
      </div>
      <transition name="slide">
        <CommentForm v-show="isFormVisible" />
      </transition>
      <!-- 子评论 -->
      <div v-if="isRepliesVisible" class="son-comments">
        <CommentItem 
          v-for="childComment in sonComment" 
          :key="childComment.commentId" 
          :comment="childComment"
          :is-reply="true"
          @click="toggle"
           />
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}
.son-comments{
  width: 100%;
}

.comment-item {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
  min-height: 90px;
  overflow: hidden;
  border-bottom: 1px solid #e7e6e6;
  
  .avatar {
    width: 45px;
    height: 45px;
    margin-right: 10px;
    border-radius: 50%;
    padding: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #e2e2e2;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  .content-box {
    width: 640px;
    margin-top: 12px;

    .user-info {
      display: flex;
      margin-bottom: 1px;

      .nickname {
        color: #585858;
        font-weight: bold;
        margin-right: 15px;
      }
      .time {
        margin-top: 3px;
        color: #999;
        font-size: 13px;
      }
    }

    .comment-text {
      color: #333;
      font-size: 14px;
      line-height: 1.4;
      max-width: 550px;
      margin-bottom: 5px;
      word-break: break-all;

      .reply-to {
        color: #ef8a0f;
        font-style: italic;
      }
    }

    .action-box {
      width: 100%;
      height: 35px;
      margin-bottom: 5px;
      display: flex;
      justify-content: space-between;

      .btnBox {
        display: flex;
        margin-top: 5px;
      }

      .lookComment {
        height: 30px;
        border-radius: 3px;
        padding: 5px 10px 0 10px;
        background-color: #e7f3f9;
        font-size: 14px;
        color: #5db0da;
        display: flex;
        cursor: pointer;

        .arrowIcon {
          margin-left: 7px;
          font-size: 21px;
        }
      }

      .reply-btn {
        display: flex;
        margin-right: 10px;
        font-size: 14px;
        color: gray;
        cursor: pointer;

        .replyIcon {
          color: gray;
          margin-top: 3px;
          margin-right: 5px;
        }
      }

      .like-btn {
        display: flex;
        font-size: 14px;
        color: gray;
        cursor: pointer;

        .likeIcon {
          color: gray;
          font-size: 17px;
          margin-top: 2px;
          margin-right: 5px;
        }
      }
      .delete-btn{
        display: flex;
        font-size: 14px;
        color: gray;
        cursor: pointer;
        margin-right: 10px;
        .deleteIcon{
          color: gray;
          font-size: 18px;
          margin-top: 2px;
          margin-right: 3px;
        }
      }
    }
  }

  &.is-reply {
    width: 550px;
    margin: 0px auto;
    min-height: 80px;
    margin-left: 50px;
    overflow: hidden;
    border-bottom: 1px solid #d9d7d7;
    // background-color: #f0f8ff; 
    .avatar {
       width: 40px;
       height: 40px;
       margin-right: 10px;
       border-radius: 50%;
       padding: 2px;
       display: flex;
       align-items: center;
       justify-content: center;
       border: 1px solid #e2e2e2;
       overflow: hidden;
       img {
         width: 100%;
         height: 100%;
         border-radius: 50%;
         object-fit: cover;
       }
  }
    .content-box {
      width:480px ;

      .comment-text {
        color: #777;
        font-size: 14px;
        margin-bottom: 2px;
      }

      .nickname {
        color: #141414;
        font-weight: 500;
        font-size: 14px;
        margin-right: 13px;
      }
      .action-box {
        margin-bottom: 0px;
        height: 33px;
        .reply-btn {
        display: flex;
        margin-right: 10px;
        font-size: 13px;
        color: gray;
        cursor: pointer;

        .replyIcon {
          color: gray;
          margin-top: 3px;
          margin-right: 5px;
        }
      }
      .delete-btn{
        display: flex;
        font-size: 13.5px;
        color: gray;
        cursor: pointer;
        margin-right: 10px;
        .deleteIcon{
          color: gray;
          font-size: 17px;
          margin-top: 1px;
          margin-right: 3px;
        }
      }
      .like-btn {
        display: flex;
        font-size: 13px;
        color: gray;
        cursor: pointer;

        .likeIcon {
          color: gray;
          font-size: 16px;
          margin-top: 1px;
          margin-right: 4px;
        }
      }
      }
    }
  }
}
</style>
