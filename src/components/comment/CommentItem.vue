<script setup lang="ts">
import { ref, reactive,computed, onMounted} from 'vue';
import { Icon } from '@iconify/vue';
import { useRequest } from '@/composables/useRequest';
import CommentForm from './CommentForm.vue';
import { createUserInfo, getUserInfo } from './index';


const props = defineProps({
  comment: {
    type: Object,
    required: true
  },
  isReply: {
    type: Boolean,
    default: false
  },
  getFirstComment: {
    type: Function,
    required: false,
    default: () => () => {} 
  }
});

const { data, executeRequest } = useRequest();
const isFormVisible = ref(false);
const pageSize = ref<number>(5);
const pageNumber = ref<number>(1);
const sonComment = ref([]);
const userInfo = reactive(createUserInfo());
const visibleCount = ref(2); 
const showMore = ref(true);
const isLiked = ref(false);


const formattedTime = computed(() => {
  const commentTime = new Date(props.comment.commentTime);
  const year = commentTime.getFullYear();
  const month = (commentTime.getMonth() + 1).toString().padStart(2, '0');
  const day = commentTime.getDate().toString().padStart(2, '0');
  const hours = commentTime.getHours().toString().padStart(2, '0');
  const minutes = commentTime.getMinutes().toString().padStart(2, '0');
  return `${year}.${month}.${day} ${hours}:${minutes}`;
});
//展开回复输入框
const toggleForm = () => {
  isFormVisible.value = !isFormVisible.value;
};
// 将子评论id变成负数
const transformId = (id: number) => -id;
//获取初始两条子评论
const visibleComments = computed(() => {
  return sonComment.value.slice(0, visibleCount.value);
});
//获取子评论数据并返回
const getSecondComment = async (commentId: number) => {
  await executeRequest({
    url: `/comment/getCommentTwo?commentId=${commentId}&pageSize=${pageSize.value}&pageNumber=${pageNumber.value}`,
    method: 'get',
  });

  if (data.value.data.postCommentAll) {
    sonComment.value = data.value.data.postCommentAll;
    const promises = sonComment.value.map(async (comment) => {
      const replyInfo = reactive(createUserInfo());
      await getUserInfo(comment.pointUser, replyInfo);
      comment.userInfo = replyInfo;
    });
    await Promise.all(promises);
    console.log(sonComment.value);
    return sonComment.value;
  }
};

//展开更多和收起切换逻辑
const loadMoreReplies = () => {
  visibleCount.value = showMore.value
    ? Math.min(sonComment.value.length, visibleCount.value + 5)
    : 2;
  showMore.value = !showMore.value;
};
//删除评论
// const deleteComment = async (commentId: number) => {
//   await executeRequest({
//       url: `/comment/deleteComment/${commentId}`,
//       method: 'delete',
//     });
//     if (data.value  && data.value.data.code === 200) {
//       alert('删除成功');
//     } else {
//       alert('删除失败');
//     }
// }
//点赞/取消点赞评论
const likeComment = async (commentId: number) => {
  const CommentIded = props.isReply? transformId(commentId) : commentId;
    await executeRequest({
        url: `/comment/likeOption/${CommentIded}`,
        method: 'put',
    });

    if (data.value) {
        isLiked.value =!isLiked.value;
        alert(isLiked.value? '点赞成功' : '取消点赞成功');

        if (props.isReply === true && CommentIded < 0) {
            // 重新获取二级评论
            console.log(commentId);
            console.log(props.comment.commentId);
            getSecondComment(props.comment.commentId)
            console.log(sonComment.value);
        } else {
            props.getFirstComment();
        }
    } else {
        alert('点赞失败');
    }
};

onMounted(async () => {
  const currentUserId = props.comment.userId;
  getUserInfo(currentUserId, userInfo);
  getSecondComment(props.comment.commentId)
});

defineExpose({ userInfo });
</script>


<template>
  <div class="comment-item" :class="{'is-reply': isReply}">
    <div class="avatar">
      <img v-if="userInfo.headPortrait" :src="userInfo.headPortrait" />
    </div>
    <div class="content-box">
      <div class="user-info">
        <span class="nickname">{{ userInfo.name }}</span>
        <span class="time">{{ formattedTime }}</span>
      </div>
      <div class="comment-text">
        <span v-if="isReply" :key="comment.pointUser" class="reply-to">{{ `@${comment.userInfo?.name}` }}</span>
          {{ comment.commentTxt }}
      </div>
      <div v-if="comment.urls" class="image" ><img :src="comment.urls"/></div>
      <div class="action-box">
        <div class="btnBox">
          <span class="reply-btn" @click="toggleForm">
            <Icon icon="fontisto:comment" class="replyIcon" />回复
          </span>
          <span class="delete-btn"><Icon icon="fluent:delete-24-regular" class="deleteIcon"/>删除</span>
          <span class="like-btn" :class="{'liked':isLiked}" @click="likeComment(comment.commentId)">
            <Icon icon="uiw:like-o" class="likeIcon" />{{ comment.likeCount }}
          </span>
        </div>
      </div>
      <transition name="slide">
        <CommentForm v-show="isFormVisible" />
      </transition>
      <!-- 子评论 -->
      <div class="son-comments">
        <CommentItem
          v-for="childComment in visibleComments"
          :key="childComment.commentId"
          :comment="childComment"
          :is-reply="true"
        />
      </div>
    </div>
    <div class="more-comments">
      <div v-if="!isReply && comment.commentCount > 2" class="lookComment" @click="loadMoreReplies">
        {{ showMore ? `查看更多回复` : `收起` }}
        <Icon icon="weui:arrow-outlined" class="arrowIcon" />
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
  flex-shrink: 0;
}
.image{
  width: 100%;
  height: auto;
  margin: 3px 0;
  img{
    width: 150px;
    height: auto;
    object-fit: cover;
    cursor: pointer;
  }
}

.comment-item {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
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
      color: #484747;
      font-size: 14px;
      line-height: 1.4;
      max-width: 550px;
      margin-bottom: 5px;
      word-break: break-all;

      .reply-to {
        color: #ef8a0f;
        // font-style: italic;
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
      .liked {
        color: #9cdcfe; 
      }

      .liked .likeIcon {
         text-shadow: 0 0 10px rgba(0, 187, 255, 0.8); 
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
  .more-comments{
    width: 100%;
    display: flex;
  }
  .lookComment {
        height: 30px;
        margin-bottom: 5px;
        border-radius: 3px;
        padding: 5px 10px 0 10px;
        background-color: #e7f3f9;
        font-size: 14px;
        color: #5db0da;
        display: flex;
        margin-left: 75px;
        justify-content: flex-start;
        cursor: pointer;
        flex-grow: 0;
        .arrowIcon {
          margin-left: 7px;
          font-size: 21px;
        }
      }

  &.is-reply {
    width: 550px;
    min-height: 80px;
    overflow: hidden;
    border-bottom: 1px solid #d9d7d7;
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
