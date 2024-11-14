<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

// 定义 props 类型
interface CommentProps {
  nickname: string;
  time: string;
  comment: string;
  likeCount: number;
  comments: number;
}
//评论例子
const commentExample = ref<CommentProps>({
  nickname: '小明',
  time: '10:30',
  comment: '这是一条评论内容，非常有趣且富有深度！',
  likeCount: 25,
  comments: 10
});
// 通过 props 接收数据
// const props = defineProps<CommentProps>();
// const commentInput = ref<string>('');  
// const newComment = ref<string>('');
// const commentsList = ref<CommentProps[]>([]);
</script>


<template>
  <div class="comment-item">
    <div class="avatar">
      <img src="@/assets/img/headImg.jpg"/>
    </div>
    <div class="content-box">
      <div class="user-info">
        <span class="nickname">{{ commentExample.nickname }}</span>
        <span class="time">{{ commentExample.time }}</span>
      </div>
      <div class="comment-text">{{ commentExample.comment }}</div>
      <div class="action-box">
         <div class="lookComment">
          查看全部{{ commentExample.comments }}条评论
          <Icon icon="weui:arrow-outlined" class="arrowIcon"/>
         </div>
         <div class="btnBox">
          <span class="reply-btn"><Icon icon="fontisto:comment" class="replyIcon"/>回复</span>
          <span class="like-btn"><Icon icon="uiw:like-o" class="likeIcon"/>{{ commentExample.likeCount }}</span>
         </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.comment-item {
  width: 600px;
  margin: 20px auto;
  display: flex;
  margin-bottom: 15px;
  min-height: 100px;
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
     img{
      width: 100%;
      height:100%;
      border-radius: 50%;
      object-fit: cover;
     }
   }
   .content-box{
      width:540px ;
      margin-top: 12px;
      .user-info{
         display: flex;
         margin-bottom: 1px;
         .nickname{
           color: #3d3d3d;
           font-weight: bold;
           margin-right: 15px;
         }
         .time{
           margin-top: 3px;
           color: #999;
           font-size: 13px;
         }
      }
      .comment-text {
        color: #333;
        font-size: 14px;
        line-height: 1.5;
        max-width: 550px;
        margin-bottom: 5px;
        word-break: break-all;
      }
      .action-box{
         width: 540px;
         height: 35px;
         margin-bottom: 5px;
         display: flex;
         justify-content: space-between; 
         .btnBox{
          display: flex;
          margin-top: 5px;
         }
         .lookComment{
           height: 30px;
           border-radius: 3px;
           padding: 5px 10px 0 10px;
           background-color: #e7f3f9;
           font-size: 14px;
           color:#5db0da ;
           display: flex;
           cursor: pointer;
           .arrowIcon{
             margin-left: 7px;
             font-size: 21px;
           }
         }
         .reply-btn{
           display: flex;
           margin-right: 15px;
           font-size: 14px;
           color:gray ;
           cursor: pointer;
           .replyIcon{
             color:gray ;
             margin-top: 3px;
             margin-right: 5px;
           }
         }
         .like-btn{
           display: flex;
           font-size: 14px;
           color:gray ;
           cursor: pointer;
           .likeIcon{
             color:gray ;
             font-size: 17px;
             margin-top: 2px;
             margin-right: 5px;
           }
         }
      }
   }
}

</style>