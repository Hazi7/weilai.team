<template>
  <div class="outCon" style="display: flex;">
    <div class="noticeCon">
      <div class="actionCon">
        <div class="allNotice">
          全部({{111}})
          <div class="dot"></div>
        </div>
        <div class="noRead">
          <!-- 未读({{ 444 }}) -->
        </div>
        <div class="settings">
          <DropdownMenu >
           <DropdownMenuTrigger> <Icon icon="carbon:settings-adjust" class="settingIcon"/></DropdownMenuTrigger>
           <DropdownMenuContent  class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg p-0"
              side="bottom"
              :side-offset="3"
              >
           <!-- <DropdownMenuLabel>My Account</DropdownMenuLabel> -->
           <DropdownMenuSeparator :style="{minWidth: '100px'}" />
           <DropdownMenuItem class="drop-menu-item">全部已读</DropdownMenuItem>
           <DropdownMenuItem class="drop-menu-item">发布公告</DropdownMenuItem>
           <DropdownMenuItem class="drop-menu-item">我的发布</DropdownMenuItem>
           </DropdownMenuContent>
          </DropdownMenu>
        </div>
      
      </div>
      <div class="noticeItemCon">
        <div v-for="notice in notices" :key="notice.noticeId">
          <NoticeItem :notice="notice" />
        </div>
      </div>
    </div>
    <Rightbar/>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import Rightbar from "../../../../components/community/Rightbar.vue";
import NoticeItem from "./NoticeItem.vue";
// import CommentList from "@/components/comment/CommentList.vue";
import { onMounted,ref} from 'vue';
import { useRequest } from '@/composables/useRequest';
import useSSE from '../../../message/composables/sse';
const { data, loading, error, executeRequest } = useRequest();
const { connect, disconnect, subscribe, unsubscribe, isConnected } = useSSE();
import type { SSENoticeData } from '../../../message/composables/types';
const notices = ref<SSENoticeData[]>([]); 
const pageNumber=ref(1);
const pageSize=ref(10);
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


onMounted(() => {
      connect()
      subscribe('message', (notice: SSENoticeData) => {
        notices.value.push(notice);
        console.log(notice);
    });
    noticeList()
});
//获取公告列表
const noticeList = async() => {
  await executeRequest({
    url: `/notice/getNoticeInfo?pageSize=${pageSize.value}&pageNumber=${pageNumber.value}`,
    method: 'get',
  })
  if(data.value?.code==200){
    const allNotices = data.value?.data.AllMessages || [];
    notices.value = allNotices; 
    console.log("获取的全部公告数据：", allNotices);
  }else if(data.value?.code==401){
    console.log("请先登录"); 
  }else{
    console.log("获取失败");
    console.log(data.value);
  }
}

</script>

<style scoped lang="scss">
.drop-menu-item {
  width: 105%;
  background-color: white ;
  &:hover{
    background-color: var(--secondary);
  }
}
.noticeItemCon{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
     .noticeCon{
      width: 100%;
      height: auto;
    }
    .actionCon{
        height: 50px;
        display: flex;
        font-size: 15px;
        .allNotice{
          min-width: 60px;
          height: 30px;
          color: gray;
          cursor: pointer;
          position: relative;
          margin-left: 20px;
          padding-right: 13px;
          .dot{
            width: 8px;
            height: 8px;
            position: absolute;
            top: 0;
            right: 0;
            border-radius: 50%;
            background-color: rgb(220, 4, 4);
          }
        }
        .noRead{
          min-width: 60px;
          height: 30px;
          color: gray;
          cursor: pointer;
          margin-left: 20px;
          margin-right: 100px;
        }
        .settings{
          width: 30px;
          height: 30px;
          margin-left: auto;
          margin-right: 50px;
          .settingIcon{
            font-size: 22px;
            margin-top: 5px;
            color: gray;
          }
          
        }
    }

@media screen and (max-width: 768px) {
  .outCon{
    margin-top: 100px;
    width: 100%;
  }
}


</style>
