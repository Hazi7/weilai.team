<template>
    <div class="" style="display: flex;">
      <div class="commentCon">
        <div class="titleOptions">
          <Icon icon="ant-design:clear-outlined" class="clearIcon"/>
          <div class="clearAll">清空所有({{ totalCount }})</div>
        </div>
        <div class="messageCon">
          <div v-for="message in messages" :key="message.messageId" class="mess">
            <MesItem 
            :message="message" 
            @system="messageList"
            />
          </div>
        </div>
      </div>
      <Rightbar/>
    </div>
    
  </template>
  
  <script setup lang="ts">
  import Rightbar from '@/components/community/Rightbar.vue';
  import { Icon } from "@iconify/vue";
  import MesItem from '../../compontent/MesItem.vue';
  import useSSE, { type SSEMessageData } from '../../composables/sse';
  import { onMounted,ref} from 'vue';
  import { useRequest } from '@/composables/useRequest';
  const { data, loading, error, executeRequest } = useRequest();
  const { connect, disconnect, subscribe, unsubscribe, isConnected } = useSSE();
  import { useMessageStore } from '@/store/messageStore';
  const messageStore = useMessageStore();
  const messages = ref<SSEMessageData[]>([]); 
  const messageType = 4
  const pageSize = 10
  const pageNumber=1
  const totalCount = ref(0)
  onMounted(() => {
        subscribe('message', (message: SSEMessageData) => {
          if(message.messageType==messageType){
          messages.value.unshift(message);
          console.log(message);
          messageStore.setHasNewMessage(true); 
        }
      });
        messageList()
  });
  
  //渲染消息列表
  const messageList=async () => {
    messages.value = [];
    await executeRequest({url:`/message/getMessageInfo?messageType=${messageType}&pageSize=${pageSize}&pageNumber=${pageNumber}`,method:'get'});
    if(data.value?.code==200){
      totalCount.value=data.value?.data.PageInfo.totalCount
      const allMessages = data.value?.data.AllMessages || [];
      messages.value = allMessages; 
      console.log("获取的全部消息数据：", allMessages);
    }else if(data.value?.code==401){
      console.log("请先登录"); 
    }else{
      console.log("获取失败");
      console.log(data.value);
    }
  }
  
  //删除所有点赞/收藏消息
  const deleteAll = async () => {
    await executeRequest({
        url: `/message/deleteAllMessage`,
        method: 'delete',
        requestData: { messageType },
      });
      if (data.value?.data.code === 200) {
        alert('删除成功');
      } else {
        alert('删除失败');
      }
  }
  
  </script>
  
  <style scoped lang="scss">
  .comments{
    width: 690px;
  }
  .mess{
    width: 95%;
  }
     .commentCon{
        width: 100%;
        .titleOptions{
          width: 100%;
          height: 50px;
          display: flex;
          cursor: pointer;
          .clearAll{
            width: 130px;
            font-size: 15px;
          }
          .clearIcon{
            margin:2px 4px 0 0px;
            font-size: 19px;
          } 
        }
        .messageCon{
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          
        }
     }
  @media screen and (max-width: 768px) {
    .commentCon{
      margin-top: 100px;
      width: 100%;
      .titleOptions{
        width: 100%;
        margin-top: 15px;
        height: 30px;
        .clearIcon{
            margin:2px 4px 0 5px;
            font-size: 19px;
        } 
      }
      .messageCon{
        width: 100%;
        .mesItem{
          width: 98%;
          margin-right: 0;
        }
      }
    }
  }
  </style>