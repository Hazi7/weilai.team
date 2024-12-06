<template>
    <div style="display: flex" class="noticeBox">
        <!-- 公告模板 -->
        <div class="noticeItem">
          <!-- 个人信息以及编辑操作 -->
          <div class="userInfo">
            <div class="action">
            <div class="publish-avatar">
               <img :src="props.notice.headPortrait ? props.notice.headPortrait : '../../../../../public/logo.png'"/>
             </div>
             <div class="nickName">{{ props.notice.username }}</div>
             <TooltipProvider>
               <Tooltip>
                 <TooltipTrigger>
                  <span class="edit"><Icon icon="mage:edit-pen" class="editIcon"/></span>
                </TooltipTrigger>
                 <TooltipContent>
                    <p>编辑</p>
                 </TooltipContent>
               </Tooltip>
           </TooltipProvider>
           <TooltipProvider>
               <Tooltip>
                 <TooltipTrigger>
                  <span class="delete" @click="deleteNotice(props.notice.noticeId)"><Icon icon="fluent:delete-24-regular" class="deleteIcon"/></span>
                </TooltipTrigger>
                 <TooltipContent>
                    <p>删除</p>
                 </TooltipContent>
               </Tooltip>
           </TooltipProvider>
           <TooltipProvider v-if="props.notice.status===0">
               <Tooltip>
                 <TooltipTrigger>
                  <span class="alRead" @click="readNotice(props.notice.noticeId)"><Icon icon="material-symbols:mark-email-read-outline-rounded"  style="color: #7b8287" class="alReadIcon" /></span>
                </TooltipTrigger>
                 <TooltipContent>
                    <p>标记为已读</p>
                 </TooltipContent>
               </Tooltip>
           </TooltipProvider>
             </div>
             <div class="publish-time">{{ formattedTime }}</div>
          </div>
          <!-- 公告内容 -->
          <div class="noticeDetalis">
            <div class="notice-title">{{ props.notice.title }}</div>
            <div ref="noticeContentRef" class="notice-content" >
              {{ props.notice.content }}
            </div>
            <!-- <div class="notice-urls">
              <div v-for="url in props.notice.noticeUrls" :key="url">
                <img :src="url">
              </div>
            </div> -->
          </div>
          <div class="show" v-show="isShow" @click="toggleContent">
                    {{ showText }}<Icon icon="cuida:caret-down-outline" class="arrowsIcon"/>
            </div>
        </div >
    </div>
    
  </template>
  
  <script setup lang="ts">
  import { Icon } from "@iconify/vue";
  import { defineProps,computed,ref, onMounted, nextTick} from "vue";
  import { useRequest } from '@/composables/useRequest';
  const { data, loading, error, executeRequest } = useRequest();
  import type { SSENoticeData } from '../../../message/composables/types';
  import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
const noticeContentRef = ref<HTMLElement | null>(null);
const isShow = ref(false);
const showText = ref('展开');
const toggleContent = () => {
    if (showText.value === '收起') {
      noticeContentRef.value!.style.overflow = 'hidden';
      noticeContentRef.value!.style.height = '10px';
      showText.value = '展开';
    } else {
        showText.value = isShow.value? '收起' : '展开';
        if (isShow.value) {
            noticeContentRef.value!.style.overflow = 'visible';
            noticeContentRef.value!.style.height = 'auto';
        } else {
            noticeContentRef.value!.style.overflow = 'hidden';
            noticeContentRef.value!.style.height = '50px';
        }
    }
};
onMounted(() => {
    nextTick(() => {
        if (noticeContentRef.value) {
            const height = noticeContentRef.value.clientHeight;
            if (height > 50) {
                isShow.value = true;
                noticeContentRef.value.style.overflow = 'hidden';
                noticeContentRef.value.style.height = '50px';
            }
        }
    });
});

  const props = defineProps<{
  notice: SSENoticeData,
  noticeList: Function,
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
      method: 'delete',
    });
    if(data.value?.code === 200){
      props.noticeList()
      alert('删除成功');
    } else {
      alert('删除失败');
    }
};
//标记单个为已读
const readNotice = async(noticeId: string) => {
  await executeRequest({
      url: `/notice/markUnReadNoticeAsRead/${noticeId}`,
      method: 'put',
    });
    console.log(data.value);
    if(data.value?.code === 200){
      props.noticeList();
      alert('标记已读成功')
    } else {
      console.log(data.value);
      
      alert('标记失败');
    }
};

 
  </script>
  
  <style scoped lang="scss">
  .noticeBox{
    width: 100%;
    flex-wrap: wrap;
  }
  .noticeItem {
    width:100%;
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
        margin: 2px 10px 0 0;
        cursor: pointer;
      }
      .deleteIcon{
        font-size: 17px;
        color: var(--secondary-foreground);
        margin: 2px 10px 0 0;
        cursor: pointer;
      }
      .alReadIcon{
        font-size: 18px;
        color: var(--secondary-foreground);
        margin: 2px 10px 0 0;
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
  