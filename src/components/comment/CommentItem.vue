<script setup lang="ts">
import { ref } from 'vue';
import { type CommentProps } from './index';
import CommentForm from './CommentForm.vue';
import { Icon } from '@iconify/vue';

// 接收父组件传递的评论数据
const props = defineProps<{
  comment: CommentProps;
}>();

const isFormVisible = ref(false);
const toggleForm = () => {
  isFormVisible.value = !isFormVisible.value;
};

</script>

<template>
    <div  class="comment-item" :class="{'is-reply': props.comment.isReply}">
      <div class="avatar">
        <img src="@/assets/img/headImg.jpg" />
      </div>
      <div class="content-box">
        <div class="user-info">
          <span class="nickname">{{ props.comment.nickname }}</span>
          <span class="time">{{ props.comment.time }}</span>
        </div>
        <div class="comment-text">
          <!-- 如果是回复评论，显示@xxx 标识 -->
          <span v-if="props.comment.isReply" class="reply-to">{{ `@${props.comment.replyToNickname}` }}</span>
          {{ props.comment.comment }}
        </div>
        <div class="action-box">
          <div  v-if="!props.comment.isReply" class="lookComment">
            查看全部{{ props.comment.commentCount }}条回复
            <Icon icon="weui:arrow-outlined" class="arrowIcon" />
          </div>
          <div class="btnBox">
            <span class="reply-btn" @click="toggleForm"><Icon icon="fontisto:comment" class="replyIcon"/>回复</span>
            <span class="delete-btn"><Icon icon="fluent:delete-24-regular" class="deleteIcon"/>删除</span>
            <span class="like-btn"><Icon icon="uiw:like-o" class="likeIcon" />{{ props.comment.likeCount }}</span>
          </div>
        </div>
        <transition name="slide">
        <CommentForm v-show="isFormVisible" />
      </transition>
      </div>
    </div> 
</template>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}

.comment-item {
  width: 600px;
  display: flex;
  margin-bottom: 5px;
  min-height: 90px;
  overflow: hidden;
  border-bottom: 1px solid #d9d7d7;
  
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
    width: 550px;
    margin-top: 12px;

    .user-info {
      display: flex;
      margin-bottom: 1px;

      .nickname {
        color: #3d3d3d;
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
      width: 540px;
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
