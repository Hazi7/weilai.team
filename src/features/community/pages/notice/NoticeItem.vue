<template>
    <div style="display: flex">
        <!-- 公告模板 -->
        <div class="noticeItem">
          <!-- 个人信息以及编辑操作 -->
          <div class="userInfo">
            <div class="action">
            <div class="publish-avatar">
               <img :src="props.notice.headPortrait ? props.notice.headPortrait : '../../../../../public/logo.png'"/>
             </div>
             <div class="nickName">{{ props.notice.username }}</div>
             <span class="edit" title="编辑"><Icon icon="mage:edit-pen" class="editIcon"/></span>
             <span class="delete" title="删除" @click="deleteNotice(props.notice.noticeId)"><Icon icon="fluent:delete-24-regular" class="deleteIcon"/></span>
             </div>
             <div class="publish-time">{{ formattedTime }}</div>
          </div>
          <!-- 公告内容 -->
          <div class="noticeDetalis">
            <div class="notice-title">{{ props.notice.title }}</div>
            <div class="notice-content">
              {{ props.notice.content }}
            </div>
            <div class="notice-urls">
              <div v-for="url in props.notice.noticeUrls" :key="url">
                <img :src="url">
              </div>
            </div>
          </div>
          <div class="show">展开<Icon icon="cuida:caret-down-outline" class="arrowsIcon"/></div>
        </div >
    </div>
    
  </template>
  
  <script setup lang="ts">
  import { Icon } from "@iconify/vue";
  import { defineProps,computed } from "vue";
  import { useRequest } from '@/composables/useRequest';
  const { data, loading, error, executeRequest } = useRequest();
  import type { SSENoticeData } from '../../../message/composables/types';

  const props = defineProps<{
  notice: SSENoticeData;
}>();
   
const formattedTime = computed(() => {
  const commentTime = new Date(props.notice.createAt);
  const year = commentTime.getFullYear();
  const month = (commentTime.getMonth() + 1).toString().padStart(2, '0');
  const day = commentTime.getDate().toString().padStart(2, '0');
  const hours = commentTime.getHours().toString().padStart(2, '0');
  const minutes = commentTime.getMinutes().toString().padStart(2, '0');
  return `${year}.${month}.${day} ${hours}:${minutes}`;
});

//删除单个公告
const deleteNotice = async(noticeId: string) => {
  await executeRequest({
      url: `/notice/deleteNotice/${noticeId}`,
      method: 'put',
    });
    if(data.value?.code === 200){
      alert('删除成功');
    } else {
      alert('删除失败');
    }
};
 
  </script>
  
  <style scoped lang="scss">
  .noticeItem {
    width: 730px;
    background-color: white;
    border-radius: 10px;
    padding: 15px;
    margin-bottom: 15px;
    .userInfo{
      display: flex;
      padding-bottom: 10px;
      justify-content: space-between; 
      border-bottom: 1px solid var(--border);
      .action{
        display: flex;
      }
      .publish-avatar{
        width: 50px;
        height: 50px;
        cursor: pointer;
        border-radius: 50%;
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }
      }
      .nickName{
        margin: 15px ;
      }
      .editIcon{
        font-size: 17px;
        color: var(--secondary-foreground);
        margin: 18px 6px 0 0;
        cursor: pointer;
      }
      .deleteIcon{
        font-size: 17px;
        color: var(--secondary-foreground);
        margin: 18px 10px 0 0;
        cursor: pointer;
      }
      .publish-time{
        margin-top: 17px;
        justify-content: flex-end;
        font-size: 13px;
        margin-right: 10PX;
        color: var(--secondary-foreground);
      }
    }
    .noticeDetalis{
      width: 100%;
      padding: 10px 0;
      .notice-urls{
        width: 100%;
        display: flex;
        img{
          width: auto;
          height: 150px;
          object-fit: cover;
          margin-right: 5px;
        }
      }
      .notice-title{
        width: 100%;
        font-weight: bold;
        font-size: 15px;
        margin: 0 0 5px 0;
        color: rgb(66, 65, 65);
      }
      .notice-content{
        color: #767575;
        font-size: 14px;
        line-height: 1.5;
        overflow: hidden;
        white-space: normal;
        word-break: break-word;
        text-overflow: ellipsis;
        display: -webkit-box;
       -webkit-box-orient: vertical;
       -webkit-line-clamp: 4;
      }
  
    }
    .show{
      cursor: pointer;
      display: flex;
      font-size: 15px;
      justify-content: flex-end;
      .arrowsIcon{
        margin: 5px 0 0 3px;
      }
    }
    
  }
  </style>
  